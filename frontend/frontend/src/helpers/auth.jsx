// import { jwtDecode } from "jwt-decode";
// import toast from "react-hot-toast"

// export default async function login(email, password) {
//     try {
//       const response = await fetch('http://localhost:8000/api/token/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//       });   
//       if (response.status === 200 ) {
//         const data = await response.json();
//         console.log("WWW",data)
//         localStorage.setItem('userToken', JSON.stringify(data));
//         toast.success('Login successful!');
//         return data; 
//       } else {
//         const errorData = await response.json(); 
//         throw new Error(errorData.error || "Invalid user credentials"); 
//       }
//     } catch (error) {
   
//       toast.error(error.message || "Login failed. Please check your credentials."); 
//     }
//   } 


// export function getlocal(){
//     let response=localStorage.getItem('userToken')
//     return response
// }



import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export default async function login(email, password) {
  try {
    const response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log("WWW", data);

      // Check if the user is an admin
      if (!jwtDecode(data.access).is_admin) {
        localStorage.setItem('userToken', JSON.stringify(data));
        toast.success('Login successful!');
      } else {
        toast.error('Only users can log in.');
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

export function getlocal(){
  let response = localStorage.getItem('userToken');
  return response;
}
