from rest_framework import serializers
from .models import *

class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = '__all__'

class LoanRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanRequest
        fields = '__all__'

class LoanInstallmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanInstallment
        fields = '__all__'

class LoanPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanPayment
        fields = '__all__'

class Customer_ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer_Provider
        fields = '__all__'

class FundsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funds
        fields = '__all__'

