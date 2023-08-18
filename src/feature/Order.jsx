import React from "react";
import MainTitle from "../components/MainTitle";

export function Order(props) {

    return (
        <>
            <div className="relative mt-8 ml-8 w-[1200px] h-[700px]">
                <MainTitle title="Your Order" showHomeIcon={true} />
               
            </div>
        </>
    );
}