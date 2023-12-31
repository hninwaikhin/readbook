import React from "react";
import { currentPage } from "../common/Variable";

export function AccountSetting(props) {

    function handleAccoutSetting(e) {
        e.stopPropagation();
        props.setCurrPage(currentPage.UserRegister);
    }

    return (
        <div className={"absolute inset-0 z-20"}>
            <div className={"relative h-fit w-fit items-center bg-white border-2 border-[#cbd5e1] rounded-md shadow-2xl " + props.className}>
                <div className=" py-3 px-3 font-bold w-[200] h-[60px] hover:bg-[#a1a1aa] cursor-pointer" onClick={handleAccoutSetting}>
                    Account Setting
                </div>
                <div className=" border-b-2 w-[170px]" />
                <div className=" py-3 px-12 font-bold w-[203] h-[60px] hover:bg-[#a1a1aa] cursor-pointer" onClick={props.onLogout} >
                    Logout
                </div>
                <div className=" border-b-2 w-[170px]" />
                <div className="py-3 px-14 font-bold w-[203] h-[60px] hover:bg-[#a1a1aa] cursor-pointer" onClick={props.onClose}>
                    Close
                </div>
            </div>
        </div>
    );
}

AccountSetting.defaultProps = {
    className: " left-[500px] top-[40px]",
    onLogout: () => void (0),
}