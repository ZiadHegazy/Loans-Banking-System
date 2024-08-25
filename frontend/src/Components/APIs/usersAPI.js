const api=process.env.API?process.env.API:'http://localhost:8000';

export const loginAPI=async(username,password)=>{

    const response=await fetch(`${api}/users/login`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({username,password})
    });
    return await response.json();
}
export const registerAPI=async(username,password,role)=>{
    const response=await fetch(`${api}/users/register`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({username,password,role})
    });
    return await response.json();
}