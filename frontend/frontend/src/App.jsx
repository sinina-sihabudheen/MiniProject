import React from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/Header';
import LoginPage from './pages/User/LoginPage';
import Signup from './pages/User/SignupPage';
import HomePage from './pages/User/HomePage';
import Profile from './pages/User/UserProfile';
import PrivateRouter from './utils/PrivateRouter';
import AddUser from './pages/Admin/AddUser';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminPanel from './pages/Admin/AdminHome';
// import AdminPanel from './pages/Admin/AdminHome';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/*" exact element={<PrivateRouter/>}></Route>
        <Route exact path='/' element={<HomePage/>}>  </Route>
        <Route exact path='/profile' element={<Profile/>}>  </Route>
        <Route Component={LoginPage} path='/login'/>
        <Route Component={Signup} path='/signup'/>
        <Route Component={AddUser} path='/adduser'/>
        <Route Component={AdminLogin} path='/admin'/>
        <Route Component={AdminPanel} path='/adminhome'/>
      </Routes>
    </Router>
  
        {/* <Router>
          <Routes>

              <Route path='/*'  element={<Header />} />
            
          </Routes>

        </Router>
     */}
     
    </>
  )
}

export default App
