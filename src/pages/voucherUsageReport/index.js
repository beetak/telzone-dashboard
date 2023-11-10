import { Component } from "react";
import SideNavigation from "../../components/NavBar/sideNav";
import TopNavigation from "../../components/NavBar/topNav";
import VoucherReport from "../../components/Vouchers/VoucherReport/VoucherReport";

export default class VoucherUsageReport extends Component {
    render(){
        return(
            <div>
                {<SideNavigation/>}
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    {<TopNavigation title={"Business Reports"}/>}
                    <div className="container-fluid py-4">
                        <VoucherReport/>
                    </div>
                </main>
            </div>
        )
    }
}