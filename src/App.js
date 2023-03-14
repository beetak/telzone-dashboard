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
import { useEffect } from 'react'
import { fetchAsyncNetworkReports, fetchAsyncOrganisationReports } from "./store/report-slice";
import UserLogin from "./pages/authentication/login";
import SalesAgent from "./pages/dashboard/salesAgent";
import VoucherVerificationPage from "./pages/sales/voucherVerification";

const userRole = localStorage.getItem('role')

function App() {

  const dispatch = useDispatch()



  useEffect(()=>{
    dispatch(fetchAsyncNetworkReports())
    dispatch(fetchAsyncOrganisationReports())
  },[dispatch])
    

  // useEffect(() => {
  //   return () => {
  //     const script = document.createElement("script");
  //     script.src = "assets/js/material-dashboard.js";
  //     script.async = true;
  //     document.body.appendChild(script);
  //     };
  //   }, []); 
    
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
          <Route path={"/sales"} element={<Sales/>} />
          <Route path={"/salesdash"} element={<SalesAgent/>} />
          <Route path={"/signup"} element={<Signup/>} />
          <Route path={"/verify"} element={<VoucherVerificationPage/>} />
          <Route path={'/networks'} element={<NetworkMan/>} />
          <Route path={'/recharge'} element={<RechargeManagement/>} />
          <Route path={'/business-reports'} element={<BusReports/>} />
        </Routes>
      </div>
      </BrowserRouter>
    );
  }
export default App