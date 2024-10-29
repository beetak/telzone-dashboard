import { useState, useEffect } from "react";
import ShopReportsTab from "./shopReportsTab/shopReportsTab";
import AgentReportsTab from "./agentReportsTab/agentReportsTab";
import VoucherReportsTab from "./voucherReportsTab/voucherReportsTab";
import VoucherVerification from "../../Vouchers/VoucherVerification/VoucherVerification";
import FurtherDetails from "../../Vouchers/FurtherDetails/FurtherDetails";
import { useSelector } from "react-redux";
import { getShow } from "../../../store/batch-slice";
import VoucherReactivate from "../../Vouchers/VoucherReactivate/VoucherReactivate";

 // URL variable stores JSON url || API taken from 10 Degrees WordPress Agency

export default function SupervisorReportDetails(){
    
    const [tabState, setTabState] = useState('')
    const showMore = useSelector(getShow)

    let tabinfo = ""
    if(tabState === "voucherReports"){
      tabinfo = <VoucherReportsTab/>
    }
    else if(tabState==='voucher-verify'){
      tabinfo = <>
          <div className="container-fluid">
            <div className="row">
              <VoucherVerification/>
              {
                  showMore?
                      <FurtherDetails/>:''
              }
            </div>
          </div>
      </>
    }
    else if(tabState === 'activation'){
      tabinfo = <>
      <div className="container-fluid">
        <div className="row">
          <div class="col-lg-7 py-4">                
            <div className="row">
              <div className="col-12">
                <div className="card my-4">
                  <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                    <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                      <h6 className="text-white text-capitalize ps-3 text-center">Voucher Generation Response</h6>
                    </div>
                  </div>
                  <div className="card-body px-0 pb-2">
                    <div className="table-responsive p-0" style={Style1}>
                      <VoucherReactivate/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
      </>
    }
    else{
      tabinfo = <AgentReportsTab/>
    }
        return(
<div>
<div className="row">
    <div className="col-12">
        <div className="card my-4">
            <div className="row">
                <div className="col-3">
                    <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                        <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                            onClick={()=>setTabState('agentReports')}
                            style={Style2}>
                            <div className="col-12 d-flex align-items-center">
                                <h6 className="text-white text-capitalize ps-3">Agent Reports</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="col-3">
                    <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                        <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                            onClick={()=>setTabState('voucherReports')}
                            style={Style2}>
                            <div className="col-12 d-flex align-items-center">
                                <h6 className="text-white text-capitalize ps-3">Voucher Reports</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="col-3">
                  <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                    <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                      onClick={()=>setTabState('voucher-verify')}
                      style={Style2}>
                      <div className="col-12 d-flex align-items-center">
                        <h6 className="text-white text-capitalize ps-3">Voucher Verification</h6>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-3">
                  <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                    <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                      onClick={()=>setTabState('activation')}
                      style={Style2}>
                      <div className="col-12 d-flex align-items-center">
                        <h6 className="text-white text-capitalize ps-3">Reactivations</h6>
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