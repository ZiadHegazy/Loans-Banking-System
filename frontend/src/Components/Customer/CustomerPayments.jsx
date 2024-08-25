import { Button, Table, TableCell,TableBody,TableHead,TableRow, Typography } from "@mui/material"
import "./Customer.css"
import { useEffect, useState } from "react";
import { getUserPaymentsAPI } from "../APIs/loansAPI";
import { logout } from "../util";
export function CustomerPayments(){

    const [payments,setPayments]=useState([]);
    const[currentPage,setCurrentPage]=useState(1);

    useEffect(()=>{
        const token=localStorage.getItem("token");
        const getPayments=async()=>{
            const response=await getUserPaymentsAPI();
            setPayments(response.data);
        }
        getPayments();
    },[]);
    return(
        <div className="mainCustomerHome">
            <div className="customerHomeHeader">
                <a href="/customerRequests" className="normalA">My Loan Requests</a>
                <a href="/customerLoans" className="normalA">My Loans</a>
                <a className="selectedA">My Payments</a>
                <Button onClick={()=>logout()} variant="contained"  className="logoutbtn">Logout</Button>

            </div>
            <div className="customerHomeBody">
         

            <h2>Payments Page</h2>
            {payments.length===0 && <h2>No Payments</h2>}
            {payments.length>0 &&
                <div className="tableDivCustomer">
                    <table className="tableCustomer">
                    <tr>
                        <th>Loan ID</th>
                        <th>Installment ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        
                    </tr>
                    {payments.slice((currentPage-1)*10,(currentPage-1)*10+10).map((request)=>(
                        <tr>
                            <td>{request.loan_id}</td>
                            <td>{request.loan_installment}</td>
                            <td>{request.amount}</td>
                            <td>{request.date}</td>
                            <td>{request.status}</td>
                        </tr>
                    ))}
            </table>
            <div className="pagingFooter">
            <Button onClick={()=>setCurrentPage(currentPage-1)} disabled={currentPage===1}>Previous</Button>
            <Typography variant="h6">Page: {currentPage} / {Math.ceil(payments.length/10)}</Typography>
            <Button onClick={()=>setCurrentPage(currentPage+1)} disabled={currentPage===Math.ceil(payments.length/10)}>Next</Button>
            </div>
                </div>
            }
            </div>


        </div>
    )
}