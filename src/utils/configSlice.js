import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name: "config",
    initialState:{
        lang:"en"
    },
    reducers:{
        chanegLanguage: (state, actions) => {
            state.lang = actions.payload;
        },
    },
});

export const { chanegLanguage } = configSlice.actions;

export default configSlice.reducer;

