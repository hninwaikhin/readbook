import { createSlice } from '@reduxjs/toolkit';

const initState = {
  bookList: [],
  favoriteList: [],
  cartList: [],
};

const bookListSlice = createSlice({
  name: 'bookList',
  initialState: initState,
  reducers: {
    setBookList: (state, action) => {
      state.bookList = action.payload;
    },

    setFavoriteList: (state, action) => {
      state.favoriteList = action.payload;
    },

    setCartList: (state, action) => {
      state.cartList = action.payload;
    },
  },
});

export const GetBookList = (state) => {
  return state.bookList.bookList;
}

export const GetFavoriteList = (state) => {
  return state.bookList.favoriteList;
}

export const GetCartList = (state) => {
  return state.bookList.cartList;
}

export const GetBookInfo = (state, bookId) => {
  return state.bookList.bookList.find(x => x.id === bookId);
}

export const {
  setFavoriteList,
  setBookList,
  setCartList,
} = bookListSlice.actions;
export default bookListSlice.reducer;