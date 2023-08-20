import React, { useEffect, useState } from "react";
import MainTitle from "../components/MainTitle";
import Card from 'react-bootstrap/Card';
import { projectStorage as db } from "../firebase/config";
import { Tables, bookInfoEmptyObj, deliveryType, shippingStatus } from "../common/Variable";
import { useDispatch, useSelector } from "react-redux";
import { GetUserInfo } from "../slice/userSlice";
import { v4 as uuidv4 } from 'uuid';
import { GetBookType } from "../common/CommonFun";
import { Button } from "react-bootstrap";
import { setIsShowing } from "../slice/loadingSlice";

export function Order(props) {
    const dispatch = useDispatch();
    const userInfo = useSelector(GetUserInfo);
    const [bookListBindData, setBookListBindData] = useState([]);
    let statusList = [shippingStatus.Ordered, shippingStatus.Prepare, shippingStatus.Shipped];

    useEffect(() => {
        if (userInfo.id.length > 0) {
            getFetchData();
        }
    }, []);

    function getFetchData() {
        try {
            db.collection(Tables.BookInfo)
                .where('isEnd', '==', false)
                .get().then((snapshot) => {
                    if (snapshot.empty === false) {
                        let result = [];
                        snapshot.docs.forEach(doc => {
                            let data = doc.data();
                            let bookInfo = {
                                ...bookInfoEmptyObj,
                                userId: data.userId,
                                bookName: data.bookName,
                                bookType: data.bookType,
                                imageUrl: data.imageUrl,
                                count: data.count,
                                deliveryType: data.deliveryType,
                                note: data.note,
                                isEnd: data.isEnd,
                                status: data.status ?? shippingStatus.None,
                                orderedUserId: data.orderedUserId ?? "",
                            };
                            result.push({ id: doc.id, ...bookInfo })
                        });
                        result = result.filter(x => statusList.some(status => status === x.status) && x.orderedUserId === userInfo.id);
                        setBookListBindData(result);
                    }
                });
        }
        catch (error) {
            console.error(error);
        }
    }

    async function handleCancelBtnClick(e, info) {
        e.preventDefault();
        dispatch(setIsShowing(true));
        let selectedDocument = info;
        let updatedData = {
            ...bookInfoEmptyObj,
            userId: selectedDocument.userId,
            bookName: selectedDocument.bookName,
            bookType: selectedDocument.bookType,
            imageUrl: selectedDocument.imageUrl,
            count: selectedDocument.count,
            deliveryType: selectedDocument.deliveryType,
            note: selectedDocument.note,
            isEnd: false,
            status: shippingStatus.Cancel,
            orderedUserId: selectedDocument.orderedUserId
        }
        const documentRef = db.collection(Tables.BookInfo).doc(selectedDocument.id);
        // Use the update method to modify specific fields in the document
        await documentRef.update(updatedData);
        console.log('Document updated successfully!');
        getFetchData();
        dispatch(setIsShowing(false));
    }

    return (
        <>
            <div className="relative mt-8 ml-8 w-[1200px] h-[700px]">
                <MainTitle title="Your Order List" showHomeIcon={true} />
                <div className="absolute list-container w-[1990px] mt-4">
                    {bookListBindData && bookListBindData.map((info) => (
                        <div className="list-item mb-4" key={uuidv4()}>
                            <Card style={{ width: '23rem' }}>
                                <Card.Img variant="top" className="h-[250px]" src={info.imageUrl} />
                                <Card.Body className=" cursor-pointer">
                                    <Card.Title><div className="font-bold">{info.bookName}</div></Card.Title>
                                    <Card.Text>{"Type: " + (GetBookType(info.bookType))}</Card.Text>
                                    <Card.Text>{"Count: " + info.count}</Card.Text>
                                    <Card.Text>{"Delivery: " + (info.deliveryType === deliveryType.FreeDelivery ? "Free Delivery" : "COD (Cash On Delivery)")}</Card.Text>
                                    <Card.Text className=" w-[340px] overflow-hidden whitespace-nowrap overflow-ellipsis">{"Note: " + info.note}</Card.Text>
                                </Card.Body>
                                <div className="mb-3 ml-4 flex">
                                    {info.status !== shippingStatus.Shipped &&
                                        <Button variant="primary" onClick={(e) => handleCancelBtnClick(e, info)}>Cancel</Button>
                                    }
                                    {info.status === shippingStatus.Shipped &&
                                        <Button variant="success">Shipped</Button>
                                    }
                                    {info.status !== shippingStatus.None && info.orderedUserId.length > 0 ?
                                        <label className=" ml-4 doubleunderline font-bold">
                                            {info.status === shippingStatus.Ordered ? "Ordered" :
                                                info.status === shippingStatus.Prepare ? "Preparing To Ship" : ""}
                                        </label> : ""
                                    }
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}