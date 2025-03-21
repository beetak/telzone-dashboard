"use client"

import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom"
import Adverts from "./pages/adverts"
import Dashboard from "./pages/dashboard"
import Profile from "./pages/profile"
import Sales from "./pages/sales"
import BatchList from "./pages/batch"
import BundleList from "./pages/bundles"
import NetworkMan from "./pages/networks"
import RechargeManagement from "./pages/recharge"
import BusReports from "./pages/busReports"
import Signup from "./pages/authentication/Signup"
import BatchVoucherList from "./pages/batchVouchers"
import UserLogin from "./pages/authentication/login"
import SalesAgent from "./pages/dashboard/salesAgent"
import VoucherVerificationPage from "./pages/sales/voucherVerification"
import SPBusinessPartners from "./pages/shopManager/businessPartners/SPBusinessPartners"
import SPSalesReports from "./pages/shopManager/salesReports/SPSalesReports"
import BusEntities from "./pages/busEntities"
import SPVoucherManagement from "./pages/shopManager/vouchers/SPVoucherManagement"
import HORSalesReport from "./pages/headManager/HORSalesReport"
import ABMSalesReport from "./pages/areaBusManager/ABMSalesReport"
import RegionalSalesReport from "./pages/regionalManager/RegionalSalesReport"
import Customers from "./pages/customers"
import Commission from "./pages/commission"
import FinanceReports from "./pages/finReports"
import VoucherUsageReport from "./pages/voucherUsageReport"
import { useDispatch, useSelector } from "react-redux"

const IDLE_TIME_LIMIT = 300000

const LockoutScreen = ({ onLogin }) => {
  return (
    <div
      className="lockout-screen"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "2rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "400px",
          width: "90%",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            color: "#333",
            fontSize: "1.5rem",
            marginBottom: "1rem",
          }}
        >
          Session Locked
        </h2>
        <p
          style={{
            marginBottom: "1.5rem",
            color: "#666",
          }}
        >
          Your session has expired due to inactivity.
        </p>
        <button
          onClick={onLogin}
          style={{
            backgroundColor: "#4a6cf7",
            color: "white",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "4px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.2s",
            fontWeight: "500",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#3a5ce5")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4a6cf7")}
        >
          Go to Login
        </button>
      </div>
    </div>
  )
}

function App() {
  const [isLocked, setIsLocked] = useState(false)
  const [timer, setTimer] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart.itemsList)
  console.log(cartItems)

  const resetTimer = () => {
    if (timer) {
      clearTimeout(timer)
    }

    // Only set a new timer if the user is not locked out and not on the login page
    if (!isLocked && location.pathname !== "/") {
      setTimer(setTimeout(lockoutUser, IDLE_TIME_LIMIT))
    }
  }

  const lockoutUser = () => {
    // Save the current path before logging out (except if it's the login page)
    if (location.pathname !== "/") {
      sessionStorage.setItem("lastPath", location.pathname)
    }

    // Clear all auth data
    localStorage.clear()

    // You might need to dispatch a logout action to your Redux store
    // dispatch({ type: 'LOGOUT' });

    setIsLocked(true)

    // Immediately navigate to login page
    navigate("/")
  }

  const handleUserActivity = () => {
    // Only reset the timer if the user is not locked out
    if (!isLocked) {
      resetTimer()
    }
  }

  const handleLogin = () => {
    setIsLocked(false)
    navigate("/")
  }

  useEffect(() => {
    // Only add event listeners if the user is not locked out and not on the login page
    if (!isLocked && location.pathname !== "/") {
      window.addEventListener("mousemove", handleUserActivity)
      window.addEventListener("keydown", handleUserActivity)
      window.addEventListener("click", handleUserActivity)
      window.addEventListener("scroll", handleUserActivity)

      resetTimer()

      return () => {
        window.removeEventListener("mousemove", handleUserActivity)
        window.removeEventListener("keydown", handleUserActivity)
        window.removeEventListener("click", handleUserActivity)
        window.removeEventListener("scroll", handleUserActivity)
        clearTimeout(timer)
      }
    } else {
      // Clean up event listeners when locked or on login page
      window.removeEventListener("mousemove", handleUserActivity)
      window.removeEventListener("keydown", handleUserActivity)
      window.removeEventListener("click", handleUserActivity)
      window.removeEventListener("scroll", handleUserActivity)
      clearTimeout(timer)
    }
  }, [isLocked, location.pathname])

  // Reset the lock state when navigating to a new page
  useEffect(() => {
    // If we're not on the login page and not locked, reset the timer
    if (location.pathname !== "/" && !isLocked) {
      resetTimer()
    }
  }, [location.pathname])

  return (
    <div>
      {isLocked ? (
        <LockoutScreen onLogin={handleLogin} />
      ) : (
        <Routes>
          <Route path={"/"} element={<UserLogin />} />
          <Route path={"/batch"} element={<BatchList />} />
          <Route path={"/batch/:id"} element={<BatchVoucherList />} />
          <Route path={"/recharge"} element={<RechargeManagement />} />
          <Route path={"/packages"} element={<BundleList />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/adverts"} element={<Adverts />} />
          <Route path={"/sales"} element={<Sales page="sales" />} />
          <Route path={"/foc-sales"} element={<Sales page="foc-sales" />} />
          <Route path={"/salesdash"} element={<SalesAgent />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/verify"} element={<VoucherVerificationPage />} />
          <Route path={"/vouchers"} element={<SPVoucherManagement />} />
          <Route path={"/networks"} element={<NetworkMan />} />
          <Route path={"/business-reports"} element={<BusReports />} />
          <Route path={"/business-entities"} element={<BusEntities />} />
          <Route path={"/sales-reports"} element={<SPSalesReports />} />
          <Route path={"/partners"} element={<SPBusinessPartners />} />
          <Route path={"/hor-reports"} element={<HORSalesReport />} />
          <Route path={"/abm-reports"} element={<ABMSalesReport />} />
          <Route path={"/voucher-usage-report"} element={<VoucherUsageReport />} />
          <Route path={"/regional-reports"} element={<RegionalSalesReport />} />
          <Route path={"/customers"} element={<Customers />} />
          <Route path={"/commission"} element={<Commission />} />
          <Route path={"/fin-sales-report"} element={<FinanceReports />} />
          <Route path={"/accounts-reports"} element={<Commission />} />
          <Route path={"/foc-reports"} element={<Sales page="foc-report" />} />
        </Routes>
      )}
    </div>
  )
}

// Modify the UserLogin component to check for a saved path
// This would be in your login component
const redirectAfterLogin = () => {
  const lastPath = sessionStorage.getItem("lastPath")
  if (lastPath) {
    sessionStorage.removeItem("lastPath")
    return lastPath
  }
  return "/dashboard" // Default redirect after login
}

// Wrap the App component with BrowserRouter
const MainApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

export default MainApp