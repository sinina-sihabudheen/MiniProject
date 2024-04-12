import React from 'react'
import LoginPage from './LoginPage'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'

const HomePage = ({title}) => {
  return (
    <div >
        <h1 className=''>Welcome... </h1>    
        <div class="card">
  <div className="card-body flex  ">
    <Link to={'/login'}>
   <button className='me-3 bg-primary text-white'>Login</button></Link>
   <Link to={'/signup'}>
   <button className='me-3 bg-primary text-white'>Signup</button></Link>
  </div>
</div>

      
    </div>
  )
}

export default HomePage