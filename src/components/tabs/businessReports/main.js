import { useEffect, useState } from "react";
import axios from "axios"
import ClientsDetails from "./clientsDetails/clientsDetails";
import SalesDetails from "./salesDetails/salesDetails";
import BusinessPartnerDetails from "./busPartnerDetails/busPartnerDetails";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncBusiness} from "../../../store/business-slice";
import { fetchAsyncClients } from "../../../store/clients-slice";
import { getToggleStatus } from "../../../store/toggle-slice";
import { fetchAsyncSales, fetchAsyncSalesByCurrencyId } from "../../../store/sales-slice";
import { fetchAsyncBusinessRole } from "../../../store/business-role-slice";
import { fetchAsyncDailyPayments, fetchAsyncPayments } from "../../../store/customerPayments-slice";
import { fetchAsyncCurrency, getGlobalCurreny } from "../../../store/currency-slice";
import { fetchAsyncShopAgents } from "../../../store/user-slice";
import { fetchAsyncRegion } from "../../../store/entities-slice";

const url = "http://localhost:8082/smart-wifi/user/"; // URL variable stores JSON url || API taken from 10 Degrees WordPress Agency

export default function BusinessReports(){

    const[tabState, setTabState] = useState('')
    const active = useSelector(getToggleStatus)

    const dispatch = useDispatch()
    
    useEffect(() => {
      dispatch(fetchAsyncBusiness(active))
      dispatch(fetchAsyncClients())
      dispatch(fetchAsyncSales())
      dispatch(fetchAsyncBusinessRole())
      dispatch(fetchAsyncPayments())
      dispatch(fetchAsyncDailyPayments())
      dispatch(fetchAsyncCurrency(true))
      dispatch(fetchAsyncRegion())
    }, [dispatch, active]);

    let tabinfo
    
    if (tabState === 'clients') {
      tabinfo = <ClientsDetails/>;
    } 
    else if(tabState === 'business') {
      tabinfo = <BusinessPartnerDetails/>;
    }
    else if(tabState === 'sales') {
      tabinfo = <SalesDetails/>;
    }
    else{
      tabinfo = <ClientsDetails/>;
    }

    return(
    <>
      <div className="row">
          <div className="col-12">
              <div className="card my-4">
                  <div className="row">
                      <div className="col-4">
                          <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                              <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                  onClick={()=>setTabState('clients')}
                                  style={Style2}>
                                  <div className="col-12 d-flex align-items-center">
                                      <i className="fas fa-eye text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                                      <h6 className="text-white text-capitalize ps-1">View Clients Details</h6>
                                  </div>
                              </a>
                          </div>
                      </div>
                      <div className="col-4">
                          <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                              <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                  onClick={()=>setTabState('business')}
                                  style={Style2}>
                                  <div className="col-12 d-flex align-items-center">
                                    <div className="text-white text-center me-2 pb-2 d-flex align-items-center justify-content-center">
                                      <i className="material-icons opacity-10">groups</i>
                                    </div>
                                      <h6 className="text-white text-capitalize ps-1">Business Partner Details</h6>
                                  </div>
                              </a>
                          </div>
                      </div>
                      <div className="col-4">
                          <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                              <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                  onClick={()=>setTabState('sales')}
                                  style={Style2}>
                                  <div className="col-12 d-flex align-items-center">
                                    <div className="text-white text-center me-2 pb-2 d-flex align-items-center justify-content-center">
                                      <i className="material-icons opacity-10">groups</i>
                                    </div>
                                      <h6 className="text-white text-capitalize ps-1">Sales Report</h6>
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
      </>
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