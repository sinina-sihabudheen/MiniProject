import React from 'react'
import {Outlet, Navigate, Link} from "react-router-dom"
import { useSelector } from 'react-redux'



const LogoutProtect = () => {
    const userInfo = useSelector((state)=>state.users.user)
    console.log('hi',userInfo)
  return (

    !userInfo ? <Outlet /> : <Navigate to='/' />

  )
}

export default LogoutProtect