import { Button } from "@mui/material"
import "./Customer.css"
import { logout } from "../util"
export function Customer(){


    return(
        <div className="mainCustomerHome">
            <div className="customerHomeHeader">
                <a href="/customerRequests" className="normalA">My Loan Requests</a>
                <a href="/customerLoans" className="normalA">My Loans</a>
                <a href="/customerPayments" className="normalA">My Payments</a>
                <Button onClick={()=>logout()} variant="contained"  className="logoutbtn">Logout</Button>

            </div>
            <div className="customerHomeBody">

            <h2>Customer Home Page</h2>
            </div>


        </div>
    )
}