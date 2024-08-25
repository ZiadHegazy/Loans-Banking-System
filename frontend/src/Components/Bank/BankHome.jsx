import { Button } from "@mui/material"
import "./Bank.css"
import { logout } from "../util"
import { useEffect, useState } from "react";
import { getTotalFundsAPI } from "../APIs/loansAPI";
export function BankHome(){
    const[totalFunds,setTotalFunds]=useState(0);

    useEffect(()=>{
        async function getTotalFunds(){
            const response=await getTotalFundsAPI();
            setTotalFunds(response.data);
        }
        getTotalFunds();
    },[])


    return(
        <div className="mainBankHome">
            <div className="BankHomeHeader">
                <a href="/bankRequests" className="normalA">Loan Requests</a>
                <a href="/bankFunds" className="normalA">Funds</a>
                <a href="/bankLoans" className="normalA">Loans</a>
                <label color="white">{"Total Funds Available: "+totalFunds}</label>
                <Button onClick={()=>logout()} variant="contained"  className="logoutbtn">Logout</Button>

            </div>
            <div className="bankHomeBody">

            <h2>Bank Home Page</h2>
            </div>


        </div>
    )
}