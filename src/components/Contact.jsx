import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { MDBInput } from 'mdb-react-ui-kit';
import { Button } from "react-bootstrap";
import { MdClose } from "react-icons/md";

export function Contact(props) {
    const form = useRef();
    let userInfo = props.userInfo;
    let address = userInfo.id.length > 0 ? "〒" + userInfo.address.postalCode + " " + userInfo.address.prefecture + " " + userInfo.address.city + " " + userInfo.address.streetAddress : "";

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_oqhxmdn', 'template_of3e5rc', form.current, '3oDkBnYSVc5dycbl0')
            .then((result) => {
                console.log(result.text);
                props.onClose();
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div className='absolute inset-0 z-10'>
            <div className='relative bg-white border-2 left-[600px] text-[24px] w-[400px] top-[100px] border-[#cbd5e1] rounded-md shadow-2xl'>
                <div className="inline-flex">
                    <label className=" ml-8 mt-3 font-bold text-[32px] w-fit">Sent Request</label>
                    <MdClose className=" absolute right-2 top-2 hover:bg-[#a1a1aa] cursor-pointer" style={{ color: 'black', fontSize: '28px' }} onClick={props.onClose} />
                </div>
                <form ref={form} onSubmit={sendEmail} className=' m-8'>
                    <label>Subject</label><br />
                    <MDBInput type="email" name="subject" value={"Request Mail"} readOnly={true} disabled={true} /><br />
                    <label className=' font-bold'>Name</label><br />
                    <MDBInput type="text" name="user_name" value={userInfo.userName} readOnly={true} disabled={true} /><br />
                    <label>Email</label><br />
                    <MDBInput type="email" name="user_email" value={userInfo.email} readOnly={true} disabled={true} /><br />
                    <label>Shipping Address</label><br />
                    <textarea 
                        className="form-control"
                        name="address"
                        rows="5"
                        maxLength={400}
                        value={address}
                        readOnly={true}
                        disabled={true}
                    ></textarea><br />
                    <Button type="submit" className=' ml-[95px]' >Send Message</Button>
                </form>
            </div>
        </div>
    );
};