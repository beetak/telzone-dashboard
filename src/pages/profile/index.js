import { Component } from "react";
import SideNavigation from "../../components/NavBar/sideNav";
import TopNavigation from "../../components/NavBar/topNav";
import UserProfile from "../../components/User/UserProfile/UserProfile";


class Profile extends Component{
    render(){
        return(
<div>
    {<SideNavigation/>}
    <div class="main-content position-relative max-height-vh-100 h-100">
        {<TopNavigation title={"Profile"}/>}
        {<UserProfile/>}
    </div>
</div>
        )
    }
}
export default Profile