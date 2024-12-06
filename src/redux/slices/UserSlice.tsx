import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        loginData: null
    },
    reducers: {

        getAuthSuccess: (state, action) => {
            state.loginData = action.payload;
        },
    }
})

export const { getAuthSuccess } = UserSlice.actions
export default UserSlice.reducer