import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
    name: "loading",
    initialState: { isShowing: false, },
    reducers: {
        setIsShowing: (state, action) => {
            state.isShowing = action.payload;
        },
    },
});

export const GetIsShowing = (state) => {
    return state.loading.isShowing;
}

export const { setIsShowing } = loadingSlice.actions;
export default loadingSlice.reducer;