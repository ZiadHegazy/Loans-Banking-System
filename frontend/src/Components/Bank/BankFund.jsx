import { Button, Table, TableCell,TableBody,TableHead,TableRow, Alert,TextField, IconButton, Typography } from "@mui/material"
import "./Bank.css"
import { logout } from "../util"
import { getFundsAPI, getTotalFundsAPI } from "../APIs/loansAPI";
import { useEffect, useState } from "react";
export function BankFund(){
    const [funds,setFunds]=useState([]);
    const [requestDiv,setRequestDiv]=useState(false);
    const [currentPage,setCurrentPage]=useState(1);
    
    const [success,setSuccess]=useState(false);

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
        const getLoanRequests=async()=>{
            const response=await getFundsAPI();
            console.log(response.data);
            setFunds(response.data);
        }
        getLoanRequests();
    },[success]);

    useEffect(()=>{
        setTimeout(()=>{
            setSuccess(false);
        },3000);
    },[success]);

    
    
    
    


    return(
        <div className="mainBankHome">
            <div className="BankHomeHeader">
                <a href="/bankRequests" className="normalA">Loan Requests</a>
                <a  className="selectedA">Funds</a>
                <a href="/bankLoans" className="normalA">Loans</a>
                <label color="white">{"Total Funds Available: "+totalFunds}</label>
                <Button onClick={()=>logout()} variant="contained"  className="logoutbtn">Logout</Button>

            </div>
            <div className="bankHomeBody">

            <h2>Bank Fund Page</h2>
            
          
            {funds.length===0 && <h3>No Funds</h3>}
            {funds.length>0 && <div className="tableDivCustomer">
                <table className="tableCustomer">
                    <tr>
                        <th>Provider ID</th>
                        <th>Fund Amount</th>
                        <th>Fund Date</th>
                        
                    </tr>
                    {funds.slice((currentPage-1)*10,(currentPage-1)*10+10).map((request)=>(
                        <tr>
                            <td>{request.provider_id}</td>
                            <td>{request.amount}</td>
                            <td>{request.date}</td>
                        </tr>
                    ))}
            </table>
            <div className="pagingFooter">
            <Button onClick={()=>setCurrentPage(currentPage-1)} disabled={currentPage===1}>Previous</Button>
            <Typography variant="h6">Page: {currentPage} / {Math.ceil(funds.length/10)}</Typography>
            <Button onClick={()=>setCurrentPage(currentPage+1)} disabled={currentPage===Math.ceil(funds.length/10)}>Next</Button>
            </div>
                </div>}

            </div>


        </div>
    )
}