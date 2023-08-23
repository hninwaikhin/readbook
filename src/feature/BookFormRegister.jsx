import React, { useState } from "react";
import { MDBInput } from 'mdb-react-ui-kit';
import { Button } from "react-bootstrap";
import { firebaseStorage } from "../firebase/config";
import { Tables, bookInfoEmptyObj, deliveryType, bookType, navigateToBookRegisteredList, shippingStatus } from "../common/Variable";
import { projectStorage as db } from "../firebase/config";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { setIsShowing } from "../slice/loadingSlice";
import MainTitle from "../components/MainTitle";
import { GetUserInfo } from "../slice/userSlice";
import { MessageBox } from "../components/MessageBox";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GetBookInfo } from "../slice/bookListSlice";
import { useEffect } from "react";

function BookFormRegister(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(GetUserInfo);
    const [searchParams] = useSearchParams();
    const bookId = searchParams.get('bookId');
    const selectedBookInfo = useSelector((state) => GetBookInfo(state, bookId));
    const [bookName, setBookName] = useState('');
    const [selectedBookType, setSelectedBookType] = useState(bookType.None);
    const [imageUrl, setImageUrl] = useState(null);
    const [fileObj, setFileObj] = useState(null);
    const [count, setCount] = useState(1);
    const [note, setNote] = useState('');
    const [selectedDeliType, setSelectedDeliType] = useState(deliveryType.None);
    const [loginError, setLoginError] = useState(false);

    useEffect(() => {
        if (selectedBookInfo) {
            setBookName(selectedBookInfo.bookName);
            setSelectedBookType(selectedBookInfo.bookType);
            setImageUrl(selectedBookInfo.imageUrl);
            setCount(selectedBookInfo.count);
            setNote(selectedBookInfo.note);
            setSelectedDeliType(selectedBookInfo.deliveryType);
        }
    }, []);

    const handleBookNameChange = (e) => {
        setBookName(e.target.value);
    };

    const handleBookTypeChange = (e) => {
        let selectValue = e.target.value;
        setSelectedBookType(Number(selectValue));
    };

    const handlePhotoChange = async (e) => {
        if (selectedBookInfo && selectedBookInfo.imageUrl.length > 0) {
            URL.revokeObjectURL(selectedBookInfo.imageUrl);
        }
        setImageUrl(URL.createObjectURL(e.target.files[0]));
        setFileObj(e.target.files[0]);
    };

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    }

    const handleDeliTypeSelectChange = (event) => {
        let selectValue = event.target.value;
        setSelectedDeliType(Number(selectValue));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userInfo.id.length === 0) {
            setLoginError(true);
            return;
        }
        dispatch(setIsShowing(true));
        try {
            const storageRef = firebaseStorage.ref();
            const extension = fileObj.name.split('.').pop();
            const fileName = uuidv4() + "." + extension;
            const fileRef = storageRef.child(fileName);
            await fileRef.put(fileObj);
            const url = await fileRef.getDownloadURL();

            if (imageUrl.length > 0) {
                let bookInfo = {
                    ...bookInfoEmptyObj,
                    userId: userInfo.id,
                    bookName: bookName,
                    bookType: selectedBookType,
                    imageUrl: url,
                    count: Number(count),
                    deliveryType: selectedDeliType,
                    note: note,
                    isEnd: false,
                    status: shippingStatus.None,
                    orderedUserId: "",
                }
                const collectionRef = db.collection(Tables.BookInfo);
                await collectionRef.add(bookInfo);
                console.log('Document added successfully!');
                navigate(navigateToBookRegisteredList);
            }
        }
        catch (error) {
            console.error(error);
        }
        dispatch(setIsShowing(false));
    };

    async function handleUpdate(e) {
        e.preventDefault();
        if (userInfo.id.length === 0) {
            setLoginError(true);
            return;
        }
        dispatch(setIsShowing(true));
        try {
            let newImgUrl = "";
            if (fileObj) {
                const storageRef = firebaseStorage.ref();
                const extension = fileObj.name.split('.').pop();
                const fileName = uuidv4() + "." + extension;
                const fileRef = storageRef.child(fileName);
                await fileRef.put(fileObj);
                newImgUrl = await fileRef.getDownloadURL();
                deleteFile();
            }
            else {
                newImgUrl = selectedBookInfo.imageUrl;
            }

            if (imageUrl.length > 0) {
                let updatedData = {
                    ...bookInfoEmptyObj,
                    userId: userInfo.id,
                    bookName: bookName,
                    bookType: selectedBookType,
                    imageUrl: newImgUrl,
                    count: Number(count),
                    deliveryType: selectedDeliType,
                    note: note,
                    isEnd: false,
                    status: selectedBookInfo.status,
                    orderedUserId: selectedBookInfo.orderedUserId,
                }
                const documentRef = db.collection(Tables.BookInfo).doc(bookId);
                // Use the update method to modify specific fields in the document
                await documentRef.update(updatedData);
                console.log('Document updated successfully!');
                navigate(navigateToBookRegisteredList);
            }            
        }
        catch (error) {
            console.error(error);
        }
        dispatch(setIsShowing(false));
    }

    async function deleteFile() {
        try {
            const storageRef = firebaseStorage.ref();
            const fileNameWithQuery = selectedBookInfo.imageUrl.split('/').pop();
            const deletefileName = fileNameWithQuery.split('?')[0];
            const deletefileRef = storageRef.child(deletefileName);
            // check file exist or not
            await deletefileRef.getDownloadURL();
            deletefileRef.delete();
        } catch (error) {
            console.log(`File does not exist.`);
        }
    }

    const isActiveBtn = () => {
        return bookName.length === 0 || selectedBookType.length === bookType.None || imageUrl === null || count === 0 || selectedDeliType === deliveryType.None;
    }

    return (
        <>
            <div className="relative mt-8 ml-8 w-[1200px] h-[700px]">
                <MainTitle title="Book Registration Form" showHomeIcon={true} />
                <div className="flex text-[24px]">
                    <form className="w-[800px]">
                        <div className="mt-4">
                            <label htmlFor="bookName">Book Name:</label>
                            <MDBInput type="text" id="bookName" value={bookName} onChange={handleBookNameChange} maxLength={100}
                                placeholder="Enter text (max 100 characters)"
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="bookType">Book Type:</label>
                            <div>
                                <select id="bookType" className=" w-[800px] h-[40px] rounded-md focus:outline-none custom-select text-[16px]"
                                    value={selectedBookType} onChange={handleBookTypeChange}
                                >
                                    <option value={bookType.None}>Select an option</option>
                                    <option value={bookType.Non_fiction}>Non-fiction.</option>
                                    <option value={bookType.Edited_non_fiction}>Edited (non-fiction)</option>
                                    <option value={bookType.Reference_non_fiction}>Reference (non-fiction)</option>
                                    <option value={bookType.Fiction}>Fiction.</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="photo">Book Image:</label>
                            <MDBInput type="file" id="imageUpload" onChange={handlePhotoChange} />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="bookType">Count:</label>
                            <MDBInput type="number" id="count" readOnly={true} disabled={true} value={count} />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="bookType">Delivery Type:</label>
                            <div>
                                <select id="deliveryType" className=" w-[800px] h-[40px] rounded-md focus:outline-none custom-select text-[16px]"
                                    value={selectedDeliType} onChange={handleDeliTypeSelectChange}
                                >
                                    <option value={deliveryType.None}>Select an option</option>
                                    <option value={deliveryType.FreeDelivery}>Free Delivery</option>
                                    <option value={deliveryType.COD}>COD (Cash On Delivery)</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="bookType">Note:</label>
                            <br />
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="5"
                                maxLength={400}
                                value={note}
                                onChange={handleNoteChange}
                                placeholder="Enter text (max 400 characters)"
                            ></textarea>
                        </div>
                        <div className="mt-14">
                            {bookId === null ?
                                <Button type="submit" disabled={isActiveBtn()} onClick={handleSubmit}>Register Book</Button> :
                                <Button type="submit" disabled={isActiveBtn()} onClick={handleUpdate}>Update</Button>
                            }
                        </div>
                    </form>
                    <div className="w-[450px] h-[450px] ml-8">
                        {imageUrl && <img src={imageUrl} alt="..." />}
                    </div>
                </div>
            </div>
            {loginError && <MessageBox
                title="Book Registration"
                text="Please log in to register your book information."
                onClick={() => { setLoginError(false); }}
            />}
        </>
    );
}

export default BookFormRegister;