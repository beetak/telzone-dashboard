import { Component } from "react";
import SideNavigation from "../../components/sideNav";
import MainComponent from "../../components/tabs/mainComponent/voucherPan";
import TopNavigation from "../../components/topNav";

class Vouchers extends Component {
    render(){
        return(
            <div>
                {<SideNavigation/>}
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    {<TopNavigation title={"Vouchers"}/>}
                    <div className="container-fluid py-4">
                        <MainComponent/>
                    </div>
                </main>
            </div>
        )
    }
}

export default Vouchers