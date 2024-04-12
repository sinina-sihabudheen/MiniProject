import React from 'react'
import './App.css'
import LoginPage from './pages/User/LoginPage'
import HomePage from './pages/User/HomePage'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/Header';

function App() {

  return (
    <>
      <div className='App'>
  
        <Router>
          <Routes>

              <Route path='/*'  element={<Header />} />
              {/* <Route path='login' element={<LoginPage />} />
              <Route path='/*' element={<HomePage />} /> */}
          </Routes>

        </Router>
      </div>
     
    </>
  )
}

export default App
