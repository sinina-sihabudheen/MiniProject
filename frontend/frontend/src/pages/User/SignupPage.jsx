import React from 'react'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import Api from '../../Services/axios'


const Signup = () => {
    const navigate=useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    
    const signupSubmit= async (e) =>{
        e.preventDefault()
        console.log('hello',username,email,password)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (username.trim()==""){
            toast.error("Please enter username")
            return 
        }else if (!emailRegex.test(email)){
            toast.error("Enter a valid Email Id")
            return 
        }else if (password!==password1){
            toast.error("Password didn't match!")
            return
        }else if (password.length<6){
            toast.error("Password should contain atleast six characters!")
            return 
        }

        try{         

            const response= fetch('http://localhost:8000/api/register/',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    username,
                    email,
                    password
                })
            })
            console.log(response)
            if(response.status===400){
                toast.error('Username or Email id already exist!')
                navigate('/register')
    
            }else{
                toast.success("User Registered successfully!")
                navigate('/login')
            }
          
            
        }
        catch(err){
            console.log(err)
            toast.error("Some error occured:",err)
            navigate('/register')

        }

    }

  return (
    <>
         <Toaster position='top-left' reverseOrder='false' ></Toaster>
        <section className='heading'>
        <h1>
          Register
        </h1>
       
        </section>
        <section className='form'>
        <div className="regform  bg-white">
            <div  class='container p-5 border border-1'>
            
                <form onSubmit={signupSubmit}>
                    <h2>Register for free!</h2>
                    <br />
                    <div className="form-group">
                    <label for="username" className="form-label">Username</label>
                        <input type="text" 
                        className="form-control" 
                        name='username' 
                        id="username"                        
                        placeholder='Enter Username'
                        onChange={(e)=>setUsername(e.target.value)}/>
                    </div><br />
                    <div className="form-group">
                    <label for="email" className="form-label">Email Address</label>
                        <input type="email" 
                        className="form-control" 
                        name='email' 
                        id="email"                        
                        placeholder='Enter Email address' 
                        onChange={(e)=>setEmail(e.target.value)}/>
                    </div><br />
                    <div className="form-group">
                    <label for="password" className="form-label">Password</label>
                        <input type="password" 
                        name="password" 
                        className="form-control" 
                        id="password" 
                        placeholder='Enter Password'
                        onChange={(e)=>setPassword(e.target.value)}/>
                    </div><br />
                    <div className="form-group">
                    <label for="password1" className="form-label">Confirm Password</label>
                        <input type="password" 
                        name="password1" 
                        className="form-control" 
                        id="password1" 
                        placeholder='Confirm Password'
                        onChange={(e)=>setPassword1(e.target.value)}/>
                    </div><br />
                  
                    <button type="submit" className="btn btn-primary">SignUp</button>
                   

                </form>
                <br/>
                <p>Already have an account? <Link to='/login' className='text-danger text-decoration-none'>Login</Link></p>
                <br/>
        
            </div>
        </div>
        </section>
    </>
  )
}

export default Signup