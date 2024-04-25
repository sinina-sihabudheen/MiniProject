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
      
      <Toaster position='top-left' reverseOrder='false' ></Toaster>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Admin Login
        </h1>
       
      </section><br />
      <section className='form'>
      <form onSubmit={loginSubmit}>
        <div className="form-group">
       <label className="form-label">Email Address</label>

          <input type="email" 
          name='email' 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)} 
          className="form-control" 
          id='email'
          placeholder="Enter email" />
        </div>
        <div className="form-group">
        <label className="form-label">Password</label>
          <input type="password" 
          className="form-control" 
          value={password} 
          onChange={(e)=>setPassword(e.target.value)} 
          name='password' 
          id='password' 
          placeholder="Password" />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </section>
      </>
  )
}

export default AdminLogin