import "./AdminHome.css";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
export function AdminHome() {
  const navigate=useNavigate();

  return (
    <div className="mainAdminHome">
        <div className="AdminHomeHeader">
        <h1>Welcome To Loan System</h1>
        </div>

        <div className="AdminActionsHome">

            
            <div className="AdminAction" onClick={()=>navigate("/login")}>
                <LoginIcon style={{ fontSize: "4rem" }} />
                <h2>Get Started</h2>
            </div>

        </div>
    </div>
  );
}