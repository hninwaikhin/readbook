import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from "react-redux";
import { Tables, deliveryType, navigateToBookRegister } from "../common/Variable";
import { MenuBar } from "../components/MenuBar";
import MainTitle from "../components/MainTitle";
import { BiBookAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { GetUserInfo } from "../slice/userSlice";
import { GetBookType } from "../common/CommonFun";
import { projectStorage as db } from "../firebase/config";
import { ConfirmBox } from "../components/ConfirmBox";
import { setIsShowing } from "../slice/loadingSlice";

function BookRegisteredList(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(GetUserInfo);
    const [bookRegisteredList, setBookRegisteredList] = useState([]);
    const [bookListBindData, setBookListBindData] = useState([]);
    const [isShowConfirmBox, setIsShowConfirmBox] = useState(false);
    const [selectedDocumentId, setSelectedDocumentId] = useState("");
    const [tooltip, setTooltip] = useState(null);

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
                                result.push({ id: doc.id, ...doc.data() })
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
    }, [userInfo.id]);

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
        const documentRef = db.collection(Tables.BookInfo).doc(selectedDocumentId);
        // Delete the document
        await documentRef.delete();
        let list = bookListBindData.filter(x => x.id !== selectedDocumentId);
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
                                            <Button variant="primary" onClick={(e) => { setIsShowConfirmBox(true); setSelectedDocumentId(info.id); }} >Delete</Button>
                                            <Button variant="primary" className=" ml-4" onClick={(e) => editBook(e, info.id)}>Edit</Button>
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
        </>
    );
}

export default BookRegisteredList;