import { useState, useEffect} from "react";
import BatchesTab from "./batchesTable/batchTable";
import BatchCreateForm from "./createBatch/createBatch";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncBatches, fetchAsyncVouchers } from "../../../store/batch-slice";
import { fetchAsyncBundles } from "../../../store/bundle-slice";
import BlockedVouchers from "./blockedVouchers/blocedVouchers";
import MerchandiseVouchers from "./merchandiseVouchers/merchandiseVouchers";

const url = "http://localhost:8082/smart-wifi/user/"; // URL variable stores JSON url || API taken from 10 Degrees WordPress Agency

const voucherState = localStorage.getItem('voucherState')
const userRole = localStorage.getItem('role')

export default function BundleDetails(){

    const [tabState, setTabState] = useState("")
    const dispatch = useDispatch()
    const active = true

    useEffect(() => {
      dispatch(fetchAsyncBatches())
      dispatch(fetchAsyncVouchers())
      dispatch(fetchAsyncBundles(active))
    }, [dispatch]);


        let tabinfo
        
        if(tabState==='voucher'){
            tabinfo = <BatchesTab/>;
        }
        else{
            if (tabState === 'catTab') {
                tabinfo = <BatchCreateForm/>;
              } 
              else if(tabState === 'bundles') {
                dispatch(fetchAsyncBatches())
                tabinfo = <BatchesTab/>;
                  // tabinfo = <VouchersTable/>
              }
              else if(tabState === 'blockTab') {
                tabinfo = <BlockedVouchers/>;
                  // tabinfo = <VouchersTable/>
              }
              else if(tabState === 'merchandise') {
                tabinfo = <MerchandiseVouchers/>;
                  // tabinfo = <VouchersTable/>
              }
              else{
                tabinfo = <BatchCreateForm/>;
              }
        }

        return(
<div>
<div className="row">
    <div className="col-12">
        <div className="card my-4">
            <div className="row">
                {userRole==='Admin'? (
                    <div className="col-3">
                        <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                            <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                onClick={()=>setTabState('catTab')}
                                style={Style2}
                                >
                                <div className="col-12 d-flex align-items-center">
                                    <h6 className="text-white text-capitalize ps-3">Generate Vouchers</h6>
                                </div>
                            </a>
                        </div>
                    </div>
                ): ("")}
                <div className="col-3">
                    <div className="position-relative mt-n4 mx-3  z-index-2" style={Style2}>
                        <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                            onClick={()=>setTabState('bundles')}
                            style={Style2}>
                            <div className="col-12 d-flex align-items-center">
                                <h6 className="text-white text-capitalize ps-3">Voucher Batches</h6>
                            </div>
                        </a>
                    </div>
                </div>
                {userRole==='Admin'? (
                    <>
                        <div className="col-3">
                            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                                <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                    onClick={()=>setTabState('blockTab')}
                                    style={Style2}
                                    >
                                    <div className="col-12 d-flex align-items-center">
                                        <h6 className="text-white text-capitalize ps-3">Block Vouchers</h6>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                                <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                    onClick={()=>setTabState('merchandise')}
                                    style={Style2}
                                    >
                                    <div className="col-12 d-flex align-items-center">
                                        <h6 className="text-white text-capitalize ps-3">Merchandise Vouchers</h6>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </>
                ): ("")}
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


const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem",
    cursor: "pointer"
}