
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'
import './AdminHome.css'


function AdminPanel() {
    const [userList, setUserList] = useState([])
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const history = useNavigate()
    // const { user_id } = useParams();

    const [editUser, setEditUser] = useState({
        username:"",
        email:"",
        id:0
    })
    const [isopen, setIsopen] = useState(false)




    useEffect(() => {

        const getUserList = async () => {
            const response = await axios.get('http://localhost:8000/api/class-userlist/')
            setUserList(response.data)
            
        }
        getUserList();

    }, [])

   
    const userUpdateForm = async (e) => {
        e.preventDefault();
        const id = editUser.id;
        const response = await fetch(`http://localhost:8000/api/user-update/${id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: editUser.username,
                email: editUser.email,
            })
        });
        if (response.status === 400) {
            console.error('Failed to update user:', error);
            toast.error('Failed to update user');
        } else {
           
            const updatedUserList = userList.map(user => {
                if (user.id === id) {
                    return { ...user, username: editUser.username, email: editUser.email };
                }
                return user;
            });
            setUserList(updatedUserList);
            toast.success('User updated successfully');
            setIsopen(false);
        }
    };

    const handleDelete = (user_id) => {
        Swal.fire({
            title: 'Are you sure want to delete?',
            text: "You can't recover this..!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const user = axios.delete(`http://localhost:8000/api/user-delete/${user_id}/`).then(
                    async function getUserList() {
                        const request = await axios.get('http://localhost:8000/api/user-list/')
                        setUserList(request.data)
                    }
                )

            }
        })
    }

    async function searchUser(keyword) {

        const request = await axios.get(`http://localhost:8000/api/class-userlist/?search=${keyword}`)
        console.log("SS",request.data);
        if (request.data.length === 0) {

        }
        setUserList(request.data)
    }


    return (
        <div>
            <div class="admin-container">
                <div class="admin-sidebar">
                    <div class="sidebar-header">
                        <h3>Admin Panel</h3>
                    </div>
                    <ul class="sidebar-menu">
                        <li><Link to='/adduser'>Add User</Link></li>
                    </ul>
                </div>
                <div class="admin-content">
                    <div class="admin-table">
                        <Toaster position='top-center' reverseOrder='false' ></Toaster>
                        <div class="search-bar">
                            <input onChange={e => searchUser(e.target.value)} type="search" class="search-input" id="datatable-search-input" placeholder="Search..." />
                            <button className="search-button" type="submit">
                                search
                            </button>
                        </div>
                        <table class="table table-bordered my-4 " >
                            <caption></caption>
                            <thead>
                                {!isopen && <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th className='action-col'>Actions</th>
                                </tr>}
                            </thead>
                            <tbody>
                                {userList.map((user, index) => (
                                    <>
                                        {!isopen && <tr key={index}>
                                            <td>{user.id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td><button type="button" class="btn btn-warning" onClick={() => { setIsopen(true); setEditUser({
                                                username:user.username,email:user.email,id:user.id
                                            }) }}>
                                                edit
                                            </button>
                                            <button className='mx-4 btn btn-danger' onClick={() => handleDelete(user.id)}>
                                            delete
                                            </button>                                                
                                                </td>
                                        </tr>
                                        }
                                    </>
                                ))}
                            </tbody>

                        </table>

                    </div>
                    {isopen && <form onSubmit={(e)=>userUpdateForm(e)}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                UserName
                            </label>
                           
                            <input
                                value={editUser.username || ''}
                                type="text"
                                className="form-control"
                                onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                                id="exampleInputPassword1"
                            />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email address
                            </label>
                           
                            <input
                                type="email"
                                value={editUser.email || ''}
                                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            />
                        </div>                       
                        <button onClick={() => { setIsopen(false); setEditUser(null) }} className="btn btn-primary m-2">
                            Not now
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>}
                </div >
            </div >
        </div>
    )
}

export default AdminPanel