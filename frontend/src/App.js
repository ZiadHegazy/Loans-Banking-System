import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AdminHome } from './Components/AdminHome/AdminHome';
import { Login } from './Components/Login/Login';
import { Register } from './Components/Register/Register';
import {  Customer } from './Components/Customer/Customer';
import { CustomerLoanReq } from './Components/Customer/CustomerLoanReq';
import { CustomerLoans } from './Components/Customer/CustomerLoans';
import { CustomerPayments } from './Components/Customer/CustomerPayments';
import { ProviderHome } from './Components/Provider/ProviderHome';
import { ProviderLoans } from './Components/Provider/ProviderLoans';
import { ProviderFund } from './Components/Provider/ProviderFund';
import { BankHome } from './Components/Bank/BankHome';
import { BankFund } from './Components/Bank/BankFund';
import { BankRequest } from './Components/Bank/BankRequest';
import { BankLoans } from './Components/Bank/BankLoans';
import { CustomerLoanInstallments } from './Components/Customer/CustomerLoanInstallments';
function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminHome/>}></Route>
      <Route path="/addUser" element={<h1>Add User</h1>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/customerHome" element={<Customer/>}></Route>
      <Route path="/customerRequests" element={<CustomerLoanReq/>}></Route>
      <Route path="/customerLoans" element={<CustomerLoans/>}></Route>
      <Route path="/customerPayments" element={<CustomerPayments/>}></Route>
      <Route path="/customerInstallments" element={<CustomerLoanInstallments/>}></Route>
      <Route path="/providerHome" element={<ProviderHome/>}></Route>
      <Route path='/providerLoans' element={<ProviderLoans/>}></Route>
      <Route path='/provideFunds' element={<ProviderFund/>}></Route>
      <Route path="/bankHome" element={<BankHome/>}></Route>
      <Route path="/bankRequests" element={<BankRequest/>}></Route>
      <Route path="/bankLoans" element={<BankLoans/>}></Route>
      <Route path="/bankFunds" element={<BankFund/>}></Route>

    </Routes>
  );
}

export default App;
