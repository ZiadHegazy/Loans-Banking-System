import { Button, Table, TableCell,TableBody,TableHead,TableRow, Alert,TextField, IconButton, Typography } from "@mui/material"
import "./Bank.css"
import { useEffect, useState } from "react";
import { approveLoanRequestAPI, createLoanRequestAPI, disapproveLoanRequestAPI, getBankLoanRequestsAPI, getLoanRequestsAPI } from "../APIs/loansAPI";
import { logout } from "../util";
export function BankRequest(){

    const [loanRequests,setLoanRequests]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [requestDiv,setRequestDiv]=useState(false);
    const [success,setSuccess]=useState(false);
    const [message,setMessage]=useState("");
    const [id,setId]=useState(0);
    const handleAcceptRequest=async(id)=>{
        setId(id);
        setRequestDiv(true);
    }
    
    const handleRejectRequest=async(id)=>{
        const response=await disapproveLoanRequestAPI(id);
        setSuccess(true);
        setMessage("Request Rejected Successfully");

    }
   

    useEffect(()=>{
        const token=localStorage.getItem("token");
        const getLoanRequests=async()=>{
            const response=await getBankLoanRequestsAPI(token);
            console.log(response.data);
            setLoanRequests(response.data);
        }
        getLoanRequests();
    },[success]);

    useEffect(()=>{
        setTimeout(()=>{
            setMessage("");
        },6000);
    },[message]);

    const RequestDiv=(props)=>{
        const [rate,setRate]=useState(0);
        const [duration,setDuration]=useState(0);
        const handleChangeRate=(e)=>{
            setRate(e.target.value);
        }
        const handleChangeDuration=(e)=>{
            setDuration(e.target.value);
        }
        const handleNewRequest=async()=>{
            const response=await approveLoanRequestAPI(props.id,rate,duration);
            console.log(response.data);
            setRequestDiv(false);
            setSuccess(true);
            setMessage("Request Approved Successfully");
        }

        return(
            <div className="requestDivBack">
                <div className="requestDivFront">
                    <IconButton onClick={()=>setRequestDiv(false)} sx={{position:"absolute",top:"0px",right:"0px",backgroundColor:"red"}} className="closeBtn">X</IconButton>
                    <h2>Accept Request</h2>
                    <TextField type="Number" onChange={handleChangeRate} value={rate} label="Interest Rate" variant="outlined" />
                    <TextField type="Number" onChange={handleChangeDuration} value={duration} label="Duration" variant="outlined" />
                    <Button variant="contained" onClick={handleNewRequest}>Approve</Button>
                </div>
            </div>
        )
    }

   
    
    
    return(
        <div className="mainBankHome">
            <div className="BankHomeHeader">
                <a className="selectedA">Loan Requests</a>
                <a href="/bankFunds" className="normalA">Funds</a>
                <a href="/bankLoans" className="normalA">Loans</a>
                <Button onClick={()=>logout()} variant="contained"  className="logoutbtn">Logout</Button>

            </div>
            <div className="bankHomeBody">

            <h2>Loan Requests Page</h2>
           
            {loanRequests.length===0 && <h3>No Loan Requests</h3>}
            {requestDiv && <RequestDiv id={id} />}
            {message !="" && <Alert severity="success">{message}</Alert>}
            {loanRequests.length>0 && <div className="tableDivCustomer">
                <table className="tableCustomer">
                    <tr>
                        <th>Customer ID</th>
                        <th>Request Amount</th>
                        <th>Request Status</th>
                        
                    </tr>
                    {loanRequests.slice((currentPage-1)*10,(currentPage-1)*10+10).map((request)=>(
                        <tr>
                            <td>{request.customer_id}</td>
                            <td>{request.amount}</td>
                            <td>{request.status}</td>
                            {request.status=="pending" && <td><Button onClick={()=>handleAcceptRequest(request.id)} sx={{color:"green"}}>Accept</Button></td>}
                            {request.status=="pending" && <td><Button onClick={()=>handleRejectRequest(request.id)} sx={{color:"red"}}>Reject</Button></td>}
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