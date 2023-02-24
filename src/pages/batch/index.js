import { Component } from "react";
import { useSelector } from "react-redux";
import SideNavigation from "../../components/NavBar/sideNav";
import BatchVoucherDetails from "../../components/tabs/batchTabs/batchVoucherMain";
import BatchDetails from "../../components/tabs/batchTabs/main";
import TopNavigation from "../../components/NavBar/topNav";
import { viewVouchers } from "../../store/batch-slice";

const userRole = localStorage.getItem('role')

export default function BatchList () {

    const batchVouchers = useSelector(viewVouchers)
    
    return(
        <div>
            {<SideNavigation/>}
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                {<TopNavigation title={"Batches"}/>}
                <div className="container-fluid py-4">
                    {
                        userRole === 'Admin' && batchVouchers?
                            <BatchVoucherDetails/>:<BatchDetails/>        
                    }
                </div>
            </main>
        </div>
    )
}