import {configureStore} from '@reduxjs/toolkit'

import userReducer from "./userReducer.jsx"
import AdminReducer from './AdminReducer.jsx'

export const store=configureStore({
  reducer:{
    users:userReducer,
    admin:AdminReducer
  }
})
