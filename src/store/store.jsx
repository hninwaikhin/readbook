import { configureStore } from '@reduxjs/toolkit';
import bookListReducer from '../slice/bookListSlice';
import loadingReducer from '../slice/loadingSlice';
import userReducer from '../slice/userSlice';

const store = configureStore({
    reducer: {
        bookList: bookListReducer,
        loading: loadingReducer,
        user: userReducer,
    },
});
export { store };