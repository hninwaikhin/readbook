import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { Tables, currentPage } from "../common/Variable";
import { useDispatch, useSelector } from "react-redux";
import { GetUserInfo, setUserInfo } from "../slice/userSlice";
import { useEffect } from "react";
import { useState } from "react";
import { ConfirmBox } from "./ConfirmBox";
import { projectStorage as db } from "../firebase/config";
import { AccountSetting } from "./AccountSetting";

function MainTitle(props) {
    const dispatch = useDispatch();
    const loginUser = useSelector(GetUserInfo);
    const [isShowConfirmBox, setIsShowConfirmBox] = useState(false);
    const [isShowSetting, seIsShowSetting] = useState(false);
    const [tooltip, setTooltip] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : "";
        if (loginUser && loginUser.id.length === 0 && userId.length > 0) {
            try {
                const fetch = async () => {
                    const documentRef = db.collection(Tables.User).doc(userId);
                    const snapshot = await documentRef.get();
                    if (snapshot.exists) {
                        const data = { id: snapshot.id, ...snapshot.data() };
                        dispatch(setUserInfo({
                            id: data.id,
                            userName: data.userName,
                            email: data.email,
                            password: data.password,
                            address: {
                                postalCode: data.address.postalCode,
                                prefecture: data.address.prefecture,
                                city: data.address.city,
                                streetAddress: data.address.streetAddress
                            }
                        }));
                    }
                }
                fetch();
            }
            catch (error) {
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleLogout() {
        dispatch(setUserInfo({ id: "" }))
        localStorage.removeItem('userId');
        setIsShowConfirmBox(false);
    }

    function handleLogin(e) {
        e.stopPropagation();
        props.setCurrPage(currentPage.Login);
    }

    function handleShowTooltip() {
        setTooltip(
            <div className="absolute z-10 w-fit h-fit px-3 py-1 text-[18px] bg-white border-2 border-[#94a3b8] rounded-sm shadow-2xl left-[500px] top-[40px]" >
                {loginUser.userName}
            </div>
        );
    }

    function handleShowLoginTooltip() {
        setTooltip(
            <div className="absolute z-10 w-fit h-fit px-3 py-1 text-[18px] bg-white border-2 border-[#94a3b8] rounded-sm shadow-2xl left-[500px] top-[40px]" >
                Please login
            </div>
        );
    }

    function handleShowHomeTooltip() {
        setTooltip(
            <div className="absolute z-10 w-fit h-fit px-3 py-1 text-[18px] bg-white border-2 border-[#94a3b8] rounded-sm shadow-2xl left-[640px] top-[40px]" >
                Back Home
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center">
                <label className="ml-[9px] font-bold text-[46px] w-[400px]">{props.title}</label>
                <div className=" flex ml-8 items-center">
                    <div className="ml-8 w-[110px] h-[38px]">
                        {props.showUserLogin &&
                            <>
                                {loginUser.id.length > 0 ?
                                    <div className="flex items-center cursor-pointer w-[110px] h-[38px] hover:bg-[#a1a1aa]"
                                        onMouseOver={handleShowTooltip}
                                        onMouseLeave={() => { setTooltip(null); }}
                                        onClick={() => { seIsShowSetting(true); }}>
                                        <BsPersonCircle className=" ml-1 cursor-pointer" style={{ color: 'black', fontSize: '32px' }} />
                                        <label className="ml-2 text-[18px] cursor-pointer fontfamily" >Logout</label>
                                    </div>
                                    :
                                    <div className="flex items-center cursor-pointer w-[110px] h-[38px] hover:bg-[#a1a1aa]"
                                        onMouseOver={handleShowLoginTooltip}
                                        onMouseLeave={() => { setTooltip(null); }}
                                        onClick={handleLogin}
                                    >
                                        <BsPersonCircle className=" ml-1 cursor-pointer" style={{ color: 'black', fontSize: '32px' }} />
                                        <label className="ml-2 text-[18px] cursor-pointer fontfamily">Login</label>
                                    </div>
                                }
                            </>
                        }
                    </div>
                    {props.showHomeIcon &&
                        <div className="flex items-center ml-8 hover:bg-[#a1a1aa] cursor-pointer w-[110px] h-[38px]"
                            onMouseOver={handleShowHomeTooltip}
                            onMouseLeave={() => { setTooltip(null); }}
                            onClick={() => { props.setCurrPage(currentPage.Dashboard); }}>
                            <AiOutlineHome style={{ color: 'black', fontSize: '34px' }} />
                            <label className="ml-2 text-[18px] cursor-pointer fontfamily">Home</label>
                        </div>
                    }
                </div>
            </div>
            {isShowSetting &&
                <AccountSetting
                    setCurrPage={props.setCurrPage}
                    onLogout={() => { seIsShowSetting(false); setIsShowConfirmBox(true); }}
                    onClose={() => { seIsShowSetting(false); }}
                />
            }
            {isShowConfirmBox &&
                <ConfirmBox
                    title="Logout"
                    text="Are you sure you want to log out?"
                    onYesBtnClick={handleLogout}
                    onNoBtnClick={() => { setIsShowConfirmBox(false); }} />
            }
            {tooltip && tooltip}
        </>
    );
}

MainTitle.defaultProps = {
    showHomeIcon: false,
    showUserLogin: true,
}

export default MainTitle;