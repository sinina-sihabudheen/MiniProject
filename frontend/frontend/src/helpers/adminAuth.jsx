import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast"

export default async function adminlogin(email, password) {
    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });   
  console.log("sss",response.status)
      if (response.status === 200) {
        const data = await response.json();
        console.log("AAAA",data)
        if(jwtDecode(data.access).is_admin){
          localStorage.setItem('adminToken', JSON.stringify(data));
          toast.success('Login successful!');
        }else {
          toast.error("You are not permitted to login into admin page..")
        }
       
        return data; 
      } else {
        const errorData = await response.json(); 
        throw new Error(errorData.error || "Invalid user credentials"); 
      }
    } catch (error) {
   
      toast.error(error.message || "Login failed. Please check your credentials."); 
    }
  }
  


export function getAdminlocal(){
    let response=localStorage.getItem('adminToken')
    return response
}