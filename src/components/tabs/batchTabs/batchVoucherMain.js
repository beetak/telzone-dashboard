import { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearVouchers } from "../../../store/batch-slice";
import BatchDetails from "../../Batches/BatchDetails/BatchDetails";
import VoucherList from "../../Vouchers/VoucherList/VoucherList";

const userRole = localStorage.getItem('role')

export default function BatchVoucherDetails(){

  const dispatch = useDispatch()

        return(
<div>
      <div className="card my-4">
        <div className="row">
          <div class="col-12">    
            <div className="position-relative mt-n4 mx-3 z-index-2 py-4" style={Style2}>
              <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                <h6 className="text-white text-capitalize ps-3">        
                  <ul className="navbar-nav d-lg-block d-none ">
                    <li className="nav-item">
                      <button  className="btn btn-sm mb-0 me-1 bg-gradient-dark"
                          onClick={
                            ()=>dispatch(clearVouchers())
                          }>
                          <i className="as fa-rotate-left text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                          Click to go back
                      </button>
                    </li>
                  </ul>
                </h6>
              </div>
            </div>
            <div className="card-body px-0 mx-3 pb-2">
              <div className="table-responsive p-0">
                {/*<BatchDetails/>*/}
                <VoucherList/>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
        )
}


const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem",
    cursor: "pointer"
}