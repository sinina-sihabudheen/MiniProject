// import { createSlice } from '@reduxjs/toolkit';

// const INITIAL_STATE = {
//     user: null,
//     userToken: null,
//     count: 0
// };

// const userSlice = createSlice({
//     name: 'users',
//     initialState: INITIAL_STATE,
//     reducers: {
//         setUserInfo: (state, action) => {
//             state.user = action.payload; 
//             localStorage.setItem('userInfo', JSON.stringify(action.payload));
//         },
//         userLogout: (state) => {
//             state.user = null; 
//             localStorage.removeItem('userInfo');
//         },
//         updateAuthToken: (state, action) => {
//             state.userToken = action.payload;
//         },
//         updateUser: (state, action) => {
//             state.user = action.payload;
//         }
//     }
// });

// export const { setUserInfo, userLogout, updateAuthToken, updateUser } = userSlice.actions;
// export default userSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage if available
const loadInitialState = () => {
    const storedState = localStorage.getItem('reduxState');
    if (storedState) {
        return JSON.parse(storedState);
    } else {
        return {
            user: null,
            userToken: null,
            count: 0
        };
    }
};

const userSlice = createSlice({
    name: 'users',
    initialState: loadInitialState(),
    reducers: {
        setUserInfo: (state, action) => {
            state.user = action.payload; 
            localStorage.setItem('reduxState', JSON.stringify(state));
        },
        userLogout: (state) => {
            state.user = null; 
            localStorage.removeItem('reduxState');
            localStorage.removeItem('userInfo')
        },
        updateAuthToken: (state, action) => {
            state.userToken = action.payload;
            localStorage.setItem('reduxState', JSON.stringify(state));
        },
        updateUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('reduxState', JSON.stringify(state));
        },
        incrementCount: (state) => {
            state.count += 1;
            localStorage.setItem('reduxState', JSON.stringify(state));
        },
        decrementCount: (state) => {
            state.count -= 1;
            localStorage.setItem('reduxState', JSON.stringify(state));
        }
    }
});

export const { setUserInfo, userLogout, updateAuthToken, updateUser, incrementCount, decrementCount } = userSlice.actions;
export default userSlice.reducer;
