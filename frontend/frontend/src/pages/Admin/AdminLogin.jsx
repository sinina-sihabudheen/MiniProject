import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import adminlogin, {getAdminlocal} from '../../helpers/adminAuth';
import {jwtDecode} from 'jwt-decode';
import { updateAdminToken, setAdminInfo} from '../../redux/AdminReducer'
import {Link, useNavigate} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { FaSignInAlt } from 'react-icons/fa'


const AdminLogin = () => {
  const [email,setEmail]= useState('')
  const [password,setPassword] = useState('')

  const navigate= useNavigate()
  const response=getAdminlocal()

  const {admin,adminToken}=useSelector((state)=>state.admin)
  const dispatch= useDispatch()

  useEffect(()=>{
    if (response) {

      navigate('/admin')
    }
  },[])
 


  const loginSubmit= async(e) =>{ 
    e.preventDefault()
    if (e.target.email.value.trim()===""){
      toast.error("Please enter email field!")
    }
    
    
    try{
      const response= await adminlogin(email, password)
      console.log(response)
      if (response.error) {
        toast.error(response.error); 
        return; 
      }
      

      const decoded=jwtDecode(response.access)
      if (!decoded.is_admin){
        // toast.error('You do not have permission to access the admin page.');
        return;
      }

      dispatch(setAdminInfo(decoded))

      dispatch(updateAdminToken(response))
      console.log("successfull")
    
      navigate('/adminhome')
    
      
      
    }catch(err){
      console.error("Error occurred:", err);
      toast.error("Login failed. Please check your credentials.");
    }

  }
  
  return (
    <>

<div className="flex justify-center items-center w-screen h-screen bg-gray-300">   
<Toaster position='top-left' reverseOrder='false' ></Toaster>

<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8  bg-white">
<div className="sm:mx-auto sm:w-full sm:max-w-sm ">

<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
Sign in to admin account
</h2>
</div>
<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
<form className="space-y-6 " onSubmit={loginSubmit}>
<div>
  <label
    htmlFor="email"
    className="block text-sm font-medium leading-6 text-gray-900"
  >
    Email address
  </label>
  <div className="mt-2">
   
    <input type="email" 
    name='email' 
    value={email} 
    onChange={(e)=>setEmail(e.target.value)} 
    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    id='email'
    placeholder="Email" />
  </div>
</div>
<div>
  <div className="flex items-center justify-between">
    <label
      htmlFor="password"
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      Password
    </label>
   
  </div>
  <div className="mt-2">
   
    <input type="password" 
    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    value={password} 
    onChange={(e)=>setPassword(e.target.value)} 
    name='password' 
    id='password' 
    placeholder="Password" />
  </div>
</div>
<div>
  <button
    type="submit"
    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    Sign in
  </button>
</div>
</form>

</div>
</div>

</div>
      </>
  )
}

export default AdminLogin