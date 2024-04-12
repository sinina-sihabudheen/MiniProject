import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
    user: null,
    userToken: null,
    count: 0
};

const userSlice = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {
        setUserInfo: (state, action) => {
            state.user = action.payload; 
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        userLogout: (state) => {
            state.user = null; 
            localStorage.removeItem('userInfo');
        },
        updateAuthToken: (state, action) => {
            state.userToken = action.payload;
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { setUserInfo, userLogout, updateAuthToken, updateUser } = userSlice.actions;
export default userSlice.reducer;
