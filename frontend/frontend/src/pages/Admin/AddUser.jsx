import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'


const AddUser = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')

    const navigate=useNavigate()

    const handleSubmit= async (e) => {
        e.preventDefault()
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

            const user = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })
            if (user.status === 400){
                toast.error("Username or Email already exists!")

            }else{

                navigate('/adminhome')
                toast.success("User created successfully!")
            }
        }catch(err){
            console.log('1');
            toast.error('Error occured!')
            navigate('/adduser')
        }

    }
  return (
    <>
    {/* <Toaster position='top-left' reverseOrder='false' ></Toaster> */}
   {/* <section className='heading'>
   <h3>
     Add New User
   </h3>
  
   </section>
   <section className='form'>
   <div className="regform  bg-white">
       <div  class='container p-5 border border-1'>
       
           <form onSubmit={handleSubmit}>
               <h5>Add Details Here..</h5>
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
             
               <button type="submit" className="btn btn-primary">Add User</button>
               <Link to={'/adminhome'}>
               <button className="btn btn-danger">Cancel</button></Link>
               
           </form>
           
   
       </div>
   </div>
   </section> */}


<div className="flex justify-center items-center h-screen bg-white-300">   
    <Toaster position='top-left' reverseOrder='false' ></Toaster>

    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                 Add New User
            </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900">
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
                className="block text-sm font-medium leading-6 text-gray-900">
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
                    className="block text-sm font-medium leading-6 text-gray-900">
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
                    className="block text-sm font-medium leading-6 text-gray-900">
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
                className="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Add User
                </button>
                <Link to={'/adminhome'}>
                    <button className="justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Cancel
                    </button>
                </Link>
            </div>
            </form>

        </div>
    </div>
</div>
</>
   )
}

export default AddUser