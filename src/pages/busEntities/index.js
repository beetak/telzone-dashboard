import { Component } from "react";
import SideNavigation from "../../components/NavBar/sideNav";
import TopNavigation from "../../components/NavBar/topNav";
import BusinessEntities from "../../components/tabs/businessEntities/main";

export default class BusEntities extends Component {
    render(){
        return(
            <div>
                {<SideNavigation/>}
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    {<TopNavigation title={"Business Entities"}/>}
                    <div className="container-fluid py-4">
                        <BusinessEntities/>
                    </div>
                </main>
            </div>
        )
    }
}