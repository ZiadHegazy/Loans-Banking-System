import { Alert, Button, Table, Typography } from "@mui/material"
import "./Customer.css"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getLoanDetailsAPI, payInstallmentAPI } from "../APIs/loansAPI";
import { logout } from "../util";
export function CustomerLoanInstallments(){
    const location=useLocation();
    const loanId=location.state;
    const [loanDetails,setLoanDetails]=useState(null);
    const[currentPage,setCurrentPage]=useState(1);
    const[success,setSuccess]=useState(false);
    console.log(loanId);

    useEffect(()=>{
        const token=localStorage.getItem("token");
        const getLoanDetails=async()=>{
            const response=await getLoanDetailsAPI(loanId);
            console.log(response.data);
            setLoanDetails(response.data);
        }
        getLoanDetails();
    },[success]);
    const handlePayInstallment=async(id)=>{
        const response=await payInstallmentAPI(id);
        setSuccess(true);
        console.log(response.data);
    }
    useEffect(()=>{
        setTimeout(()=>{
            setSuccess(false);
        },4000);
    },[success]);
    return(
        <div className="mainCustomerHome">
            <div className="customerHomeHeader">
                <a href="/customerRequests" className="normalA">My Loan Requests</a>
                <a className="selectedA">My Loans</a>
                <a href="/customerPayments" className="normalA">My Payments</a>
                <Button onClick={()=>logout()} variant="contained"  className="logoutbtn">Logout</Button>

            </div>
            <div className="customerHomeBody">

            <h2>{"Installments Of Loan: "+loanId}</h2>
            {success && <Alert severity="success">Installment Paid Successfully</Alert>}
            {loanDetails!=null && loanDetails.installments!=null&& loanDetails.installments.length>0 &&<div className="tableDivCustomer"> <table className="tableCustomer">
                
                <tr>
                    <th>ID</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    
                </tr>
            
                {loanDetails.installments.slice((currentPage-1)*10,(currentPage-1)*10+10).map((request)=>(
                    <tr>
                        <td>{request.id}</td>
                        <td>{request.amount}</td>
                        <td>{request.date}</td>
                        <td>{request.status}</td>
                        {request.status==="pending" && <td><Button onClick={()=>handlePayInstallment(request.id)}>Pay</Button></td>}
                    </tr>
                ))}
        </table>
        <div className="pagingFooter">
        <Button onClick={()=>setCurrentPage(currentPage-1)} disabled={currentPage===1}>Previous</Button>
        <Typography variant="h6">Page: {currentPage} / {Math.ceil(loanDetails.installments.length/10)}</Typography>
        <Button onClick={()=>setCurrentPage(currentPage+1)} disabled={currentPage===Math.ceil(loanDetails.installments.length/10)}>Next</Button>
        </div>
         </div>}
            </div>


        </div>
    )
}