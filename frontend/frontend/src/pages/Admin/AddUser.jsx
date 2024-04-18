import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    <Toaster position='top-left' reverseOrder='false' ></Toaster>
   <section className='heading'>
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
              

           </form>
          
   
       </div>
   </div>
   </section>
</>
   )
}

export default AddUser