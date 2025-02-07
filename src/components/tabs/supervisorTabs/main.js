import { useState, useEffect } from "react";
import AgentReportsTab from "./agentReportsTab/agentReportsTab";
import VoucherReportsTab from "./voucherReportsTab/voucherReportsTab";
import VoucherVerification from "../../Vouchers/VoucherVerification/VoucherVerification";
import FurtherDetails from "../../Vouchers/FurtherDetails/FurtherDetails";
import { useSelector } from "react-redux";
import { getShow } from "../../../store/batch-slice";
import VoucherReactivate from "../../Vouchers/VoucherReactivate/VoucherReactivate";
import SummarySessionSales from "../../SalesReport/SummarySessionSales";

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
    else if(tabState==='sessions'){
      tabinfo = <SummarySessionSales/>
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
        <div>
          <div className="row g-3 mb-4">
            {[
              { title: "Agent Reports", state: "agentReports" },
              { title: "Voucher Reports", state: "voucherReports" },
              { title: "Voucher Verification", state: "voucher-verify" },
              { title: "Reactivations", state: "activation" },
              { title: "Sessions", state: "sessions" },
            ].map((item, index) => (
              <div className="col" key={index}>
                <div className="card h-100 bg-gradient-primary shadow-sm border-0">
                  <div className="card-body d-flex align-items-center justify-content-center p-2">
                    <a
                      className="text-white text-center w-100"
                      onClick={() => setTabState(item.state)}
                      style={{ cursor: "pointer" }}
                    >
                      <h6 className="mb-0 text-white">{item.title}</h6>
                    </a>
                  </div>
                </div>
              </div>
            ))}
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