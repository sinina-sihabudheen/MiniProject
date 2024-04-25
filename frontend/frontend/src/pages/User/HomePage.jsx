import React, { useEffect, useState } from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { userLogout } from '../../redux/userReducer'
import { useDispatch } from 'react-redux'

const HomePage = ({title}) => {
  const [user,setUser] = useState(false)
  const dispatch = useDispatch()

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
    dispatch(userLogout())
    setUser(false)
  }  
  return (
    // <div >
    //     <h1 className=''>Welcome... </h1>    
    //     <div className="card">
    //       { 
    //         !user ?
    //         <div className="card-body flex  ">
    //           <Link to={'/login'}>
    //           <button className='btn'><FaSignInAlt />Login</button></Link>
    //           <Link to={'/signup'}>
    //           <button className='btn'><FaUser />Signup</button></Link>
    //         </div> :
    //         <div className="card-body flex  ">
    //           <button className='btn' onClick={logoutHandle}><FaSignOutAlt />Logout</button>
    //           <Link to={'/profile'}>
    //           <button className='btn'><FaUser />Profile</button></Link>
    //         </div>}
    //     </div>      
    // </div>


    <div className="flex justify-center items-center w-screen h-screen bg-gray-300">   
      <div className=" max-w-md p-8 w-screen  bg-blue-100 shadow-lg rounded-lg">      
        <h1 className="text-3xl font-bold mb-6">Welcome To Home Page</h1>  
        { !user ?       
        <div className="space-x-4"> 
          <Link to={'/login'}>      
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Sign In
            </button>
          </Link> 
          <Link to={'/signup'}>
            <button className="bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Sign Up
            </button>
          </Link>
        </div> :
        <div className="space-x-4">
          <button className="bg-red-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={logoutHandle}>
            Sign Out
          </button>
          <Link to={'/profile'}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              My Profile
            </button>   
          </Link>     
        </div>}
      </div>
  </div>


  )
}

export default HomePage