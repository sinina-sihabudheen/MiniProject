
import React, { useEffect } from 'react'
import { getlocal } from '../helpers/auth'
import { jwtDecode } from 'jwt-decode'
import { useNavigate, useParams } from 'react-router-dom'
import AdminPanel from '../pages/Admin/AdminHome'
import HomePage from '../pages/User/HomePage'
import LoginPage from '../pages/User/LoginPage'



const PrivateRouter = ({ children, ...rest }) => {
    const response=getlocal('authToken')
    const navigate= useNavigate()
    const { userType } = useParams();

    useEffect(()=>{
        if(!response){
            navigate("/")
        }
    },[response,navigate])

   
    if (response) {
        const decoded = jwtDecode(response);
        if (decoded.is_admin && userType === 'admin') {
            console.log("Admin page");
            return (
                <div>
                    <AdminPanel title={'ADMIN PAGE'} />
                </div>
            );
        } else if (!decoded.is_admin && userType === 'user') {
            console.log("Home page");
            return (
                <div>
                    <HomePage title={'HOME PAGE'} />
                </div>
            );
        } else {
            // Redirect to login page if userType is not specified or invalid
            return <LoginPage />;
        }
    } else {
        return null;
    }
}

export default PrivateRouter