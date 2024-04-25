import React from 'react'
import {Outlet, Navigate} from "react-router-dom"
import { useSelector } from 'react-redux'



const AdminProtect = () => {
    const adminInfo = useSelector((state)=>state.admin.admin)
    console.log(adminInfo,"admin info");
  return (

    adminInfo ? <Outlet /> : <Navigate to='/admin' />

  )
}

export default AdminProtect