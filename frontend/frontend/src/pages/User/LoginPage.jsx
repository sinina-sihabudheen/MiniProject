import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import login, { getlocal } from '../../helpers/auth';
import {jwtDecode} from 'jwt-decode';
import { setUserInfo, updateAuthToken, updateUser } from '../../redux/userReducer'
import {Link, useNavigate} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { FaSignInAlt } from 'react-icons/fa'



const LoginPage = () => {
  const [email,setEmail]= useState('')
  const [password,setPassword] = useState('')

  const navigate= useNavigate()
  const response=getlocal()

  const {user,userToken}=useSelector((state)=>state.users)
  const dispatch= useDispatch()

  useEffect(()=>{
    if (response) {
      navigate('/')
    }
  },[response, navigate])
 


  const loginSubmit= async(e) =>{ 
    e.preventDefault()
    if (e.target.email.value.trim()===""){
      toast.error("Please enter email field!")
    }
    
    
    try{
      const response= await login(email, password)
      console.log(response)
      if (response.error) {
        toast.error(response.error); 
        return; 
      }
      

      const decoded=jwtDecode(response.access)
      console.log(decoded)
      if (decoded.is_admin){
        setEmail('');
        setPassword('');
        return;
      }
      dispatch(setUserInfo(decoded))  
      dispatch(updateUser(decoded))
      dispatch(updateAuthToken(response))
      console.log("successfull")
    
      navigate('/')
      
      
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
          <FaSignInAlt /> Login
        </h1>
       
      </section><br />
      <section className='form'>
      <form onSubmit={loginSubmit}>
        <div className="form-group">
       <label  className="form-label">Email Address</label>

          <input type="email" 
          name='email' 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)} 
          className="form-control" 
          id='email'
          placeholder="Enter email" />
        </div>
        <div className="form-group">
        <label  className="form-label">Password</label>
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

 

  );
};

export default LoginPage;
