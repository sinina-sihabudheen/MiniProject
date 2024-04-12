import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import login, { getlocal } from '../../helpers/auth';
import {jwtDecode} from 'jwt-decode';
import { updateAuthToken, updateUser } from '../../redux/userReducer'
import {Link, useNavigate} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'



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
  })
 


  // const loginSubmit= async(e) =>{ 
  //   e.preventDefault()
  //   if (e.target.email.value.trim()===""){
  //     toast.error("Please enter email field!")
  //   }
    
    
  //   try{
  //     const response= await login(e)
  //     const decoded=jwtDecode(response.access)
  //     console.log(decoded)
  
  //     dispatch(updateUser(decoded))
  //     dispatch(updateAuthToken(response))
  //     console.log("successfull")
  //     navigate('/')
      
      
  //   }catch(err){
  //     // toast.error(err)
  //     console.log("Error occured:",err);
  //   }

  // }
  const loginSubmit = async (e) => { 
    e.preventDefault();
    
    
    console.log('xyz',email,password)
  
    if (email === "") {
      toast.error("Please enter email field!");
      return;
    }
  
    try {
      const response = await login(email, password);
      console.log("response:",response)
      const decoded=jwtDecode(response.access)
      console.log("decode",decoded)  
      dispatch(updateUser(decoded))
      dispatch(updateAuthToken(response))
      console.log("successfull")     
      navigate('/profile')
   
    } catch (err) {
      toast.error("Invalid Credentials..!");
      console.error("Error occurred:", err);
     
    }
  }
  

  return (
    <div>
      
      <form onSubmit={loginSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} name='password' id="exampleInputPassword1" placeholder="Password" />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>

 

  );
};

export default LoginPage;
