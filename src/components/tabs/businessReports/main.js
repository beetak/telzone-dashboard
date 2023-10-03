import { useEffect, useState } from "react";
import ClientsDetails from "./clientsDetails/clientsDetails";
import SalesDetails from "./salesDetails/salesDetails";
import BusinessPartnerDetails from "./busPartnerDetails/busPartnerDetails";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncBusiness} from "../../../store/business-slice";
import { fetchAsyncClients } from "../../../store/clients-slice";
import { getToggleStatus } from "../../../store/toggle-slice";
import { fetchAsyncBusinessRole } from "../../../store/business-role-slice";
import { customerPaymentsActions, fetchAsyncDailyPayments, fetchAsyncPayments } from "../../../store/customerPayments-slice";
import { fetchAsyncRegion, getRegionTowns, getTownShops } from "../../../store/entities-slice";
import { fetchAsyncBundles } from "../../../store/bundle-slice";
import SummarySales from "../../SalesReport/SummarySales";
import SummarySalesCommission from "../../SalesReport/SummarySalesCommision";
import SummarySalesCustomer from "../../SalesReport/SummarySalesCustomer";
import SummaryTaxes from "../../SalesReport/SummaryTaxes";
import { saleActions } from "../../../store/sales-slice";
import SummarySalesProduct from "../../SalesReport/SummarySalesProduct";

const userRole = localStorage.getItem('role')

export default function BusinessReports(){

    const[tabState, setTabState] = useState('')
    const active = useSelector(getToggleStatus)
    const regionId = useSelector(getRegionTowns)
    const townId = useSelector(getTownShops)

    const dispatch = useDispatch()
    
    useEffect(() => {
      dispatch(fetchAsyncBusiness(active))
      dispatch(fetchAsyncClients())
      dispatch(fetchAsyncBusinessRole())
      dispatch(fetchAsyncPayments())
      dispatch(fetchAsyncDailyPayments())
      dispatch(fetchAsyncRegion())
      dispatch(fetchAsyncBundles(true))
    }, [dispatch, active, regionId, townId]);

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
    else if(tabState === 'shop-report') {
      tabinfo = <SummarySales/>;
    }
    else if(tabState === 'tax-report') {
      tabinfo = <SummaryTaxes/>;
    }
    else if(tabState === 'customer-report') {
      tabinfo = <SummarySalesCustomer/>;
    }
    else if(tabState === 'commission-report') {
      tabinfo = <SummarySalesCommission/>;
    }
    else if(tabState === 'product-report') {
      tabinfo = <SummarySalesProduct/>;
    }
    else{
      tabinfo = userRole !== 'Regional Accountant' && userRole !== 'Finance Manager'?<ClientsDetails/>:<SummarySales/>
    }

    let nav = ''

    if(userRole === 'Regional Accountant' || userRole === 'Finance Manager'){
      nav = <>
        <div className="row">
          <div className="col-3">
            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
              <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                  onClick={()=>setTabState('shop-report')}
                  style={Style2}>
                <div className="col-12 d-flex align-items-center">
                  <i className="fas fa-eye text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                  <h6 className="text-white text-capitalize ps-1">Shop Summary Sales</h6>
                </div>
              </a>
            </div>
          </div>
          <div className="col-3">
            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
              <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                  onClick={()=>{
                    userRole === 'Finance Manager' && setTabState('product-report')
                    userRole === 'Regional Accountant' && setTabState('customer-report')
                    dispatch(saleActions.clearSales())
                    dispatch(customerPaymentsActions.clearPayments())
                  }}
                  style={Style2}>
                <div className="col-12 d-flex align-items-center">
                  <div className="text-white text-center me-2 pb-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">groups</i>
                  </div>
                    <h6 className="text-white text-capitalize ps-1">{userRole==="Finance Manager"?'Product Summary':'Customer Summary'}</h6>
                </div>
              </a>
            </div>
          </div>
          <div className="col-3">
            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
              <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                  onClick={()=>{
                    setTabState('commission-report')
                    dispatch(saleActions.clearSales())
                    dispatch(customerPaymentsActions.clearPayments())
                  }}
                  style={Style2}>
                <div className="col-12 d-flex align-items-center">
                  <div className="text-white text-center me-2 pb-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">groups</i>
                  </div>
                    <h6 className="text-white text-capitalize ps-1">Commissions Report</h6>
                </div>
              </a>
            </div>
          </div>
          <div className="col-3">
            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
              <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                  onClick={()=>{
                    setTabState('tax-report')
                    dispatch(saleActions.clearSales())
                    dispatch(customerPaymentsActions.clearPayments())
                  }}
                  style={Style2}>
                <div className="col-12 d-flex align-items-center">
                  <div className="text-white text-center me-2 pb-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">groups</i>
                  </div>
                    <h6 className="text-white text-capitalize ps-1">Tax Report</h6>
                </div>
              </a>
            </div>
          </div>
        </div>
      </>
    }
    else{
      nav = <>
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
      </>
    }

    return(
    <>
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            {nav}
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