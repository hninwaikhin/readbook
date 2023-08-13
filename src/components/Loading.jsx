import React from "react";
import { useSelector } from "react-redux";
import { GetIsShowing } from "../slice/loadingSlice";

export function Loading(props) {
    const isSHowing = useSelector(GetIsShowing);
    if (isSHowing === false) {
        return null;
    }

    return (
        <div className="flex items-center justify-center absolute inset-0 z-10">
            <div className="loader"></div>
        </div>
    );
}