import React, { useEffect, useState } from 'react'
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
  const logoutHandil=()=>{
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
              <button className='me-3 bg-primary text-white'>Login</button></Link>
              <Link to={'/signup'}>
              <button className='me-3 bg-primary text-white'>Signup</button></Link>
            </div> :
            <div className="card-body flex  ">
              <button className='me-3 bg-primary text-white' onClick={logoutHandil}>Logout</button>
              <Link to={'/profile'}>
              <button className='me-3 bg-primary text-white'>Profile</button></Link>
            </div>}
        </div>

      
    </div>
  )
}

export default HomePage