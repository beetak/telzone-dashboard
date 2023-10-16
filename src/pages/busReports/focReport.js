import { Component } from "react";
import SideNavigation from "../../components/NavBar/sideNav";
import BundleDetails from "../../components/tabs/bundlesTabs/main";
import BusinessReports from "../../components/tabs/businessReports/main";
import TopNavigation from "../../components/NavBar/topNav";
import FocList from "../../components/ShoppingCart/FocList/FocList";

export default class FocReports extends Component {
    render(){
        return(
            <div>
                {<SideNavigation/>}
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    {<TopNavigation title={"Business Reports"}/>}
                    <div className="container-fluid py-4">
                        <FocList/>
                    </div>
                </main>
            </div>
        )
    }
}