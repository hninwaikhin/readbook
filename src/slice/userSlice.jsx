import { createSlice } from '@reduxjs/toolkit';

export const addressEmptyObj = {
    postalCode: "",
    prefecture: "",
    city: "",
    streetAddress: ""
}

const initState = {
    userInfo: {
        id: "", 
        userName: "",
        email: "",
        address: { ...addressEmptyObj }
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
    },
});

export const GetUserInfo = (state) => {
    return state.user.userInfo;
}

export const {
    setUserInfo,
} = userSlice.actions;
export default userSlice.reducer;