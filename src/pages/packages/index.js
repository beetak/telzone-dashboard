import { Component } from "react";
import PackageCreation from "../../components/forms/packageCreation/package";
import SideNavigation from "../../components/sideNav";
import TopNavigation from "../../components/topNav";
import PackageTable from "../../components/tables/packageTable";

class Packages extends Component{
    render(){
        return(
            <div>
                {<SideNavigation/>}
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    {<TopNavigation title={"Packages"}/>}
                    <div className="container-fluid py-4">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="row">
                                    {<PackageTable/>}
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <PackageCreation/>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}
export default Packages