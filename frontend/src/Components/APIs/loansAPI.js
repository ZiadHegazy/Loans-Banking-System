const api=process.env.API?process.env.API:'http://localhost:8000';


//-------------------------Customer API-------------------------//

export const getLoanRequestsAPI=async()=>{

    const response=await fetch(`${api}/loans/getUserLoanRequests/${localStorage.getItem("token")}`);
    return await response.json();
}

export const getUserLoansAPI=async()=>{
    const response=await fetch(`${api}/loans/getUserLoans/${localStorage.getItem("token")}`);
    return await response.json();
}

export const getLoanDetailsAPI=async(loanId)=>{
    const response=await fetch(`${api}/loans/getLoanDetails/${localStorage.getItem("token")}/${loanId}`);
    return await response.json();
}

export const createLoanRequestAPI=async(loanAmount)=>{
    const response=await fetch(`${api}/loans/userCreateLoan`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            amount:loanAmount,
            token:localStorage.getItem("token")
        })
    });
    return await response.json();
}
export const payInstallmentAPI=async(installmentId)=>{
    const response=await fetch(`${api}/loans/userPayInstallment`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            installment_id:installmentId,
            token:localStorage.getItem("token")
        })
    });
    return await response.json();
}
export const getUserPaymentsAPI=async()=>{
    const response=await fetch(`${api}/loans/getUserPayments/${localStorage.getItem("token")}`);
    return await response.json();
}


//-------------------------Bank API-------------------------//

// path('loans/bankGetFunds/<str:token>', getFunds),
// path('loans/bankGetLoanRequests/<str:token>', getBankLoanRequests),
// path('loans/bankGetLoans/<str:token>', getBankLoans),
// path('loans/bankApproveLoan', approveLoanRequest),
// path('loans/bankRejectLoan', disapproveLoanRequest),

export const getFundsAPI=async()=>{
    const response=await fetch(`${api}/loans/bankGetFunds/${localStorage.getItem("token")}`);
    return await response.json();
}
export const getBankLoanRequestsAPI=async()=>{
    const response=await fetch(`${api}/loans/bankGetLoanRequests/${localStorage.getItem("token")}`);
    return await response.json();
}
export const getBankLoansAPI=async()=>{
    const response=await fetch(`${api}/loans/bankGetLoans/${localStorage.getItem("token")}`);
    return await response.json();
}
export const approveLoanRequestAPI=async(loanRequestId,interestRate,duration)=>{
    const response=await fetch(`${api}/loans/bankApproveLoan`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            loan_request_id:loanRequestId,
            token:localStorage.getItem("token"),
            interest_rate:interestRate,
            duration:duration
        })
    });
    return await response.json();
}
export const disapproveLoanRequestAPI=async(loanRequestId)=>{
    const response=await fetch(`${api}/loans/bankRejectLoan`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            loan_request_id:loanRequestId,
            token:localStorage.getItem("token")
        })
    });
    return await response.json();
}

//-------------------------Provider API-------------------------//

// path('loans/provideFund', provideFund),
// path('loans/providerLoans/<str:token>', getMyLoans),

export const provideFundAPI=async(amount)=>{
    const response=await fetch(`${api}/loans/provideFund`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            amount:amount,
            token:localStorage.getItem("token")
        })
    });
    return await response.json();
}
export const getProviderLoansAPI=async()=>{
    const response=await fetch(`${api}/loans/providerLoans/${localStorage.getItem("token")}`);
    return await response.json();
}

export const getMyFundsAPI=async()=>{
    const response=await fetch(`${api}/loans/providerFunds/${localStorage.getItem("token")}`);
    return await response.json();
}
