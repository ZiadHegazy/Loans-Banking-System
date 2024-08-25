from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import LoanRequest, Loan, LoanInstallment, LoanPayment,Funds,Customer_Provider
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializer import *
from users.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import AccessToken

import datetime
from decimal import Decimal



# -------------------------------- Common APIs -----------------------------

@api_view(['GET'])
def getLoanDetails(request,token,id):
    try:
        
        access_token = AccessToken(token)
        user = access_token.get('custom_payload')
        loan = Loan.objects.get(id=id)
        loan_installments = LoanInstallment.objects.filter(loan_id=id)
        loanSerializer=LoanSerializer(loan)
        loanInstallmentSerializer=LoanInstallmentSerializer(loan_installments,many=True)
        return Response({"message":"success",'data': {"loan":loanSerializer.data,"installments":loanInstallmentSerializer.data}})
    except Exception as e:
        print(e)
        return Response({'message':"error", "data":"invalid token"})
# ------------------------------- Customer APIs ----------------------------
@api_view(['GET'])
def getUserLoanRequests(request,token):
    try:
        access_token = AccessToken(token)
        user = access_token.get('custom_payload')
        if(user.get('role') != 'customer'):
            return Response({'message':"error", "data":"invalid role"})
        customer_id = user.get('id')
        customer=User.objects.get(id=customer_id)
        loan_requests = LoanRequest.objects.filter(customer_id=customer)
        loan_requestsSerializer=LoanRequestSerializer(loan_requests,many=True)
        return Response({"message":"success",'data': loan_requestsSerializer.data})
    except Exception as e:
        return Response({'message':"error", "data":"invalid token"})

@api_view(['GET'])
def getUserLoans(request,token):
    try:
        access_token = AccessToken(token)
        user = access_token.get('custom_payload')
        if(user.get('role') != 'customer'):
            return Response({'message':"error", "data":"invalid role"})
        customer_id = user.get('id')
        customer=User.objects.get(id=customer_id)
        loans = Loan.objects.filter(customer_id=customer)
        loansSerializer=LoanSerializer(loans,many=True)
        return Response({"message":"success",'data': loansSerializer.data})
    except Exception as e:
        return Response({'message':"error", "data":"invalid token"})

@api_view(['POST'])
def createLoanRequest(request):
    data = request.data
    token=request.data['token']
    try:
        access_token = AccessToken(token)
        user = access_token.get('custom_payload')
        if(user.get('role') != 'customer'):
            return Response({'message':"error", "data":"invalid role"})
        customer_id = user.get('id')
        customer=User.objects.get(id=customer_id)
        loan_request = LoanRequest.objects.create(amount=data['amount'], customer_id=customer)
        loan_requestSerializer=LoanRequestSerializer(loan_request)
        return Response({"message":"success",'data': loan_requestSerializer.data})
    except Exception as e:
        print(e)
        return Response({'message':"error", "data":"invalid token"})

@api_view(['POST'])
def payInstallment(request):
    data = request.data
    token=request.data['token']
    try:
        access_token = AccessToken(token)
        user = access_token.get('custom_payload')
        if(user.get('role') != 'customer'):
            return Response({'message':"error", "data":"invalid role"})
        customer_id = user.get('id')
        customer=User.objects.get(id=customer_id)
        installment_id=data['installment_id']
        loan_installment = LoanInstallment.objects.get(id=installment_id)
        loan_installment.status = 'paid'
        loan_installment.save()
        loan_payment = LoanPayment.objects.create(loan_id=loan_installment.loan_id, loan_installment=loan_installment, amount=loan_installment.amount, customer_id=customer,status='paid')
        loan_paymentSerializer=LoanPaymentSerializer(loan_payment)
        return Response({"message":"success",'data': loan_paymentSerializer.data})
    except Exception as e:
        print(e)
        return Response({'message':"error", "data":"invalid token"})
    
@api_view(['GET'])
def getUserPayments(request,token):
    try:
        access_token = AccessToken(token)
        user = access_token.get('custom_payload')
        if(user.get('role') != 'customer'):
            return Response({'message':"error", "data":"invalid role"})
        customer_id = user.get('id')
        customer=User.objects.get(id=customer_id)
        loan_payments = LoanPayment.objects.filter(customer_id=customer)
        loan_paymentsSerializer=LoanPaymentSerializer(loan_payments,many=True)
        return Response({"message":"success",'data': loan_paymentsSerializer.data})
    except Exception as e:
        return Response({'message':"error", "data":"invalid token"})
# ------------------------------- Bank APIs ----------------------------

@api_view(['GET'])
def getFunds(request,token):
    try:
        access_token = AccessToken(token)
        user = access_token.get('custom_payload')
        if(user.get('role') != 'bank'):
            return Response({'message':"error", "data":"invalid role"})
        funds = Funds.objects.all()
        fundsSerializer=FundsSerializer(funds,many=True)
        return Response({"message":"success",'data': fundsSerializer.data})
    except Exception as e:
        return Response({'message':"error", "data":"invalid token"})

@api_view(['GET'])
def getBankLoanRequests(request,token):
    try:
        access_token = AccessToken(token)
        user = access_token.get('custom_payload')
        if(user.get('role') != 'bank'):
            return Response({'message':"error", "data":"invalid role"})
        loan_requests = LoanRequest.objects.all()
        loan_requestsSerializer=LoanRequestSerializer(loan_requests,many=True)
        return Response({"message":"success",'data': loan_requestsSerializer.data})
    except Exception as e:
        return Response({'message':"error", "data":"invalid token"})

@api_view(['GET'])
def getBankLoans(request,token):
    try:
        access_token = AccessToken(token)
        user = access_token.get('custom_payload')
        if(user.get('role') != 'bank'):
            return Response({'message':"error", "data":"invalid role"})
        loans = Loan.objects.all()
        loansSerializer=LoanSerializer(loans,many=True)
        return Response({"message":"success",'data': loansSerializer.data})
    except Exception as e:
        return Response({'message':"error", "data":"invalid token"})

@api_view(['POST'])
def approveLoanRequest(request):
    data = request.data
    token=request.data['token']
    try:
        access_token = AccessToken(token)
        user = access_token.get('custom_payload')
        if(user.get('role') != 'bank'):
            return Response({'message':"error", "data":"invalid role"})
        loan_request_id=data['loan_request_id']
        loan_request = LoanRequest.objects.get(id=loan_request_id)
        totalFunds = 0
        funds= Funds.objects.all()
        for fund in funds:
            totalFunds += fund.amount
        if totalFunds < loan_request.amount:
            return Response({"message":"error",'data': "insufficient funds"})
        providerAmount=[]
        tempAmount = loan_request.amount
        for fund in funds:
            if tempAmount >= fund.amount:
                providerAmount.append({'provider_id':fund.provider_id,'amount':fund.amount})
                tempAmount-=fund.amount
                fund.amount =0
                fund.save()
            elif tempAmount < fund.amount:
                providerAmount.append({'provider_id':fund.provider_id,'amount':tempAmount})
                fund.amount -= tempAmount
                fund.save()
                break
        
        loan = Loan.objects.create(amount=loan_request.amount, interest_rate=Decimal(data['interest_rate']), duration=int(data['duration']), customer_id=loan_request.customer_id)
        loan_request.status = 'approved'
        loan_request.save()
        
        for provider in providerAmount:
            Customer_Provider.objects.create(customer_id=loan_request.customer_id, provider_id=provider['provider_id'], amount=provider['amount'], loan_id=loan)
        startMonth = datetime.date.today().month+1
        
        totalInterest=loan.amount*(loan.interest_rate/100)*loan.duration/12
        installmentAmount=(loan.amount+totalInterest)/loan.duration

        for i in range(loan.duration):
            newDate=datetime.date.today()
            if(startMonth+i>12):
                newDate=newDate.replace(year=newDate.year+1,month=startMonth+i-12)
            else:
                newDate=newDate.replace(month=startMonth+i)

            LoanInstallment.objects.create(loan_id=loan, amount=installmentAmount, date=newDate, status='pending')
        loanSerializer=LoanSerializer(loan)
        return Response({"message":"success",'data': loanSerializer.data})
    except Exception as e:
        print(e)
        return Response({'message':"error", "data":"invalid token"})

@api_view(['POST'])
def disapproveLoanRequest(request):
    data = request.data
    token=request.data['token']
    try:
        access_token = AccessToken(token)
        user = access_token.get('custom_payload')
        if(user.get('role') != 'bank'):
            return Response({'message':"error", "data":"invalid role"})
        loan_request_id=data['loan_request_id']
        loan_request = LoanRequest.objects.get(id=loan_request_id)

        totalFunds = 0
        funds= Funds.objects.all()
        for fund in funds:
            totalFunds += fund.amount
        if totalFunds < loan_request.amount:
            loan_request.status = 'disapproved because of insufficient funds'
            loan_request.save()
        else:
            loan_request.status = 'disapproved'
            loan_request.save()
        loan_requestSerializer=LoanRequestSerializer(loan_request)
        return Response({"message":"success",'data': loan_requestSerializer.data})
    except Exception as e:
        return Response({'message':"error", "data":"invalid token"})


#------------------------------------Provider APIs----------------

@api_view(['POST'])
def provideFund(request):
    data=request.data
    token=data['token']
    try:
        access_token = AccessToken(token)
        user = access_token.get('custom_payload')
        if(user.get('role') != 'provider'):
            return Response({'message':"error", "data":"invalid role"})
        provider_id = user.get('id')
        provider=User.objects.get(id=provider_id)
        fund = Funds.objects.create(amount=data['amount'], provider_id=provider)
        fundSerializer=FundsSerializer(fund)
        return Response({"message":"success",'data': fundSerializer.data})
    except Exception as e:
        return Response({'message':"error", "data":"invalid token"})
    
@api_view(['GET'])
def getMyLoans(request,token):
    data=request.data
    
    try:
        # jwt_auth = JWTAuthentication()
        # validated_token = jwt_auth.get_validated_token(token)
        # user = jwt_auth.get_user(validated_token)
        access_token = AccessToken(token)
        user = access_token.get('custom_payload')
        
        if(user.get("role") != 'provider'):
            return Response({'message':"error", "data":"invalid role"})
        provider_id = user.get("id")
        provider=User.objects.get(id=provider_id)
        customer_provider = Customer_Provider.objects.filter(provider_id=provider)
        customer_providerSerializer=Customer_ProviderSerializer(customer_provider,many=True)
        return Response({"message":"success",'data': customer_providerSerializer.data})
    except Exception as e:
        return Response({'message':"error", "data":"invalid token"})
    
@api_view(['GET'])
def getMyFunds(request,token):
    data=request.data
    try:
        access_token = AccessToken(token)
        user = access_token.get('custom_payload')
        if(user.get("role") != 'provider'):
            return Response({'message':"error", "data":"invalid role"})
        provider_id = user.get("id")
        provider=User.objects.get(id=provider_id)
        funds = Funds.objects.filter(provider_id=provider)
        fundsSerializer=FundsSerializer(funds,many=True)
        return Response({"message":"success",'data': fundsSerializer.data})
    except Exception as e:
        return Response({'message':"error", "data":"invalid token"})


