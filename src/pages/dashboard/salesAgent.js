import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideNavigation from '../../components/NavBar/sideNav';
import TopNavigation from '../../components/NavBar/topNav';
import DailyReport from '../../components/SalesReport/DailyReport';
import { fetchAsyncBundles } from '../../store/bundle-slice';
import { fetchAsyncBusiness } from '../../store/business-slice';
import { fetchAsyncCurrency, getGlobalCurrency } from '../../store/currency-slice';
import { getStartTime } from '../../store/toggle-slice';
import VoucherReport from '../../components/Vouchers/VoucherReport/VoucherReport';
import VoucherVerificationPage from '../sales/voucherVerification';
import VoucherVerification from '../../components/Vouchers/VoucherVerification/VoucherVerification';
import FurtherDetails from '../../components/Vouchers/FurtherDetails/FurtherDetails';
import { getShow } from '../../store/batch-slice';
import SMSVerification from '../../components/Vouchers/SMSVerification/SMSVerification';

const userID = localStorage.getItem('userId')

export default function SalesAgent() {

  const dispatch = useDispatch()

  const [tabState, setTabState] = useState('')
  const showMore = useSelector(getShow)

  let tabinfo = ""
  if(tabState === "sales"){
    tabinfo = <DailyReport/>
  }
  else if(tabState === "voucher"){ 
    tabinfo = <VoucherReport/>
  }
  else if(tabState === "sms"){ 
    tabinfo = <>
        <div className="container-fluid">
          <div className="row">
            <SMSVerification/>
            {
                showMore?
                    <FurtherDetails/>:''
            }
          </div>
        </div>
    </>
  }
  else{
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

  const curId = useSelector(getGlobalCurrency)
  const date = useSelector(getStartTime)

  useEffect(() => {
    dispatch(fetchAsyncBundles(true))
    dispatch(fetchAsyncBusiness(true))
    dispatch(fetchAsyncCurrency(true))
  }, [dispatch, curId, date]);

  return (

    <div>
        {<SideNavigation/>}
        <main className="main-content position-relative max-height-vh-100 h-100 border-!radius-lg ">
            {<TopNavigation title={"Day End Reports"}/>}
            <div className="container-fluid py-4">
              <div>
                <div className="row">
                  <div className="col-12">
                    <div className="card my-4">
                      <div className="row">
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
                              onClick={()=>setTabState('sales')}
                              style={Style2}>
                              <div className="col-12 d-flex align-items-center">
                                <h6 className="text-white text-capitalize ps-3">Sales Report</h6>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                            <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                              onClick={()=>setTabState('voucher')}
                              style={Style2}>
                              <div className="col-12 d-flex align-items-center">
                                <h6 className="text-white text-capitalize ps-3">Vouchers Report</h6>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                            <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                              onClick={()=>setTabState('sms')}
                              style={Style2}>
                              <div className="col-12 d-flex align-items-center">
                                <h6 className="text-white text-capitalize ps-3">SMS Report</h6>
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
            </div>
        </main>
    </div>
  );
}


const Style2={
paddingTop: "1rem",
paddinBottom: "0.5rem",
cursor: "pointer"
}
