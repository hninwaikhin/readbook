import React from "react";
import { Button } from "react-bootstrap";

export function ConfirmBox(props) {
    return (
        <div className={"absolute inset-0 z-10"}>
            <div className={"relative bg-white border-2 border-[#cbd5e1] rounded-md shadow-2xl " + props.className}>
                <div className=" ml-4 mt-2 text-[22px] font-bold">{props.title}</div>
                <div className=" ml-4 mt-2">
                    {props.text}
                </div>
                <Button type="submit" className=" absolute bottom-3 left-4 w-[70px]" onClick={props.onYesBtnClick}>Yes</Button>
                <Button type="submit" className=" absolute bottom-3 left-[100px] w-[70px]" onClick={props.onNoBtnClick}>No</Button>
            </div>
        </div>
    );
}

ConfirmBox.defaultProps = {
    title: "",
    text: "",
    className: " w-[350px] h-[150px] left-[500px] top-[50px]",
    onYesBtnClick: () => void (0),
    onNoBtnClick: () => void (0),
}