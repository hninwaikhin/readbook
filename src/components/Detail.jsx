import React from "react";
import { GetBookType } from "../common/CommonFun";
import { deliveryType } from "../common/Variable";
import { MdClose } from "react-icons/md";
import { Button } from "react-bootstrap";

export function Detail(props) {
    let info = props.info;

    return (
        <div className={"absolute z-10 flex items-center justify-center " + props.posX + " " + props.posY}>
            <div>
                <div className={"relative bg-white border-2 border-[#cbd5e1] rounded-md shadow-2xl w-fit h-fit "}>
                    <div className="inline-flex">
                        <label className=" ml-8 mt-8 font-bold text-[46px] w-fit">Book Detail</label>
                        <MdClose className=" absolute right-2 top-2 hover:bg-[#a1a1aa] cursor-pointer" style={{ color: 'black', fontSize: '34px' }} onClick={props.onClose} />
                    </div>
                    {info &&
                        <div className="px-8 pt-8 text-[22px] w-[700px]">
                            <div className="w-[450px]">
                                <img src={info.imageUrl} alt="..." />
                            </div>
                            <div className=" mt-4"><span className=" font-bold">{"Name: "}</span>{info.bookName}</div>
                            <div className=" mt-4"><span className=" font-bold">{"Type: "}</span>{GetBookType(info.bookType)}</div>
                            <div className=" mt-4"><span className=" font-bold">{"Count: "}</span>{info.count}</div>
                            <div className=" mt-4"><span className=" font-bold">{"Delivery: "}</span>{(info.deliveryType === deliveryType.FreeDelivery ? "Free Delivery" : "COD (Cash On Delivery)")}</div>
                            <div className=" mt-4"><span className=" font-bold">{"Note: "}</span>{info.note}</div>
                        </div>
                    }
                    <Button variant="primary" className=" ml-8 mt-4 mb-4" onClick={props.onClose}>Close</Button>
                </div>
            </div>
        </div>
    );
}

Detail.defaultProps = {
    posY: "top-[10px]",
    posX: "left-[600px]",
}