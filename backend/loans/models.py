from django.db import models

class Loan(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, default='pending')
    duration = models.IntegerField() # in months
    customer_id = models.ForeignKey('users.User', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.amount} - {self.user.email}'
    
class LoanRequest(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=200, default='pending')
    customer_id = models.ForeignKey('users.User', on_delete=models.CASCADE)


class LoanInstallment(models.Model):
    loan_id = models.ForeignKey('Loan', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    status = models.CharField(max_length=20, default='pending')

class LoanPayment(models.Model):
    loan_id = models.ForeignKey('Loan', on_delete=models.CASCADE)
    loan_installment = models.ForeignKey('LoanInstallment', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, default='pending')
    customer_id = models.ForeignKey('users.User', on_delete=models.CASCADE)

class Customer_Provider(models.Model):
    customer_id = models.ForeignKey('users.User', on_delete=models.CASCADE,related_name='customer_id')
    provider_id = models.ForeignKey('users.User', on_delete=models.CASCADE,related_name='provider_id')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    loan_id = models.ForeignKey('Loan', on_delete=models.CASCADE)

class Funds(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    provider_id = models.ForeignKey('users.User', on_delete=models.CASCADE)
    date=models.DateField(auto_now_add=True)
