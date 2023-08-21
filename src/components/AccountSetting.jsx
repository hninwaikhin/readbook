import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { navigateToUserRegister } from "../common/Variable";

export function AccountSetting(props) {
    const navigate = useNavigate();

    function handleAccoutSetting(e) {
        e.stopPropagation();
        navigate(navigateToUserRegister);
    }

    return (
        <div className={"absolute inset-0 z-10"}>
            <div className={"relative h-fit  w-[203px] items-center bg-white border-2 border-[#cbd5e1] rounded-md shadow-2xl " + props.className}>
                <div className=" py-3 px-4 hover:bg-[#a1a1aa] cursor-pointer" onClick={handleAccoutSetting}>
                    Account Setting
                </div>
                <div className=" border-b-2 w-[200px]" />
                <div className=" py-3 px-4 hover:bg-[#a1a1aa] cursor-pointer" onClick={props.onLogout} >
                    Logout
                </div>
            </div>
        </div>
    );
}

AccountSetting.defaultProps = {
    className: " w-[350px] h-[150px] left-[500px] top-[50px]",
    onLogout: () => void (0),
}