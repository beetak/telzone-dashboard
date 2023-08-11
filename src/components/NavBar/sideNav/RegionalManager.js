import { Component } from "react"
import { Link } from "react-router-dom"

const firstname = localStorage.getItem('firstname')
const surname = localStorage.getItem('surname')
const userRole = localStorage.getItem('role')

export default class RegionalManager extends Component{
 
    render(){
        return(
            <>
              <ul className="navbar-nav">
                <li className="nav-item mt-3">
                  <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Reports pages</h6>
                </li>
                <li className="nav-item">
                {/* <Link className="nav-link text-white active bg-gradient-primary" to="/"> */}
                  <Link className="nav-link text-white" to="/regional-reports">
                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="material-icons opacity-10">dashboard</i>
                    </div>
                    <span className="nav-link-text ms-1">Shop Summary</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white " to="/packages">
                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="material-icons opacity-10">payment</i>
                    </div>
                    <span className="nav-link-text ms-1">Customer Summary</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white " to="/batch">
                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="material-icons opacity-10">receipt_long</i>
                    </div>
                    <span className="nav-link-text ms-1">Commission Summary</span>
                  </Link>
                </li>
                <li className="nav-item mt-3">
                  <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Account pages</h6>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white " to="/profile">
                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="material-icons opacity-10">person</i>
                    </div>
                    <span className="nav-link-text ms-1">{firstname} {surname}</span>
                  </Link>
                </li>
              </ul>
            </>
        )
    }
}