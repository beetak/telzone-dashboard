import { Component } from "react"
import { Link } from "react-router-dom"

const firstname = localStorage.getItem('firstname')
const surname = localStorage.getItem('surname')
const userRole = localStorage.getItem('role')


export default class ShopSupervisor extends Component{

    render(){
        return(
            <>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link text-white " to="/partners">
                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="material-icons opacity-10">add_business</i>
                    </div>
                    <span className="nav-link-text ms-1">Business Partners</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white " to="/verify">
                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="material-icons opacity-10">receipt_long</i>
                    </div>
                    <span className="nav-link-text ms-1">Voucher Verification</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white " to="/sales-reports">
                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="material-icons opacity-10">receipt_long</i>
                    </div>
                    <span className="nav-link-text ms-1">Reports</span>
                  </Link>
                </li>
                {/*<li className="nav-item">1
                  <Link className="nav-link text-white " to="/sales-reports">
                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="material-icons opacity-10">receipt_long</i>
                    </div>
                    <span className="nav-link-text ms-1">FOC Approvals</span>
                  </Link>
        </li>*/}
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