import { Alert, Button, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "../Login/Login.css";
import { useNavigate } from "react-router-dom";
import { registerAPI } from "../APIs/usersAPI";
export function Register(){
    const navigate=useNavigate();
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const [role,setRole]=useState("customer");
    const [error,setError]=useState("");

    const handleRoleChange=(e)=>{
        setRole(e.target.value);
    }
    const handleUsernameChange=(e)=>{
        setUsername(e.target.value);
    }
    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }
    const handleRegister=async()=>{
        const response=await registerAPI(username,password,role);
        if(response.message=="error"){
            setError(response.data);
        }else{
            alert("User registered successfully");
            navigate("/login");
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
            <h2> Add User Page</h2>
            <div className="LoginForm">
                {error!="" && <Alert severity="error">{error}</Alert>}
                <TextField label="username" variant="outlined" onChange={handleUsernameChange} />

                <TextField label="password" variant="outlined" type="password" onChange={handlePasswordChange}/>

                <RadioGroup onChange={handleRoleChange} row aria-label="position" name="role" defaultValue="customer">
                    <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                    <FormControlLabel value="bank" control={<Radio />} label="Bank" />
                    <FormControlLabel  value="provider" control={<Radio />} label="Provider" />
                </RadioGroup>

                <Button onClick={handleRegister}>Add User</Button>
                <Button onClick={()=>navigate("/login")}>Login</Button>
            </div>
        </div>
    );
}