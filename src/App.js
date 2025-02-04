import React, { Component } from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Adverts from "./pages/adverts";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Sales from "./pages/sales";
import BatchList from "./pages/batch";
import BundleList from "./pages/bundles";
import NetworkMan from "./pages/networks";
import RechargeManagement from "./pages/recharge";
import BusReports from "./pages/busReports";
import Signup from "./pages/authentication/Signup";
import { useDispatch, useSelector } from "react-redux";
import BatchVoucherList from "./pages/batchVouchers";
import UserLogin from "./pages/authentication/login";
import SalesAgent from "./pages/dashboard/salesAgent";
import VoucherVerificationPage from "./pages/sales/voucherVerification";
import SPBusinessPartners from "./pages/shopManager/businessPartners/SPBusinessPartners";
import SPSalesReports from "./pages/shopManager/salesReports/SPSalesReports";
import BusEntities from "./pages/busEntities";
import SPVoucherManagement from "./pages/shopManager/vouchers/SPVoucherManagement";
import HORSalesReport from "./pages/headManager/HORSalesReport";
import ABMSalesReport from "./pages/areaBusManager/ABMSalesReport";
import RegionalSalesReport from "./pages/regionalManager/RegionalSalesReport";
import Customers from "./pages/customers";
import Commission from "./pages/commission";
import FinanceReports from "./pages/finReports";
import VoucherUsageReport from "./pages/voucherUsageReport";

const userRole = localStorage.getItem('role')

function App() {
    
    const cartItems = useSelector((state)=> state.cart.itemsList)
    console.log(cartItems)
    
    return (
      <BrowserRouter>
      <div>
       {/* <headerMenu /> */}
        <Routes>
          <Route path={"/"} element={<UserLogin/>} />
          <Route path={"/batch"} element={<BatchList/>} />
          <Route path={"/batch/:id"} element={<BatchVoucherList/>} />
          <Route path={"/recharge"} element={<RechargeManagement/>} />
          <Route path={"/packages"} element={<BundleList/>} />
          <Route path={"/profile"} element={<Profile/>} />
          <Route path={"/dashboard"} element={<Dashboard/>} />
          <Route path={"/adverts"} element={<Adverts/>} />
          <Route path={"/sales"} element={<Sales page='sales'/>} />
          <Route path={"/foc-sales"} element={<Sales page='foc-sales'/>} />
          <Route path={"/salesdash"} element={<SalesAgent/>} />
          <Route path={"/signup"} element={<Signup/>} />
          <Route path={"/verify"} element={<VoucherVerificationPage/>} />
          <Route path={"/vouchers"} element={<SPVoucherManagement/>} />
          <Route path={'/networks'} element={<NetworkMan/>} />
          <Route path={'/recharge'} element={<RechargeManagement/>} />
          <Route path={'/business-reports'} element={<BusReports/>} />
          <Route path={'/business-entities'} element={<BusEntities/>} />
          <Route path={'/sales-reports'} element={<SPSalesReports/>} /> 
          <Route path={'/partners'} element={<SPBusinessPartners/>} />
          <Route path={'/hor-reports'} element={<HORSalesReport/>} />
          <Route path={'/abm-reports'} element={<ABMSalesReport/>} />
          <Route path={'/voucher-usage-report'} element={<VoucherUsageReport/>} />
          <Route path={'/regional-reports'} element={<RegionalSalesReport/>} /> 
          <Route path={'/customers'} element={<Customers/>} /> 
          <Route path={'/commission'} element={<Commission/>} /> 
          <Route path={'/fin-sales-report'} element={<FinanceReports/>} /> 
          <Route path={'/accounts-reports'} element={<Commission/>} /> 
          <Route path={'/foc-reports'} element={<Sales page='foc-report'/>} /> 
        </Routes>
      </div>
      </BrowserRouter>
    );
  }
export default App