import { Component } from "react";
import SideNavigation from "../../components/NavBar/sideNav";
import BatchVoucherDetails from "../../components/tabs/batchTabs/batchVoucherMain";
import TopNavigation from "../../components/NavBar/topNav";

export default class BatchVoucherList extends Component {
    render(){
        return(
            <div>
                {<SideNavigation/>}
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    {<TopNavigation title={"Batches"}/>}
                    <div className="container-fluid py-4">
                        <BatchVoucherDetails/>
                    </div>
                </main>
            </div>
        )
    }
}