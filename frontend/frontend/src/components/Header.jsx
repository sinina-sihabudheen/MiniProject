import React from 'react'
import {Link, useNavigate } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'
import { getlocal } from '../helpers/auth'
import LoginPage from '../pages/User/LoginPage'
import Signup from '../pages/User/SignupPage'
import HomePage from '../pages/User/HomePage'
import { Routes, Route} from "react-router-dom";
import Profile from "../pages/User/UserProfile"

const Header = () => {
  // let {username,is_admin}=jwtDecode(getlocal())
  // const navigate=useNavigate()

  // const logout=()=>{
  //   localStorage.removeItem('userToken')
  //   navigate('/login')
  // }
  return (
    <div>
          
            {/* <Link to="/"><button>Home</button></Link>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/signup"><button>Signup</button></Link> */}
            <Routes>
              <Route path='login' element={<LoginPage/>} />
              <Route path='signup' element={<Signup/>} />
              <Route path='' element={<HomePage/>} />
              <Route path='profile' element={<Profile/> } />
            </Routes>       
        
    </div>
  )
}

export default Header