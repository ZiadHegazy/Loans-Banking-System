import { Button } from "@mui/material"
import "./Provider.css"
import { logout } from "../util"
export function ProviderHome(){


    return(
        <div className="mainProviderHome">
            <div className="ProviderHomeHeader">
                <a href="/provideFunds" className="normalA">My Funds</a>
                <a href="/providerLoans" className="normalA">View Loans</a>
                <Button onClick={()=>logout()} variant="contained"  className="logoutbtn">Logout</Button>

            </div>
            <div className="providerHomeBody">

            <h2>Provider Home Page</h2>
            </div>


        </div>
    )
}