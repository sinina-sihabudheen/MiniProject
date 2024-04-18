import React, { useEffect, useState } from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import LoginPage from './LoginPage'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import { getlocal } from '../../helpers/auth'

const HomePage = ({title}) => {
  const [user,setUser] = useState(false)

  useEffect(() => {
  const response=localStorage.getItem("userToken")
  console.log(response);
    if(response){
      console.log("called");
      setUser(true)
    }
  }, [])
  const logoutHandle=()=>{
    localStorage.removeItem("userToken")
    setUser(false)
  }  
  return (
    <div >
        <h1 className=''>Welcome... </h1>    
        <div className="card">
          { 
            !user ?
            <div className="card-body flex  ">
              <Link to={'/login'}>
              <button className='btn'><FaSignInAlt />Login</button></Link>
              <Link to={'/signup'}>
              <button className='btn'><FaUser />Signup</button></Link>
            </div> :
            <div className="card-body flex  ">
              <button className='btn' onClick={logoutHandle}><FaSignOutAlt />Logout</button>
              <Link to={'/profile'}>
              <button className='btn'><FaUser />Profile</button></Link>
            </div>}
        </div>

      
    </div>
  )
}

export default HomePage