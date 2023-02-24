import { Component } from "react";
import { useSelector } from "react-redux";
import BatchDetails from "../../components/Batches/BatchDetails/BatchDetails";
import SideNavigation from "../../components/NavBar/sideNav";
import BatchVoucherDetails from "../../components/tabs/batchTabs/batchVoucherMain";
import RechargeDetails from "../../components/tabs/rechargeTabs/main";
import TopNavigation from "../../components/NavBar/topNav";
import { viewVouchers } from "../../store/batch-slice";

const userRole = localStorage.getItem('role')

export default function RechargeManagement() {

    const batchVouchers = useSelector(viewVouchers)
    
    return(
        <div>
            {<SideNavigation/>}
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                <TopNavigation title={"Recharge"}/>
                <div className="container-fluid py-4">
                {
                    userRole === 'Super Admin' && batchVouchers?                            
                        <BatchVoucherDetails/>:<RechargeDetails/>
                        // <BatchVoucherDetails/>:<BatchDetails/>      
                }
                </div>
            </main>
        </div>
    )
}