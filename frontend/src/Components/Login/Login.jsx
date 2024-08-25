import { Alert, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../APIs/usersAPI";
export function Login(){
    const navigate=useNavigate();
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const [error,setError]=useState("");
    const handleUsernameChange=(e)=>{
        setUsername(e.target.value);
    }
    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }
    const handleLogin=async()=>{
        const response=await loginAPI(username,password);
        if(response.message=="error"){
            setError(response.data);
        }else{
            console.log(response.data)
            localStorage.setItem("token",response.data.access_token);
            localStorage.setItem("refreshToken",response.data.refresh_token);
            switch(response.data.role){
                case "bank":
                    navigate("/bankHome");
                    break;
                case "customer":
                    navigate("/customerHome");
                    break;
                case "provider":
                    navigate("/providerHome");
                    break;
            }
        }
    }
    useEffect(()=>{
        setTimeout(()=>{
            setError("");
        },3000);
    },[error]);
    return (
        <div className="mainLogin">
            <div className="AdminHomeHeader">
            <h1>Welcome To Loan System</h1>
            </div>
            <h2> Login Page</h2>
            <div className="LoginForm">
                {error!="" && <Alert severity="error">{error}</Alert>}
                <TextField label="username" variant="outlined" onChange={handleUsernameChange} />

                <TextField label="password" variant="outlined" type="password" onChange={handlePasswordChange}/>

                <Button onClick={handleLogin}>Login</Button>
                <Button onClick={()=>navigate("/register")}>Register</Button>
            </div>
        </div>
    );
}