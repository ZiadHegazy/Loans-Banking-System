import { Button } from "@mui/material"
import "./Bank.css"
import { logout } from "../util"
export function BankHome(){


    return(
        <div className="mainBankHome">
            <div className="BankHomeHeader">
                <a href="/bankRequests" className="normalA">Loan Requests</a>
                <a href="/bankFunds" className="normalA">Funds</a>
                <a href="/bankLoans" className="normalA">Loans</a>
                <Button onClick={()=>logout()} variant="contained"  className="logoutbtn">Logout</Button>

            </div>
            <div className="bankHomeBody">

            <h2>Bank Home Page</h2>
            </div>


        </div>
    )
}