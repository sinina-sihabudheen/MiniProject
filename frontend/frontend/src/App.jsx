import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/User/LoginPage';
import Signup from './pages/User/SignupPage';
import HomePage from './pages/User/HomePage';
import Profile from './pages/User/UserProfile';
import AddUser from './pages/Admin/AddUser';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminPanel from './pages/Admin/AdminHome';
import UserProtect from './components/UserProtect';
import LogoutProtect from './components/LogoutProtect';
import AdminProtect from './components/AdminProtect';
import AdminLogoutProtect from './components/AdminLogoutProtect';


function App() {

  return (
    <>
      <Router>
        <Routes>


          <Route exact path='/' element={<HomePage />}>  </Route>
          <Route Component={AddUser} path='/adduser' />

          <Route path='' element={<AdminLogoutProtect />}>
            <Route Component={AdminLogin} path='/admin' />

          </Route>
          <Route path='' element={<AdminProtect />}>
            <Route Component={AdminPanel} path='/adminhome' />
          </Route>


          <Route path='' element={<LogoutProtect />}>
            <Route Component={LoginPage} path='/login' />
            <Route Component={Signup} path='/signup' />
          </Route>

          <Route path='' element={<UserProtect />}>
            <Route exact path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
