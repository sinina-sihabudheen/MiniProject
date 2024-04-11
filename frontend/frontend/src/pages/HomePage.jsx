import React from 'react'
import LoginPage from './LoginPage'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

const HomePage = ({title}) => {
  return (
    <div>
        <p>Welcome... </p>    
        <Header />
      
    </div>
  )
}

export default HomePage