import { Component } from "react";
import ProfileDetails from "../../components/profileDetails";
import SideNavigation from "../../components/NavBar/sideNav";
import TopNavigation from "../../components/NavBar/topNav";


class Profile extends Component{
    render(){
        return(
<div>
    {<SideNavigation/>}
    <div class="main-content position-relative max-height-vh-100 h-100">
        {<TopNavigation title={"Profile"}/>}
        {<ProfileDetails/>}
    </div>
</div>
        )
    }
}
export default Profile