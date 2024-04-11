import {configureStore} from '@reduxjs/toolkit'

import userReducer from "./userReducer.jsx"

export const store=configureStore({
  reducer:{
    users:userReducer
  }
})
