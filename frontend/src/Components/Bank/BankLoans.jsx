import { Button, Table, TableCell,TableBody,TableHead,TableRow, Typography } from "@mui/material"
import "./Bank.css"
import { useEffect, useState } from "react";
import { getBankLoansAPI, getTotalFundsAPI, getUserLoansAPI } from "../APIs/loansAPI";
import { useNavigate } from "react-router-dom";
import { logout } from "../util";
export function BankLoans(){
    const navigate=useNavigate();
    const [loans,setLoans]=useState([]);
    const[currentPage,setCurrentPage]=useState(1);
    const[totalFunds,setTotalFunds]=useState(0);

    useEffect(()=>{
        async function getTotalFunds(){
            const response=await getTotalFundsAPI();
            setTotalFunds(response.data);
        }
        getTotalFunds();
    },[])

    useEffect(()=>{
        const token=localStorage.getItem("token");
        const getLoans=async()=>{
            const response=await getBankLoansAPI(token);
            setLoans(response.data);
        }
        getLoans();
    },[]);
    return(
        <div className="mainBankHome">
            <div className="BankHomeHeader">
                <a href="/bankRequests" className="normalA">Loan Requests</a>
                <a href="/bankFunds" className="normalA">Funds</a>
                <a className="selectedA">Loans</a>
                <label color="white">{"Total Funds Available: "+totalFunds}</label>
                <Button onClick={()=>logout()} variant="contained"  className="logoutbtn">Logout</Button>

            </div>
            <div className="bankHomeBody">

            <h2>Loans Page</h2>
            {loans.length===0 && <h2>No Loans</h2>}
            {loans.length>0 &&<div className="tableDivCustomer"> <table className="tableCustomer">
                
                    <tr>
                        <th>Loan Amount</th>
                        <th>Loan Interest Rate</th>
                        <th>Loan Date</th>
                        <th>Loan Duration</th>
                        
                    </tr>
                
                    {loans.slice((currentPage-1)*10,(currentPage-1)*10+10).map((request)=>(
                        <tr>
                            <td>{request.amount}</td>
                            <td>{request.interest_rate}</td>
                            <td>{request.date}</td>
                            <td>{request.duration}</td>
                            <td><Button onClick={()=>navigate("/installments",{state:request.id})}>View Installments</Button></td>
                        </tr>
                    ))}
            </table>
            <div className="pagingFooter">
            <Button onClick={()=>setCurrentPage(currentPage-1)} disabled={currentPage===1}>Previous</Button>
            <Typography variant="h6">Page: {currentPage} / {Math.ceil(loans.length/10)}</Typography>
            <Button onClick={()=>setCurrentPage(currentPage+1)} disabled={currentPage===Math.ceil(loans.length/10)}>Next</Button>
            </div>
             </div>}
            
            </div>


        </div>
    )
}