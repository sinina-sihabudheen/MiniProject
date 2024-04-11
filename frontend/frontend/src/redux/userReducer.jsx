import {createSlice} from '@reduxjs/toolkit'
import { useReducer } from 'react'


const INITIAL_STATE={
    user:null,
    userToken:null,
    count:0
}
const userSlice = createSlice({
    name:'users',
    initialState:INITIAL_STATE,
    reducers:{
        change:(state)=>{
            state.count = 1
        },
        updateAuthToken:(state,action)=>{
            state.userToken=action.payload
        },
        updateUser:(state,action)=>{
            state.user=action.payload
        }
    }
})


export const { loginUser,change,updateAuthToken,updateUser } = userSlice.actions

export default userSlice.reducer