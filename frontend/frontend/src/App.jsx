import React from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/Header';

function App() {

  return (
    <>
      <div className='App'>
  
        <Router>
          <Header />
          <Routes>
            <Route path='login' element={<LoginPage />} />
            <Route path='/*' element={<HomePage />} />
          </Routes>

        </Router>
      </div>
     
    </>
  )
}

export default App
