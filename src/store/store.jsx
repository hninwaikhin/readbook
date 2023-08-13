import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../slice/loginSlice';
import bookListReducer from '../slice/bookListSlice';
import loadingReducer from '../slice/loadingSlice';
import userReducer from '../slice/userSlice';

const store = configureStore({
    reducer: {
        login: loginReducer,
        bookList: bookListReducer,
        loading: loadingReducer,
        user: userReducer,
    },
});
export { store };