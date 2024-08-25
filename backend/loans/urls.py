from django.urls import path
from .views import *
loansUrl=[
    path('loans/getLoanDetails/<str:token>/<str:id>', getLoanDetails),
    path('loans/getUserLoanRequests/<str:token>', getUserLoanRequests),
    path('loans/getUserLoans/<str:token>', getUserLoans),
    path('loans/getUserPayments/<str:token>', getUserPayments),
    path('loans/userCreateLoan', createLoanRequest),
    path('loans/userPayInstallment', payInstallment),
    path('loans/bankGetFunds/<str:token>', getFunds),
    path('loans/bankGetLoanRequests/<str:token>', getBankLoanRequests),
    path('loans/bankGetLoans/<str:token>', getBankLoans),
    path('loans/bankApproveLoan', approveLoanRequest),
    path('loans/bankRejectLoan', disapproveLoanRequest),
    path('loans/provideFund', provideFund),
    path('loans/providerLoans/<str:token>', getMyLoans),
    path('loans/providerFunds/<str:token>', getMyFunds),

]