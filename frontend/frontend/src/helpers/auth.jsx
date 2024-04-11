import toast from "react-hot-toast"

export default async function login(e){
    

    let response= await fetch('http://localhost:8000/api/token/',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({email : e.target.email.value,password : e.target.password.value}) 
    })

    if(response.status== 200){
        const data= await response.json()
        localStorage.setItem('userToken',JSON.stringify(data))
        toast.success('Login successful')
        return data
    }
    else{
        toast.error('Invalid user credentials!')
        throw new Error("Invalid user credential")
    }
}



export function getlocal(){
    let response=localStorage.getItem('userToken')
    return response
}