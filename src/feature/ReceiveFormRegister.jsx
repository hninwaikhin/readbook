import React from "react";
import { useSearchParams } from "react-router-dom";
import MainTitle from "../components/MainTitle";
import { useSelector } from "react-redux";
import { GetBookInfo } from "../slice/bookListSlice";
import { deliveryType } from "../common/Variable";
import { GetBookType } from "../common/CommonFun";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { Address } from "../components/Address";
import { GetUserInfo } from "../slice/userSlice";
import { MessageBox } from "../components/MessageBox";

function ReceiveFormRegister(props) {
    const [searchParams] = useSearchParams();
    const bookId = searchParams.get('bookId');
    const userInfo = useSelector(GetUserInfo);
    const selectedBookInfo = useSelector((state) => GetBookInfo(state, bookId));
    const [showChangeAddress, setShowChangeAddress] = useState(null);
    const [loginError, setLoginError] = useState(false);
    const [errMsg, setTitle] = useState({ title: "", text: "" });

    function handleReceive() {
        if (userInfo.id.length > 0) {
            // TODO
        }
        else {
            setTitle({ title: "Send Request", text: "Please log in to send request." });
            setLoginError(true);
        }
    }

    function handleChangeAddress() {
        if (userInfo.id.length > 0) {
            setShowChangeAddress(
                <Address onClose={() => { setShowChangeAddress(null); }}></Address>
            );
        }
        else {
            setTitle({ title: "Change Shipping Address", text: "Please log in to change shipping address." });
            setLoginError(true);
        }
    }

    return (
        <>
            <div className="relative mt-10 ml-8 w-[1200px] h-[700px]">
                <MainTitle title="Book Reservation" showHomeIcon={true} />
                {selectedBookInfo &&
                    <div className="mt-4 ml-3 text-[22px] text-white">
                        <div className="w-[450px]">
                            <img src={selectedBookInfo.imageUrl} alt="..." />
                        </div>
                        <div className=" mt-4"><span className=" font-bold">{"Name: "}</span>{selectedBookInfo.bookName}</div>
                        <div className=" mt-4"><span className=" font-bold">{"Type: "}</span>{GetBookType(selectedBookInfo.bookType)}</div>
                        <div className=" mt-4"><span className=" font-bold">{"Count: "}</span>{selectedBookInfo.count}</div>
                        <div className=" mt-4"><span className=" font-bold">{"Delivery: "}</span>{(selectedBookInfo.deliveryType === deliveryType.FreeDelivery ? "Free Delivery" : "COD (Cash On Delivery)")}</div>
                        <div className=" mt-4">
                            <div><span className=" font-bold">{"Shipping Address: "}</span></div>
                            {userInfo.id.length > 0 && <>
                                <div>{"〒" + userInfo.address.postalCode}</div>
                                <div>{userInfo.address.prefecture + " " + userInfo.address.city}</div>
                                <div>{userInfo.address.streetAddress}</div>
                            </>}
                        </div>
                        <Button variant="primary" className=" mt-4" onClick={handleChangeAddress}>Change Address</Button>
                        <Button variant="primary" className=" mt-4 ml-4" onClick={handleReceive}>Send Request</Button>
                    </div>
                }
            </div>
            {showChangeAddress}
            {loginError && <MessageBox
                title={errMsg.title}
                text={errMsg.text}
                onClick={() => { setLoginError(false); }}
            />}
        </>
    );
}

export default ReceiveFormRegister;