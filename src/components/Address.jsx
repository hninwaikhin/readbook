import React, { useEffect } from "react"
import { useState } from "react";
import { MDBInput } from 'mdb-react-ui-kit';
import ErrorMessageText from "../components/ErrorMessageText";
import { Button } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setIsShowing } from "../slice/loadingSlice";
import { GetUserInfo, setUserInfo } from "../slice/userSlice";
import { MessageBox } from "./MessageBox";
import { projectStorage as db } from "../firebase/config";
import { Tables, addressEmptyObj, japanPrefectures } from "../common/Variable";

export function Address(props) {
    const dispatch = useDispatch();
    const [postalCode, setPostalCode] = useState('');
    const [prefecture, setPrefecture] = useState('');
    const [city, setCity] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [errorPostalCode, setErrorPostalCode] = useState(false);
    const userInfo = useSelector(GetUserInfo);
    const [loginError, setLoginError] = useState(false);

    useEffect(() => {
        setPostalCode(userInfo.address.postalCode);
        setPrefecture(userInfo.address.prefecture);
        setCity(userInfo.address.city);
        setStreetAddress(userInfo.address.streetAddress);
    }, [])

    const handlePostalCodeChange = (e) => {
        setPostalCode(e.target.value);
        setErrorPostalCode(false);
    };

    const handlePrefectureChange = (e) => {
        setPrefecture(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleStreetAddressChange = (e) => {
        setStreetAddress(e.target.value);
    };

    async function handleUpdate(e) {
        e.preventDefault();
        if (userInfo.id.length === 0) {
            setLoginError(true);
            return;
        }
        dispatch(setIsShowing(true));
        try {
            let updateAddress = {
                ...addressEmptyObj,
                postalCode: postalCode,
                prefecture: prefecture,
                city: city,
                streetAddress: streetAddress
            };
            const documentRef = db.collection(Tables.User).doc(userInfo.id);
            await documentRef.update({ 'address': updateAddress });
            console.log('Document updated successfully!');
            dispatch(setUserInfo({
                id: userInfo.id,
                userName: userInfo.userName,
                email: userInfo.email,
                address: {
                    postalCode: updateAddress.postalCode,
                    prefecture: updateAddress.prefecture,
                    city: updateAddress.city,
                    streetAddress: updateAddress.streetAddress
                }
            }));
        }
        catch (error) {
            console.error(error);
        }
        props.onClose();
        dispatch(setIsShowing(false));
    }

    const isAvtiveBtn = () => {
        let result = userInfo.address.postalCode === postalCode &&
            userInfo.address.prefecture === prefecture &&
            userInfo.address.city === city &&
            userInfo.address.streetAddress === streetAddress;
        return result;
    }

    return (
        <>
            <div className="absolute inset-0 z-10 ">
                <div className="relative w-fit h-fit bg-white rounded-md shadow-xl left-[600px] top-[100px] ">
                    <div className="inline-flex">
                        <label className=" ml-8 mt-8 font-bold text-[46px] w-fit">Change Shipping Address</label>
                        <MdClose className=" absolute right-2 top-2 hover:bg-[#a1a1aa] cursor-pointer" style={{ color: 'black', fontSize: '28px' }} onClick={props.onClose} />
                    </div>
                    <div className="w-[700px] m-8">
                        <div className="mt-4">
                            <label htmlFor="postalCode">Postal Code:</label>
                            <MDBInput type="text" id="postalCode" value={postalCode} onChange={handlePostalCodeChange}
                                placeholder="e.g. 000-0000"
                            />
                            {errorPostalCode && <ErrorMessageText errorMessage={"Invalid Postal Code Format"} />}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="prefecture">Prefecture:</label>
                            <div>
                                <select id="prefecture" className="w-[700px] h-[40px] rounded-md focus:outline-none custom-select text-[16px]"
                                    value={prefecture} onChange={handlePrefectureChange}
                                >
                                    <option value="">Select an option</option>
                                    {japanPrefectures.map((val, idx) => (
                                        <option value={val}>{val}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="city">City:</label>
                            <MDBInput type="text" id="city" value={city} onChange={handleCityChange} />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="address">Address:</label>
                            <MDBInput type="text" id="address" value={streetAddress} onChange={handleStreetAddressChange} />
                        </div>
                        <Button variant="primary" className=" mt-4 mb-10" disabled={isAvtiveBtn()} onClick={handleUpdate}>Update</Button>
                    </div>
                </div>
            </div>
            {loginError && <MessageBox
                title="Change Shipping Address"
                text="Please log in to change shipping address."
                onClick={() => { setLoginError(false); }}
            />}
        </>
    )
}

Address.defaultProps = {
    onUpdate: () => void (0),
    onClose: () => void (0),
}