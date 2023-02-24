import { Component } from "react";
import Admin from "./Admin";
import SalesAdmin from "./SalesAdmin";
import SuperAdmin from "./SuperAdmin";

const role = localStorage.getItem('role')

class SideNavigation extends Component {
  componentDidMount(){
    
  }
    render (){
      let user

      if(role === "Admin"){
        user = <Admin/>
      }
      else if(role === "Super Admin"){
        user = <SuperAdmin/>
      }
      else if(role === "Sales Admin"){
        user = <SalesAdmin/>
      }
      else{
        window.location="/"
        // user = <SuperAdmin/>
      }
        return(

<aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
  <div className="sidenav-header">
    <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
    <a className="navbar-brand m-0" target="_blank">
      <img src="assets/img/logo-ct.png" className="navbar-brand-img h-100" alt="main_logo" />
      <span className="ms-1 font-weight-bold text-white">TelOne Private Limited</span>
    </a>
  </div>
  <hr className="horizontal light mt-0 mb-2" />
  {user}
</aside>

        )
    }
}

export default SideNavigation