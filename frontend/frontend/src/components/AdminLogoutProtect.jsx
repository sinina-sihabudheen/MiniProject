import React from 'react'
import {Outlet, Navigate} from "react-router-dom"
import { useSelector } from 'react-redux'



const AdminLogoutProtect = () => {
    const adminInfo = useSelector((state)=>state.admin.admin)
    console.log(adminInfo,"admin info logout");
  return (

    !adminInfo ? <Outlet /> : <Navigate to='/adminhome' />

  )
}

export default AdminLogoutProtect