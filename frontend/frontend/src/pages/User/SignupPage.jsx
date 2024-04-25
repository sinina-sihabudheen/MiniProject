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
            console.log('ghgj',response)
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
      <div className="flex justify-center items-center w-screen h-screen bg-gray-300">   

         <Toaster position='top-left' reverseOrder='false' ></Toaster>      

<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
   
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
   Sign Up for your account
    </h2>
  </div>
  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" onSubmit={signupSubmit}>
        {/* <h6 className=" text-center text-xl  leading-9 tracking-tight text-gray-400">
            Register for free!
        </h6> */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Username
        </label>
        <div className="mt-2">
         
         
          <input type="text" 
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          name='username' 
           id="username"                        
           placeholder='Enter Username'
           onChange={(e)=>setUsername(e.target.value)}/>
                       
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
         
         
          <input type="email" 
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          name='email' 
          id="email"                        
          placeholder='Enter Email address' 
          onChange={(e)=>setEmail(e.target.value)}/>
                        
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
         
        </div>
        <div className="mt-2">         
         
          <input type="password" 
          name="password" 
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          id="password" 
          placeholder='Enter Password'
          onChange={(e)=>setPassword(e.target.value)}/>
                        
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Confirm Password
          </label>         
        </div>
        <div className="mt-2">
         
        
            <input type="password" 
            name="password1" 
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id="password1" 
            placeholder='Confirm Password'
            onChange={(e)=>setPassword1(e.target.value)}/>
                        
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign Up
        </button>
      </div>
    </form>
    <br/>
        <p>Already have an account? <Link to='/login' className='text-red-600 '>Login</Link></p>
    <br/>
  </div>
</div>
</div>

    </>
  )
}

export default Signup