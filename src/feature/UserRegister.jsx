import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MDBInput } from 'mdb-react-ui-kit';
import ErrorMessageText from "../components/ErrorMessageText";
import { addressEmptyObj, currentPage, japanPrefectures, userEmptyObj } from "../common/Variable";
import { projectStorage as db } from "../firebase/config";
import { Tables } from "../common/Variable";
import { useDispatch, useSelector } from "react-redux";
import { setIsShowing } from "../slice/loadingSlice";
import MainTitle from "../components/MainTitle";
import { GetUserInfo, setUserInfo } from "../slice/userSlice";

const postalCodeRegex = /^\d{3}-\d{4}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function UserRegister(props) {
    const dispatch = useDispatch();
    const userInfo = useSelector(GetUserInfo);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [prefecture, setPrefecture] = useState('');
    const [city, setCity] = useState('');
    const [streetAddress, setStreetAddress] = useState('');

    const [errorUserName, setErrorUserName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorPostalCode, setErrorPostalCode] = useState(false);

    useEffect(() => {
        if (userInfo && userInfo.id.length > 0) {
            setUsername(userInfo.userName);
            setEmail(userInfo.email);
            setPassword(userInfo.password);
            setPostalCode(userInfo.address.postalCode);
            setPrefecture(userInfo.address.prefecture);
            setCity(userInfo.address.city);
            setStreetAddress(userInfo.address.streetAddress);
        }
    }, []);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setErrorUserName(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrorEmail(false);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrorPassword(false);
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isError = errorCheck();
        if (isError === false) {
            dispatch(setIsShowing(true));
            try {
                let userInfoObj = {
                    ...userEmptyObj,
                    userName: username,
                    email: email,
                    password: password,
                    isEnd: false,
                    address: {
                        ...addressEmptyObj,
                        postalCode: postalCode,
                        prefecture: prefecture,
                        city: city,
                        streetAddress: streetAddress
                    }
                }
                const collectionRef = db.collection(Tables.User);
                await collectionRef.add(userInfoObj);
                console.log('Document added successfully!');
                props.setCurrPage(currentPage.Login);
            } catch (error) {
                console.error('Error adding document:', error);
            }
            dispatch(setIsShowing(false));
        }
    };

    function errorCheck() {
        let isError = false;
        if (postalCodeRegex.test(postalCode) === false) {
            setErrorPostalCode(true);
            isError = true;
        }

        if (username.length === 0) {
            setErrorUserName(true);
            isError = true;
        }

        if (email.length === 0 || emailRegex.test(email) === false) {
            setErrorEmail(true);
            isError = true;
        }

        if (password.length === 0 || password.length < 8) {
            setErrorPassword(true);
            isError = true;
        }
        return isError;
    }

    async function handleUpdate(e) {
        e.preventDefault();
        dispatch(setIsShowing(true));
        try {
            let updatedData = {
                ...userEmptyObj,
                userName: username,
                email: email,
                password: password,
                isEnd: false,
                address: {
                    ...addressEmptyObj,
                    postalCode: postalCode,
                    prefecture: prefecture,
                    city: city,
                    streetAddress: streetAddress
                }
            }
            const documentRef = db.collection(Tables.User).doc(userInfo.id);
            // Use the update method to modify specific fields in the document
            await documentRef.update(updatedData);
            console.log('Document updated successfully!');
            props.setCurrPage(currentPage.Dashboard);
            // get updated userInfo
            const documentRef2 = db.collection(Tables.User).doc(userInfo.id);
            const snapshot = await documentRef2.get();
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
        catch (error) {
            console.error(error);
        }
        dispatch(setIsShowing(false));
    }

    const isActiveBtn = () => {
        return username.length === 0 || email.length === 0 || password.length === 0
            || postalCode.length === 0 || prefecture.length === 0 || city.length === 0
            || streetAddress.length === 0 || errorUserName || errorEmail || errorPassword || errorPostalCode;
    }

    return (
        <div className="relative mt-8 ml-8 w-[800px]">
            <MainTitle title="User Registration Form" showHomeIcon={true} showUserLogin={false} setCurrPage={props.setCurrPage}></MainTitle>
            <form className="text-[24px]">
                <div className="mt-4">
                    <label className="w-[100px]" htmlFor="username">Username:</label>
                    <MDBInput type="text" id="username" value={username} onChange={handleUsernameChange} placeholder="Enter your name" />
                    {errorUserName && <ErrorMessageText errorMessage={"Invalid user name"} />}
                </div>
                <div className="mt-4">
                    <label className="w-[100px]" htmlFor="email">Email:</label>
                    <MDBInput type="email" id="email" value={email} onChange={handleEmailChange} placeholder="Enter email address" />
                    {errorEmail && <ErrorMessageText errorMessage={"Invalid email"} />}
                </div>
                <div className="mt-4">
                    <label className="w-[100px]" htmlFor="password">Password:</label>
                    <MDBInput type="password" id="password" value={password} onChange={handlePasswordChange} placeholder="Enter a strong password (at least 8 characters)" />
                    {errorPassword && <ErrorMessageText errorMessage={"Invalid password"} />}
                </div>
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
                        <select id="prefecture" className="w-[800px] h-[40px] rounded-md focus:outline-none custom-select text-[16px]"
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
                <div className="mt-14">
                    {userInfo && userInfo.id.length ?
                        <Button disabled={isActiveBtn()} onClick={handleUpdate} type="submit">Update</Button> :
                        <Button disabled={isActiveBtn()} onClick={handleSubmit} type="submit">Register</Button>
                    }
                </div>
            </form>
        </div>
    );
}

export default UserRegister;