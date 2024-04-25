// import { createSlice } from '@reduxjs/toolkit';

// const INITIAL_STATE = {
//     admin: null,
//     adminToken: null,
   
// };

// const adminSlice = createSlice({
//     name: 'admin',
//     initialState: INITIAL_STATE,
//     reducers: {
//         setAdminInfo: (state, action) => {
//             state.admin = action.payload; 
//             localStorage.setItem('adminInfo', JSON.stringify(action.payload));
//         },
//         adminLogout: (state) => {
//             state.user = null; 
//             localStorage.removeItem('adminInfo');
//         },
//         updateAdminToken: (state, action) => {
//             state.adminToken = action.payload;
//         },
       
        
//     }
// });

// export const { setAdminInfo, adminLogout,updateAdminToken } = adminSlice.actions;
// export default adminSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const loadInitialAdminState = () => {
    const storedAdminState = localStorage.getItem('adminState');
    if (storedAdminState) {
        return JSON.parse(storedAdminState);
    } else {
        return {
            admin: null,
            adminToken: null,
        };
    }
};

const adminSlice = createSlice({
    name: 'admin',
    initialState: loadInitialAdminState(),
    reducers: {
        setAdminInfo: (state, action) => {
            state.admin = action.payload; 
            localStorage.setItem('adminState', JSON.stringify(state));
        },
        adminLogout: (state) => {
            state.admin = null; 
            localStorage.removeItem('adminState');
        },
        updateAdminToken: (state, action) => {
            state.adminToken = action.payload;
            localStorage.setItem('adminState', JSON.stringify(state));
        },
    }
});

export const { setAdminInfo, adminLogout, updateAdminToken } = adminSlice.actions;
export default adminSlice.reducer;
