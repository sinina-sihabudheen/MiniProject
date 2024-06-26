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
        console.log("ssssss", e.target.username.value);
        const formData = new FormData();
        formData.append('username', user.username);
        formData.append('email', user.email);
        formData.append('is_active', true);


        if (user.profile_img !== null) {
            formData.append('profile_img', user.profile_img);
            const response = await fetch(`http://localhost:8000/api/user-update/${user_id}/`, {
                method: 'PUT',
                body: formData
            });
            toast.success('User Image updated successfully');
            setIsopen(false)
            history('/profile');
            // setIsopen(false)
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
        } else {
            const response = await fetch(`http://localhost:8000/api/user-update/${user_id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            toast.success('User updated successfully');
            history('/profile');
            setIsopen(false)
        }

        try {           


        } catch (error) {
            console.error('Failed to update user: ', error);
            toast.error('Failed to update user');
        }
    };

    return (
        <div>
            <div className="container ">
                <Toaster position='top-center' reverseOrder='false' ></Toaster>
              

            <div className="flex justify-center items-center h-screen">
              <div className="max-w-xl w-full bg-blue-300">
                <div className="bg-blue-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="text-center text-xl font-bold mb-4 bg-blue-100">My Profile</div> 

                  {!isopen ? (
                    <div className="flex items-start ">
                      <div className="w-1/4">
                        <img
                          src={user.profile_img ? `http://localhost:8000${user.profile_img}/` : "https://d2t5hgiouuhmes.cloudfront.net/GJIqTd_5v-OIP.jpg"}
                          alt="Avatar"
                          className="w-full rounded-lg"
                          style={{ height: "100%" }}
                        />
                      </div>
                      <div className="w-3/4 ml-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
                        <h5 className="font-bold">{user.username}</h5><br />
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                        <p>{user.email}</p>
                        
                        <div className="flex mt-4">
                          <button onClick={() => setIsopen(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                            Edit
                          </button>
                          <button onClick={() => history("/")} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                            Home
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Edit Form
                    <form onSubmit={updateProfile}>
                      <div className="flex items-start">
                        <div className="w-1/4">
                          <img
                            src={user.profile_img ? `http://localhost:8000${user.profile_img}/` : "https://d2t5hgiouuhmes.cloudfront.net/GJIqTd_5v-OIP.jpg"}
                            alt="Avatar"
                            className="w-full rounded-lg"
                            style={{ height: "100%" }}
                          />
                          <input
                            className="mt-3"
                            type="file"
                            name="profile_img"
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className="w-3/4 ml-4">
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">User Name</label>
                            <input
                              type="text"
                              value={user.username}
                              onChange={(e) => setUser({ ...user, username: e.target.value })} 
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="username"
                            />
                          </div>
                          <div className="flex mt-4">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                              Update
                            </button>
                            <button onClick={() => history("/")} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                              Home
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Profile