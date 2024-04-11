// import React from 'react'
// import {useSelector} from 'react-redux'

// const LoginPage = () => {
//   const users=useSelector((state)=>state.users)
//   console.log(users)
//   // const dispatch= useDispatch()
//   return (
//     <div>
//         <form action="">
//             <input type="text" name="username" placeholder='Enter Username'/>
//             <input type="password" name="password" placeholder='Enter Password'/>
//             <input type="submit" />

//         </form>
//     </div>
//   )
// }

// export default LoginPage

import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import login, { getlocal } from '../helpers/auth'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { updateAuthToken, updateUser } from '../redux/userReducer'
import toast, { Toaster } from 'react-hot-toast'

const LoginPage = () => {
  const navigate= useNavigate()
  const response=getlocal()

  const {user,userToken}=useSelector((state)=>state.users)
  const dispatch= useDispatch()

  useEffect(()=>{
    // console.log(response);
    if (response) {
      navigate('/')
    }
  })

  const handleSubmit= async(e) =>{ 
    e.preventDefault()
    if (e.target.email.value.trim()===""){
      toast.error("Please enter email field!")
    }
    
    
    try{
      const response= await login(e)
      const decoded=jwtDecode(response.access)
      console.log(decoded)
  
      dispatch(updateUser(decoded))
      dispatch(updateAuthToken(response))
      console.log("successfull")
      navigate('/')
      
      
    }catch(err){
      // toast.error(err)
      console.log("Error occured:",err);
    }

  }

  return (
    <div>
    <Toaster position='top-left' reverseOrder='false' ></Toaster>
    <div className='logindiv bg-white'>

      <div class="container p-5">
        <h1 class="text-dark">Login page</h1>
        <br/>
        <form onSubmit={handleSubmit}>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" name='email' className='inputsize'class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"/>
           
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" name='password' class="form-control" id="exampleInputPassword1"/>
        </div>
        
        <button type="submit" class="loginbtn">Login</button>
       

        </form>
        <br/>
        <p>Don't have an account?</p>
        <h6><Link to="/register">Register Free here!</Link></h6>
      </div>
    </div>

    </div>
  )
}

export default LoginPage