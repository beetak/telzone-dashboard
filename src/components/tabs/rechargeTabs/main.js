import { useEffect, useState } from "react";
import axios from "axios"
import RechargeBundleDetails from "./bundlesDetails/bundlesDetails";
import RechargeVoucherDetails from "./vouchersDetails/voucherDetails";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncBatches, fetchAsyncVouchers } from "../../../store/batch-slice";
import { fetchAsyncBundles } from "../../../store/bundle-slice";
import { getToggleStatus } from "../../../store/toggle-slice";

const url = "http://localhost:8082/smart-wifi/user/"; // URL variable stores JSON url || API taken from 10 Degrees WordPress Agency

export default function RechargeDetails (){
    const [tabState, setTabState] = useState("")
    const dispatch = useDispatch()
    const active = useSelector(getToggleStatus)

    useEffect(() => {
        dispatch(fetchAsyncBatches())
        dispatch(fetchAsyncVouchers())
        dispatch(fetchAsyncBundles(active))
    }, [dispatch, active]);

    let tabinfo
    
    if (tabState === 'bundles') {
        tabinfo = <RechargeBundleDetails/>;
    } 
    else if(tabState === 'vouchers') {
        tabinfo = <RechargeVoucherDetails/>;
    }
    else{
        tabinfo = <RechargeBundleDetails/>;
    }

    return(
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="card my-4">
                        <div className="row">
                            <div className="col-4">
                                <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                                    <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                        onClick={()=>setTabState('bundles')}
                                        style={Style2}
                                        >
                                        <div className="col-12 d-flex align-items-center">
                                            <i className="fas fa-eye text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                                            <h6 className="text-white text-capitalize ps-3">View Bundles</h6>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                                    <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                        onClick={()=>setTabState('vouchers')}
                                        style={Style2}>
                                        <div className="col-12 d-flex align-items-center">
                                            <i className="fas fa-eye text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                                            <h6 className="text-white text-capitalize ps-3">View Vouchers</h6>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <div className="table-responsive p-0">
                                {tabinfo}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }


const Style1={
  textAlign:"center"
}

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem",
    cursor: "pointer"
}