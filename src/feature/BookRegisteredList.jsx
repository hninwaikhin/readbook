import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from "react-redux";
import { Tables, bookInfoEmptyObj, deliveryType, navigateToBookRegister, shippingStatus } from "../common/Variable";
import { MenuBar } from "../components/MenuBar";
import MainTitle from "../components/MainTitle";
import { BiBookAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { GetUserInfo } from "../slice/userSlice";
import { GetBookType } from "../common/CommonFun";
import { projectStorage as db } from "../firebase/config";
import { ConfirmBox } from "../components/ConfirmBox";
import { setIsShowing } from "../slice/loadingSlice";
import { MdClose } from "react-icons/md";

function BookRegisteredList(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(GetUserInfo);
    const [bookRegisteredList, setBookRegisteredList] = useState([]);
    const [bookListBindData, setBookListBindData] = useState([]);
    const [isShowConfirmBox, setIsShowConfirmBox] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState("");
    const [tooltip, setTooltip] = useState(null);
    const [isShowShippingStatusChange, setIsShowShippingStatusChange] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(shippingStatus.Ordered);
    const [updatedStatus, setUpdatedStatus] = useState();

    useEffect(() => {
        if (userInfo.id.length > 0) {
            try {
                db.collection(Tables.BookInfo)
                    .where('isEnd', '==', false)
                    .where('userId', '==', userInfo.id)
                    .get().then((snapshot) => {
                        if (snapshot.empty) {
                            setBookListBindData([]);
                        }
                        else {
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
                            setBookListBindData(result);
                            setBookRegisteredList(result);
                        }
                    });
            }
            catch (error) {
                console.error(error);
            }
        }
    }, [userInfo.id, updatedStatus]);

    function handleSearch(e) {
        let searchText = e.target.value;
        if (searchText.length > 0) {
            setBookListBindData(bookRegisteredList.filter(item => item.bookName.includes(searchText)))
        }
        else {
            setBookListBindData(bookRegisteredList);
        }
    }

    async function deleteBook(e) {
        e.preventDefault();
        dispatch(setIsShowing(true));
        const documentRef = db.collection(Tables.BookInfo).doc(selectedDocument.id);
        // Delete the document
        await documentRef.delete();
        let list = bookListBindData.filter(x => x.id !== selectedDocument.id);
        setBookListBindData(list);
        setIsShowConfirmBox(false);
        dispatch(setIsShowing(false));
    }

    function editBook(e, documentId) {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append('bookId', documentId);
        navigate(navigateToBookRegister + `?${params.toString()}`);
    }

    function handleShowTooltip() {
        setTooltip(
            <div className="absolute z-10 w-fit h-fit px-3 py-1 text-[18px] bg-white border-2 border-[#94a3b8] rounded-sm shadow-2xl left-[670px] top-[40px]" >
                Book Register
            </div>
        );
    }

    function handleShippingStatus(e, info) {
        e.preventDefault();
        setSelectedDocument(info);
        setSelectedStatus(info.status);
        setIsShowShippingStatusChange(true);
    }

    function handleStatusChange(e) {
        e.preventDefault();
        setSelectedStatus(e.target.value);
    }

    async function handleUpdate(e) {
        e.preventDefault();
        dispatch(setIsShowing(true));
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
            status: Number(selectedStatus),
            orderedUserId: userInfo.id
        }
        const documentRef = db.collection(Tables.BookInfo).doc(selectedDocument.id);
        // Use the update method to modify specific fields in the document
        await documentRef.update(updatedData);
        console.log('Document updated successfully!');
        setIsShowShippingStatusChange(false);
        setUpdatedStatus(Number(selectedStatus));
        dispatch(setIsShowing(false));
    }

    const isActiveUpdateBtn = () => {
        return selectedDocument.status === Number(selectedStatus);
    }

    return (
        <>
            <div className="relative mt-8 ml-8 w-[2000px]">
                <div className=" absolute">
                    <div className="flex">
                        <MainTitle title="Your Registered Books" />
                        <div className="ml-8 flex items-center cursor-pointer w-[110px] h-[38px] hover:bg-[#a1a1aa]"
                            onMouseOver={handleShowTooltip}
                            onMouseLeave={() => { setTooltip(null); }}
                            onClick={() => { navigate(navigateToBookRegister); }}>
                            <BiBookAdd className=" ml-1" style={{ color: 'white', fontSize: '24px' }} />
                            <label className=" ml-1 text-[18px] cursor-pointer text-white fontfamily">Register</label>
                        </div>
                    </div>
                    <div className="mb-2 mt-3">
                        <MenuBar onSearch={(e) => handleSearch(e)} />
                    </div>
                    <div className="absolute list-container w-[1990px]">
                        {bookListBindData.map((info) => (
                            <div className="list-item mb-4" key={uuidv4()}>
                                <Card style={{ width: '23rem' }}>
                                    <Card.Img variant="top" className="h-[250px]" src={info.imageUrl} />
                                    <Card.Body>
                                        <Card.Title><div className="font-bold">{info.bookName}</div></Card.Title>
                                        <Card.Text>{"Type: " + (GetBookType(info.bookType))}</Card.Text>
                                        <Card.Text>{"Count: " + info.count}</Card.Text>
                                        <Card.Text>{"Delivery: " + (info.deliveryType === deliveryType.FreeDelivery ? "Free Delivery" : "COD (Cash On Delivery)")}</Card.Text>
                                        <Card.Text className=" w-[340px] overflow-hidden whitespace-nowrap overflow-ellipsis">{"Note: " + info.note}</Card.Text>
                                        <div className=" flex">
                                            <Button variant="primary" onClick={(e) => { setIsShowConfirmBox(true); setSelectedDocument(info); }} >Delete</Button>
                                            <Button variant="primary" className=" ml-4" onClick={(e) => editBook(e, info.id)}>Edit</Button>
                                            {info.status !== shippingStatus.None && info.orderedUserId.length > 0 && info.status === shippingStatus.Ordered &&
                                                <Button variant="secondary" className=" ml-4" onClick={(e) => handleShippingStatus(e, info)}>{"Ordered"}</Button>
                                            }
                                            {info.status !== shippingStatus.None && info.orderedUserId.length > 0 && info.status === shippingStatus.Prepare &&
                                                <Button variant="info" className=" ml-4" onClick={(e) => handleShippingStatus(e, info)}>{"Prepare"}</Button>
                                            }
                                            {info.status !== shippingStatus.None && info.orderedUserId.length > 0 && info.status === shippingStatus.Shipped &&
                                                <Button variant="success" className=" ml-4" onClick={(e) => handleShippingStatus(e, info)}>{"Shipped"}</Button>
                                            }
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isShowConfirmBox &&
                <ConfirmBox
                    title="Delete Book"
                    text="Are you sure you want to delete this book?"
                    className="w-[380px] h-[150px] left-[900px] top-[400px]"
                    onYesBtnClick={deleteBook}
                    onNoBtnClick={() => { setIsShowConfirmBox(false); }} />
            }
            {tooltip && tooltip}
            {isShowShippingStatusChange &&
                <div className="absolute z-10 w-fit h-fit px-3 py-1 text-[32px] bg-white border-2 border-[#94a3b8] rounded-md shadow-2xl left-[550px] top-[150px]" >
                    <div className="inline-flex">
                        <label className=" ml-4 mt-3 font-bold text-[32px] w-fit">Change Shipping Status</label>
                        <MdClose className=" absolute right-2 top-2 hover:bg-[#a1a1aa] cursor-pointer" style={{ color: 'black', fontSize: '28px' }} onClick={() => { setIsShowShippingStatusChange(false); }} />
                    </div>
                    <div className="ml-4 mt-7 mr-4">
                        <label htmlFor="status">Shipping Status:</label>
                        <div>
                            <select id="status" className=" mt-2 w-[400px] h-[40px] rounded-md focus:outline-none custom-select text-[16px]"
                                value={selectedStatus} onChange={handleStatusChange}
                            >
                                <option value={shippingStatus.Ordered}>Ordered</option>
                                <option value={shippingStatus.Prepare}>Prepare</option>
                                <option value={shippingStatus.Shipped}>Shipped</option>
                            </select>
                        </div>
                        <Button variant="primary" className=" mt-4 mb-10" disabled={isActiveUpdateBtn()} onClick={handleUpdate}>Update</Button>
                    </div>
                </div>
            }
        </>
    );
}

export default BookRegisteredList;