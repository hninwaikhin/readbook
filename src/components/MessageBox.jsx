import React from "react";
import { Button } from "react-bootstrap";

export function MessageBox(props) {
    return (
        <div className={"absolute inset-0 z-10 " + props.bgColor}>
            <div className={"relative bg-white border-2 border-[#cbd5e1] rounded-md shadow-2xl " + props.className}>
                <div className=" ml-4 mt-2 text-[22px] font-bold">{props.title}</div>
                <div className=" ml-4 mt-2">
                    {props.text}
                </div>
                <Button type="submit" className=" absolute bottom-3 left-4 w-[70px]" onClick={props.onClick}>OK</Button>
            </div>
        </div>
    );
}

MessageBox.defaultProps = {
    title: "",
    text: "",
    bgColor: "",
    className: " w-[400px] h-[150px] left-[780px] top-[400px]",
    onClick: () => void (0),
}