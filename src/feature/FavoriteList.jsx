import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { v4 as uuidv4 } from 'uuid';
import { AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { GetFavoriteList, setFavoriteList, GetCartList, setCartList } from "../slice/bookListSlice";
import { currentPage, deliveryType, shippingStatus } from "../common/Variable";
import { MenuBar } from "../components/MenuBar";
import MainTitle from "../components/MainTitle";
import { GetBookType } from "../common/CommonFun";
import { Detail } from "../components/Detail";
import { MessageBox } from "../components/MessageBox";
import { GetUserInfo } from "../slice/userSlice";

function FavoriteList(props) {
    const dispatch = useDispatch();
    const favoriteList = useSelector(GetFavoriteList);
    const [bookListBindData, setBookListBindData] = useState(favoriteList);
    const cartList = useSelector(GetCartList);
    const [dialog, setDialog] = useState(null);
    const [loginError, setLoginError] = useState(false);
    const userInfo = useSelector(GetUserInfo);

    function handleRemoveFavorite(id) {
        let list = favoriteList.filter(itm => itm.id !== id);
        dispatch(setFavoriteList(list));
        setBookListBindData(list);
    }

    function handleSearch(e) {
        let searchText = e.target.value;
        if (searchText.length > 0) {
            setBookListBindData(favoriteList.filter(item => item.bookName.toLowerCase().includes(searchText.toLowerCase())))
        }
        else {
            setBookListBindData(favoriteList);
        }
    }

    function handleAddToCart(id) {
        let idx = cartList.findIndex(x => x.id === id);
        if (cartList.length === 0 || (idx === -1 && cartList.length > 0)) {
            let obj = favoriteList.find(x => x.id === id);
            let list = [...cartList];
            list.push(obj)
            dispatch(setCartList(list));
        }
    }

    function handleReceive(e, documentId) {
        e.preventDefault();
        if (userInfo.id.length === 0) {
            setLoginError(true);
            return;
        }
        props.setCurrPage(currentPage.ReceiveFormRegister);
        props.setSelectedBookId(documentId);
    }

    function handleShowDetailDg(e, info) {
        e.preventDefault();
        let posY = 10;
        let idx = bookListBindData.findIndex(x => x.id === info.id);
        let result = Math.trunc(idx / 5);
        posY = result === 0 ? 100 : result === 1 ? 400 : result * 200;
        let top = " top-[" + Number(posY) + "px]";
        setDialog(
            <Detail posY={top} info={info} onClose={() => { setDialog(null); }}></Detail>
        );
    }

    return (
        <>
            <div className="relative mt-8 ml-8 w-[2000px]">
                <div className=" absolute">
                    <MainTitle title="Favorite List" setCurrPage={props.setCurrPage} />
                    <div className="mb-2 mt-3">
                        <MenuBar onSearch={(e) => handleSearch(e)} setCurrPage={props.setCurrPage} />
                    </div>
                    <div className="absolute list-container w-[1990px]">
                        {bookListBindData && bookListBindData.filter(itm => itm.status !== shippingStatus.Shipped).map((info) => (
                            <div className="list-item mb-4" key={uuidv4()}>
                                <Card style={{ width: '23rem' }}>
                                    <Card.Img variant="top" className="h-[250px]" src={info.imageUrl} />
                                    <div className=" absolute right-0 cursor-pointer">
                                        <AiFillHeart className=" ml-4" style={{ color: 'white', fontSize: '34px' }} onClick={() => handleRemoveFavorite(info.id)} />
                                    </div>
                                    <Card.Body onClick={(e) => handleShowDetailDg(e, info)} className=" cursor-pointer">
                                        <Card.Title><div className="font-bold">{info.bookName}</div></Card.Title>
                                        <Card.Text>{"Type: " + (GetBookType(info.bookType))}</Card.Text>
                                        <Card.Text>{"Count: " + info.count}</Card.Text>
                                        <Card.Text>{"Delivery: " + (Number(info.deliveryType) === deliveryType.FreeDelivery ? "Free Delivery" : "COD (Cash On Delivery)")}</Card.Text>
                                        <Card.Text className=" w-[340px] overflow-hidden whitespace-nowrap overflow-ellipsis">{"Note: " + info.note}</Card.Text>
                                    </Card.Body>
                                    <div className="mb-3 ml-4 flex">
                                        <Button variant="primary" onClick={() => handleAddToCart(info.id)}>Add to Cart</Button>
                                        {userInfo.id.length > 0 && info.userId !== userInfo.id && (info.status === shippingStatus.None || info.status === shippingStatus.Cancel) ?
                                            <Button variant="primary" className=" ml-4" onClick={(e) => handleReceive(e, info.id)}>Receive</Button>
                                            : info.status !== shippingStatus.None && info.orderedUserId.length > 0 ?
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
            </div>
            {dialog}
            {loginError && <MessageBox
                title="Book Receiving"
                text="Please log in to receive the book."
                bgColor="bg-[#78716c] bg-opacity-70"
                onClick={() => { setLoginError(false); }}
            />}
        </>
    );
}

export default FavoriteList;