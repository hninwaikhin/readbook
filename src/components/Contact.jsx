import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { MDBInput } from 'mdb-react-ui-kit';
import { Button } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { GetBookType } from '../common/CommonFun';
import { projectStorage as db } from "../firebase/config";
import { Tables, bookInfoEmptyObj, shippingStatus } from '../common/Variable';

export function Contact(props) {
    const formRef = useRef();
    let userInfo = props.userInfo;
    let selectedBookInfo = props.selectedBookInfo;
    let requestBook = selectedBookInfo.bookName + " (" + GetBookType(selectedBookInfo.bookType) + ")";
    let address = userInfo.id.length > 0 ? "〒" + userInfo.address.postalCode + " " + userInfo.address.prefecture + " " + userInfo.address.city + " " + userInfo.address.streetAddress : "";
    let sendEmailAddress = props.sendEmailAddress;

    const sendEmail = (e) => {
        e.preventDefault();
        if (userInfo.id.length > 0) {
            emailjs.sendForm('service_oqhxmdn', 'template_of3e5rc', formRef.current, '3oDkBnYSVc5dycbl0')
                .then((result) => {
                    console.log(result.text);
                    const fetch = async () => {
                        let updatedData = {
                            ...bookInfoEmptyObj,
                            userId: selectedBookInfo.userId,
                            bookName: selectedBookInfo.bookName,
                            bookType: selectedBookInfo.bookType,
                            imageUrl: selectedBookInfo.imageUrl,
                            count: selectedBookInfo.count,
                            deliveryType: selectedBookInfo.deliveryType,
                            note: selectedBookInfo.note,
                            isEnd: false,
                            status: shippingStatus.Ordered,
                            orderedUserId: userInfo.id
                        }
                        const documentRef = db.collection(Tables.BookInfo).doc(selectedBookInfo.id);
                        // Use the update method to modify specific fields in the document
                        await documentRef.update(updatedData);
                        console.log('Document updated successfully!');
                    };
                    fetch();
                    props.onClose();
                }, (error) => {
                    console.log(error.text);
                });
        }
    };

    return (
        <div className='absolute inset-0 z-10'>
            <div className='relative bg-white border-2 left-[600px] text-[24px] w-[400px] top-[100px] border-[#cbd5e1] rounded-md shadow-2xl'>
                <div className="inline-flex">
                    <label className=" ml-8 mt-3 font-bold text-[32px] w-fit">Sent Request</label>
                    <MdClose className=" absolute right-2 top-2 hover:bg-[#a1a1aa] cursor-pointer" style={{ color: 'black', fontSize: '28px' }} onClick={props.onClose} />
                </div>
                <form ref={formRef} onSubmit={sendEmail} className=' m-8'>
                    <label>Book Name</label><br />
                    <MDBInput type="text" name="book_name" value={requestBook} readOnly={true} /><br />
                    <label className=' font-bold'>Name</label><br />
                    <MDBInput type="text" name="user_name" value={userInfo.userName} readOnly={true} /><br />
                    <label>Email</label><br />
                    <MDBInput type="email" name="user_email" value={userInfo.email} readOnly={true} /><br />
                    <label>Shipping Address</label><br />
                    <textarea className="form-control" name="user_address" rows="5" maxLength={400} value={address} readOnly={true} /><br />
                    <input type='email' name='send_email' className=' w-0 h-0 outline-none' value={sendEmailAddress} />
                    <Button type="submit" className=' ml-[95px]' >Send Message</Button>
                </form>
            </div>
        </div>
    );
};