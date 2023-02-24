import axios from "axios";
import { Component } from "react";
// import SalesStats from "../../components/Dashboard/SalesStats/SalesStats";
import Statistics from "../../components/Dashboard/statistics";
import SideNavigation from "../../components/NavBar/sideNav";
import TopNavigation from "../../components/NavBar/topNav";

const url = "http://localhost:8082/smart-wifi/"

class Dashboard extends Component {
    
    render(){
        return(
            <div>
                {<SideNavigation/>}
                <main className="main-content position-relative max-height-vh-100 h-100 border-!radius-lg ">
                    {<TopNavigation title={"Dashboard"}/>}
                    <div className="container-fluid py-4">
                        <Statistics/>
                        <br/>
                        {/*<SalesStats/>*/}
                    </div>
                </main>
            </div>
        )
    }
}

export default Dashboard