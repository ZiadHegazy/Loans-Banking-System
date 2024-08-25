import { Button, Table, TableCell,TableBody,TableHead,TableRow, Alert,TextField, IconButton, Typography } from "@mui/material"
import "./Customer.css"
import { useEffect, useState } from "react";
import { createLoanRequestAPI, getLoanRequestsAPI } from "../APIs/loansAPI";
import { logout } from "../util";
export function CustomerLoanReq(){

    const [loanRequests,setLoanRequests]=useState([]);
    const [requestDiv,setRequestDiv]=useState(false);
    const [currentPage,setCurrentPage]=useState(1);
    
    const [success,setSuccess]=useState(false);

    useEffect(()=>{
        const token=localStorage.getItem("token");
        const getLoanRequests=async()=>{
            const response=await getLoanRequestsAPI(token);
            console.log(response.data);
            setLoanRequests(response.data);
        }
        getLoanRequests();
    },[success]);

    useEffect(()=>{
        setTimeout(()=>{
            setSuccess(false);
        },3000);
    },[success]);

    const RequestDiv=()=>{
        const [amount,setAmount]=useState(0);
        const handleChangeAmount=(e)=>{
            setAmount(e.target.value);
        }
        const handleNewRequest=async()=>{
            const response=await createLoanRequestAPI(amount);
            setRequestDiv(false);
            setSuccess(true);
        }

        return(
            <div className="requestDivBack">
                <div className="requestDivFront">
                    <IconButton onClick={()=>setRequestDiv(false)} sx={{position:"absolute",top:"0px",right:"0px",backgroundColor:"red"}} className="closeBtn">X</IconButton>
                    <h2>New Request</h2>
                    <TextField type="Number" onChange={handleChangeAmount} value={amount} label="Request Amount" variant="outlined" />
                    <Button variant="contained" onClick={handleNewRequest}>Request</Button>
                </div>
            </div>
        )
    }
    
    
    const handleNewRequestOpen=()=>{
        setRequestDiv(true);
    }
    return(
        <div className="mainCustomerHome">
            <div className="customerHomeHeader">
                <a className="selectedA">My Loan Requests</a>
                <a href="/customerLoans" className="normalA">My Loans</a>
                <a href="/customerPayments" className="normalA">My Payments</a>
                <Button onClick={()=>logout()} variant="contained"  className="logoutbtn">Logout</Button>

            </div>
            <div className="customerHomeBody">

            <h2>Loan Requests Page</h2>
            <Button variant="contained" onClick={handleNewRequestOpen}>New Request</Button>
            {requestDiv && <RequestDiv />}
            {success && <Alert severity="success">Request Created Successfully</Alert>}
            {loanRequests.length===0 && <h3>No Loan Requests</h3>}
            {loanRequests.length>0 && <div className="tableDivCustomer">
                <table className="tableCustomer">
                    <tr>
                        <th>Request Amount</th>
                        <th>Request Status</th>
                        
                    </tr>
                    {loanRequests.slice((currentPage-1)*10,(currentPage-1)*10+10).map((request)=>(
                        <tr>
                            <td>{request.amount}</td>
                            <td>{request.status}</td>
                        </tr>
                    ))}
            </table>
            <div className="pagingFooter">
            <Button onClick={()=>setCurrentPage(currentPage-1)} disabled={currentPage===1}>Previous</Button>
            <Typography variant="h6">Page: {currentPage} / {Math.ceil(loanRequests.length/10)}</Typography>
            <Button onClick={()=>setCurrentPage(currentPage+1)} disabled={currentPage===Math.ceil(loanRequests.length/10)}>Next</Button>
            </div>
                </div>}
            
            </div>


        </div>
    )
}