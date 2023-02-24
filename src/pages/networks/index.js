import { Component } from "react";
import SideNavigation from "../../components/NavBar/sideNav";
import NewtorkManagement from "../../components/tabs/networkTabs/main";
import TopNavigation from "../../components/NavBar/topNav";

export default class NetworkMan extends Component {
    render(){
        return(
            <div>
                {<SideNavigation/>}
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    {<TopNavigation title={"Networks"}/>}
                    <div className="container-fluid py-4">
                        <NewtorkManagement/>
                    </div>
                </main>
            </div>
        )
    }
}