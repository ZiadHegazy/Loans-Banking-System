import { Button, Table, TableCell,TableBody,TableHead,TableRow, Alert,TextField, IconButton, Typography } from "@mui/material"
import "./Provider.css"
import { logout } from "../util"
import { getMyFundsAPI, provideFundAPI } from "../APIs/loansAPI";
import { useEffect, useState } from "react";
export function ProviderFund(){
    const [funds,setFunds]=useState([]);
    const [requestDiv,setRequestDiv]=useState(false);
    const [currentPage,setCurrentPage]=useState(1);
    
    const [success,setSuccess]=useState(false);

    useEffect(()=>{
        const token=localStorage.getItem("token");
        const getLoanRequests=async()=>{
            const response=await getMyFundsAPI();
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

    const RequestDiv=()=>{
        const [amount,setAmount]=useState(0);
        const handleChangeAmount=(e)=>{
            setAmount(e.target.value);
        }
        const handleNewRequest=async()=>{
            const response=await provideFundAPI(amount);
            setRequestDiv(false);
            setSuccess(true);
        }

        return(
            <div className="requestDivBack">
                <div className="requestDivFront">
                    <IconButton onClick={()=>setRequestDiv(false)} sx={{position:"absolute",top:"0px",right:"0px",backgroundColor:"red"}} className="closeBtn">X</IconButton>
                    <h2>New Fund</h2>
                    <TextField type="Number" onChange={handleChangeAmount} value={amount} label="Request Amount" variant="outlined" />
                    <Button variant="contained" onClick={handleNewRequest}>Submit</Button>
                </div>
            </div>
        )
    }
    
    
    const handleNewRequestOpen=()=>{
        setRequestDiv(true);
    }


    return(
        <div className="mainProviderHome">
            <div className="ProviderHomeHeader">
                <a  className="selectedA">My Funds</a>
                <a href="/providerLoans" className="normalA">View Loans</a>
                <Button onClick={()=>logout()} variant="contained"  className="logoutbtn">Logout</Button>

            </div>
            <div className="providerHomeBody">

            <h2>Provider Fund Page</h2>
            <Button variant="contained" onClick={handleNewRequestOpen}>New Fund</Button>
            {requestDiv && <RequestDiv />}
            {success && <Alert severity="success">Fund Provided Successfully</Alert>}
            {funds.length===0 && <h3>No Funds</h3>}
            {funds.length>0 && <div className="tableDivCustomer">
                <table className="tableCustomer">
                    <tr>
                        <th>Fund Amount</th>
                        <th>Fund Date</th>
                        
                    </tr>
                    {funds.slice((currentPage-1)*10,(currentPage-1)*10+10).map((request)=>(
                        <tr>
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