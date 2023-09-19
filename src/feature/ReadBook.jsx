import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { current } from "@reduxjs/toolkit";
import { currentPage } from "../common/Variable";
import Login from "./Login";
import UserRegister from "./UserRegister";
import BookRegisteredList from "./BookRegisteredList";
import BookFormRegister from "./BookFormRegister";
import ReceiveFormRegister from "./ReceiveFormRegister";
import CartList from "./CartList";
import FavoriteList from "./FavoriteList";
import { Order } from "./Order";

export function ReadBook(props) {
    const [currPage, setCurrPage] = useState(currentPage.Dashboard);
    const [selectedBookId, setSelectedBookId] = useState(-1);

    return (
        <>
            {(currPage === currentPage.Dashboard) && <Dashboard setCurrPage={setCurrPage} setSelectedBookId={setSelectedBookId} />}

            {(currPage === currentPage.Login) && <Login setCurrPage={setCurrPage} />}

            {(currPage === currentPage.UserRegister) && <UserRegister setCurrPage={setCurrPage} />}

            {(currPage === currentPage.BookFormRegister) && <BookFormRegister setCurrPage={setCurrPage} bookId={selectedBookId} />}

            {(currPage === currentPage.BookRegisteredList) && <BookRegisteredList setCurrPage={setCurrPage} setSelectedBookId={setSelectedBookId} />}

            {(currPage === currentPage.ReceiveFormRegister) && <ReceiveFormRegister setCurrPage={setCurrPage} bookId={selectedBookId} />}

            {(currPage === currentPage.CartList) && <CartList setCurrPage={setCurrPage} setSelectedBookId={setSelectedBookId} />}

            {(currPage === currentPage.FavoriteList) && <FavoriteList setCurrPage={setCurrPage} setSelectedBookId={setSelectedBookId} />}

            {(currPage === currentPage.Order) && <Order setCurrPage={setCurrPage} />}
        </>
    );
}