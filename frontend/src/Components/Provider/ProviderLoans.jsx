import { Button, Table, Typography } from "@mui/material"
import "./Provider.css"
import { useEffect, useState } from "react";
import { getProviderLoansAPI, getUserLoansAPI } from "../APIs/loansAPI";
import { useNavigate } from "react-router-dom";
import { logout } from "../util";
export function ProviderLoans(){
    const navigate=useNavigate();
    const [loans,setLoans]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);

    useEffect(()=>{
        const token=localStorage.getItem("token");
        const getLoans=async()=>{
            const response=await getProviderLoansAPI(token);
            setLoans(response.data);
        }
        getLoans();
    },[]);
    return(
        <div className="mainProviderHome">
            <div className="ProviderHomeHeader">
                <a href="/provideFunds" className="normalA">My Funds</a>
                <a className="selectedA">View Loans</a>
                <Button onClick={()=>logout()} variant="contained"  className="logoutbtn">Logout</Button>

            </div>
            <div className="providerHomeBody">

            <h2>Provider Loans Page</h2>
            {loans.length===0 && <h3>No Loans</h3>}
            {loans.length>0 && <div className="tableDivCustomer">
                <table className="tableCustomer">
                    <tr>
                        <th>Customer ID</th>
                        <th>Amount</th>
                        <th>Loan ID</th>
                    </tr>
                        
                    {loans.map((request)=>(
                        <tr>
                            <td>{request.customer_id}</td>
                            <td>{request.amount}</td>
                            <td>{request.loan_id}</td>
                            <td><Button onClick={()=>navigate("/installments",{state:request.loan_id})}>View Installments</Button></td>
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