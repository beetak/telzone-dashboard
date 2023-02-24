import { Component } from "react";
import SideNavigation from "../../components/NavBar/sideNav";
import BundleDetails from "../../components/tabs/bundlesTabs/main";
import TopNavigation from "../../components/NavBar/topNav";

export default class BundleList extends Component {
    render(){
        return(
            <div>
                {<SideNavigation/>}
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    {<TopNavigation title={"Bundles"}/>}
                    <div className="container-fluid py-4">
                        <BundleDetails/>
                    </div>
                </main>
            </div>
        )
    }
}