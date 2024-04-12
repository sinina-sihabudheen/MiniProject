import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { getlocal } from '../../helpers/auth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const Profile = () => {
    const { user_id } = jwtDecode(getlocal());
    const [profile_img, setProfileImage] = useState(null);
    const [username, setUsername] = useState('')



    const [isopen, setIsopen] = useState(false)

    const [user, setUser] = useState({
        username: '',
        email: '',
        profile_img: '',
    });
    const history = useNavigate()

    // const handleChange = (e) => {
    //     setUser({
    //         ...user,
    //         username: e.target.value
    //     })
    // }
    const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (name === 'profile_img' && files.length > 0) {
            setUser(prevUser => ({
                ...prevUser,
                profile_img: files[0]  
            }));
        } else {
            setUser(prevUser => ({
                ...prevUser,
                [name]: value
            }));
        }
    };
    


    useEffect(() => {
        async function getUser() {
            try {
                const response = await axios.get(`http://localhost:8000/api/user-details/${user_id}/`);

                setUser(response.data);
                console.log(response.data);


            } catch (error) {
                console.error('Failed to fetch user details:', error);
            }
        }
        getUser();
    }, [user_id]);




    const updateProfile = async (e) => {
        e.preventDefault();
        console.log("ssssss",e.target.username.value);
        const formData = new FormData();
        formData.append('username', user.username);
        formData.append('email', user.email);
        
          
        if (user.profile_img !== null) {
                formData.append('profile_img', user.profile_img);
            }
        
        formData.append('is_active', true);
        


        try {
            const response = await fetch(`http://localhost:8000/api/user-update/${user_id}/`, {
                method: 'PUT',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            toast.success('User updated successfully');
            history('/profile');
            setIsopen(false)
        } catch (error) {
            console.error('Failed to update user: ', error);
            toast.error('Failed to update user');
        }
    };

    // 
    
    // const updateProfile = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    
     
    //     formData.append('username', user.username);
    //     formData.append('email', user.email);
    
      
    //     if (user.profile_img !== null) {
    //         formData.append('profile_img', user.profile_img);
    //     }
    
    //     formData.append('is_active', true);
    
      
    //     try {
    //         const response = await fetch(`http://localhost:8000/api/user-update/${user_id}/`, {
    //             method: 'PUT',
    //             body: formData
    //         });
    
        
         
    //     } catch (error) {
    //         console.error('Failed to update user: ', error);
    //         // Handle error
    //     }
    // };
    




    return (
        <div>
            <div className="container ">
                <Toaster position='top-center' reverseOrder='false' ></Toaster>
                <div className="row ">


                    <div className="card p-0 d-flex flex-column">
                        <div className="card-header ">My Profile</div>
                        {!isopen ? <div className="row">
                            <div className="card-body text-start row col-2">
                                <img
                                    src={user.profile_img ? `http://localhost:8000${user.profile_img}/` : "https://d2t5hgiouuhmes.cloudfront.net/GJIqTd_5v-OIP.jpg"}
                                    alt="Avatar"
                                    className="img-fluid "
                                    style={{ height: "100%" }}
                                />
                            </div>
                            <div className="card-body text-start col-10">
                                <h5 className="card-title">{user.username}</h5>
                                <p className="card-text">
                                    {user.email}
                                </p>
                                <p className="btn btn-primary mx-1" onClick={() => setIsopen(true)}>
                                    Edit
                                </p>
                                <p onClick={() => history("/")} className="btn btn-primary mx-1">
                                    Home
                                </p>
                            </div>
                        </div>
                            :
                            <div className="row">
                                <form className='row' onSubmit={updateProfile}>

                                    <div className="card-body pb-5 text-start row col-2">
                                       <div className="flex my-2 mx-1">
                                       <img
                                            src={user.profile_img ? `http://localhost:8000${user.profile_img}/` : "https://d2t5hgiouuhmes.cloudfront.net/GJIqTd_5v-OIP.jpg"}
                                            alt="Avatar"
                                            className="img-fluid "
                                            style={{ height: "100%", }}
                                        />
                                        <input className='mt-3 '
                                            type="file"
                                            name="profile_img"
                                            onChange={(e) => handleChange(e)}
                                        />
                                       </div>
                                    </div>
                                    <div className='col-10 text-start py-1'>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                User Name
                                            </label>
                                            <input
                                                type="text" value={user.username}
                                                className="form-control"
                                                id="exampleInputEmail1" name='username'
                                                aria-describedby="emailHelp" onChange={(e) => handleChange(e)}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Update
                                        </button>
                                    </div>
                                    
                                </form>
                                <p onClick={() => history("/")} className="btn btn-primary mx-1">
                                    Home
                                </p>
                            </div>}
                    </div>



                </div>


            </div>

            {/* {isopen &&

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Update user Profile</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={updateProfile}>
                                    <input
                                        type="file"
                                        name="profile_img"
                                        onChange={e => setProfileImage(e.target.files[0])}
                                    />

                                    <label htmlFor="profile-img" className="col-form-label">Profile image</label>
                                    <div style={{ height: '100px' }} className="mb-3 d-flex justify-content-left">
                                        <div style={{ width: '100px' }} className='h-100'>
                                            {
                                                profile_img ?
                                                    <img className='w-100' src={URL.createObjectURL(profile_img)} ></img>
                                                    :
                                                    <img className='w-100' src={user.profile_img ? user.profile_img : ""} ></img>
                                            }
                                        </div>
                                    </div>


                                    <div className='form-contain' >


                                        <input className='add-user-input' type="text" name='username' placeholder='username' defaultValue={user.username}
                                            onChange={e => setUsername(e.target.value)}
                                        />

                                        <input className='add-user-input' type="email" name='email' placeholder='email' defaultValue={user.email}
                                            onChange={e => setEmail(e.target.value)}
                                        />

                                        <input className='add-user-input' type="password" name='password' defaultValue={user.password} placeholder='password'
                                            onChange={e => setPassword(e.target.value)}
                                        />

                                        <input className='add-user-button' type="submit" value='Update' />

                                    </div>
                                </form>

                            </div>

                        </div>
                    </div>
                </div>

            } */}


        </div>
    )
}

export default Profile