import React from 'react'
import {Outlet, Navigate} from "react-router-dom"
import { useSelector } from 'react-redux'



const UserProtect = () => {
    const userInfo = useSelector((state)=>state.users.user)
    console.log('hi',userInfo)
  return (

    userInfo ? <Outlet /> : <Navigate to='/login' />

  )
}

export default UserProtect