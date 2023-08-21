import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { MDBInput } from 'mdb-react-ui-kit';
import ErrorMessageText from "../components/ErrorMessageText";
import { projectStorage as db } from "../firebase/config";
import { Tables, navigateToDashboard, navigateToUserRegister } from "../common/Variable";
import { useNavigate } from 'react-router-dom';
import { BiUserPin } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../slice/userSlice";
import { AiOutlineHome } from "react-icons/ai";

function Login(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [tooltip, setTooltip] = useState(null);


    function handleEmailChange(e) {
        setEmail(e.target.value);
        setErrorMessage('');
    };

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        setErrorMessage('');
    };

    function handleShowTooltip() {
        setTooltip(
            <div className="absolute z-10 w-fit h-fit px-3 py-1 text-[18px] bg-white border-2 border-[#94a3b8] rounded-sm shadow-2xl left-[280px] top-[40px]" >
                User Register
            </div>
        );
    }

    function handleShowHomeTooltip() {
        setTooltip(
            <div className="absolute z-10 w-fit h-fit px-3 py-1 text-[18px] bg-white border-2 border-[#94a3b8] rounded-sm shadow-2xl left-[420px] top-[40px]" >
                Back Home
            </div>
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            db.collection(Tables.User)
                .where('email', '==', email)
                .where('password', '==', password)
                .get().then((snapshot) => {
                    if (snapshot.empty) {
                        setErrorMessage('Invalid Error!');
                    }
                    else {
                        let result = [];
                        snapshot.docs.forEach(doc => {
                            result.push({ id: doc.id, ...doc.data() })
                        });
                        let isValidUser = result.some(x => x.email === email && x.password === password);
                        let user = result[0];
                        if (isValidUser && user) {
                            dispatch(setUserInfo({
                                id: user.id,
                                userName: user.userName,
                                email: user.email,
                                address: {
                                    postalCode: user.address.postalCode,
                                    prefecture: user.address.prefecture,
                                    city: user.address.city,
                                    streetAddress: user.address.streetAddress
                                }
                            }));
                            localStorage.setItem('userId', user.id);
                            navigate(navigateToDashboard);
                            console.log("OK");
                        }
                        else {
                            setErrorMessage('Invalid username or password!');
                        }
                    }
                });
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="relative mt-8 ml-8">
                <div className="flex">
                    <div>
                        <label className="font-bold text-[46px]">Login Page</label>
                    </div>
                    <div>
                        <div className="ml-8 flex items-center cursor-pointer w-[110px] h-[38px] hover:bg-[#a1a1aa]"
                            onMouseOver={handleShowTooltip}
                            onMouseLeave={() => { setTooltip(null); }}
                            onClick={() => { navigate(navigateToUserRegister); }}>
                            <BiUserPin className=" ml-1" style={{ color: 'black', fontSize: '24px' }}></BiUserPin>
                            <label className=" ml-1 text-[18px] cursor-pointer fontfamily">Register</label>
                        </div>
                    </div>
                    <div className="flex items-center ml-8 hover:bg-[#a1a1aa] cursor-pointer w-[110px] h-[38px]"
                        onMouseOver={handleShowHomeTooltip}
                        onMouseLeave={() => { setTooltip(null); }}
                        onClick={() => { navigate(navigateToDashboard); }}>
                        <AiOutlineHome style={{ color: 'black', fontSize: '34px' }} />
                        <label className="ml-2 text-[18px] cursor-pointer fontfamily">Home</label>
                    </div>
                </div>
                <div className="w-[500px] text-[24px]">
                    <div className="mt-4 ">
                        <label htmlFor="username">Email:</label>
                        <br />
                        <MDBInput type="text"
                            id="username"
                            value={email}
                            onChange={handleEmailChange}
                        ></MDBInput>
                    </div>
                    <div className="mt-12">
                        <label htmlFor="password">Password:</label>
                        <br />
                        <MDBInput type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                        ></MDBInput>
                    </div>
                    {errorMessage.length > 0 && <ErrorMessageText errorMessage={errorMessage} />}
                </div>
                <div className=" mt-14">
                    <Button variant="primary"
                        onClick={handleSubmit}
                    >Login</Button>
                </div>
            </div>
            {tooltip && tooltip}
        </>
    );
}

export default Login;