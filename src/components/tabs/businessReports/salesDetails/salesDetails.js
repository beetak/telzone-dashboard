import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGlobalCurrency, getGlobalSymbol } from "../../../../store/currency-slice";
import { fetchAsyncDailyPayments, fetchAsyncPeriodicalPayments } from "../../../../store/customerPayments-slice";
import { fetchAsyncSalesByCurrencyId, fetchAsyncSalesByPartnerId } from "../../../../store/sales-slice";
import { getStartTime } from "../../../../store/toggle-slice";
import DailySalesList from "../../../Sales/SalesList/DailySalesList";
import PartnerSalesList from "../../../Sales/SalesList/PartnerSalesList";
import SalesList from "../../../Sales/SalesList/PartnerSalesList";
import TotalSalesList from "../../../Sales/SalesList/TotalSalesList";
import SummarySales from "../../../SalesReport/SummarySales";
import SummarySalesShop from "../../../SalesReport/SummarySalesShop";
import SummarySalesCustomer from "../../../SalesReport/SummarySalesShopCustomer";
import SalesTableDetails from "../../../tables/SalesTableDetails";

export default function SalesDetails (){

  const today = new Date()
  const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
  console.log("date: ", date)

  const [id, setId] = useState('')
  const dispatch = useDispatch()   

  const curId = useSelector(getGlobalCurrency)
  const curSymbol = useSelector(getGlobalSymbol)
  const startDate = useSelector(getStartTime)

  useEffect(() => {
    dispatch(fetchAsyncSalesByPartnerId(id))
    dispatch(fetchAsyncSalesByCurrencyId({startDate, date, curId}))
    dispatch(fetchAsyncPeriodicalPayments({startDate, date, curSymbol}))
    // dispatch(fetchAsyncDailyPayments({date, curSymbol}))
  }, [dispatch, id, curId, curSymbol, startDate]);

  const [show, setShow] =useState('')
  let tab = ''
  if(show === 'summary_sales'){
    // tab = <TotalSalesList/>
    tab = <SummarySales/>
  }
  else if(show === 'customer_summary'){
    // tab = <DailySalesList/>
    tab = <SummarySalesCustomer/>
  }
  else if(show  === 'shop_summary'){
    // tab = <PartnerSalesList/>
    tab = <SummarySalesShop/>
  }
  else{
    // tab = <TotalSalesList/>
    tab = <SummarySales/>
  }

        return(

<div className="container-fluid">
  <div className="row">
    <div class="col-12 py-4">                
      <div className="card my-4">
        <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
          <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
            <div className="row">
              <div className="col-5"> <h6 className="text-white text-capitalize ps-3">Sales Report</h6></div>
              <div className="col-7">
                <button  className="btn btn-sm mb-1 mt-0 me-1 bg-gradient-dark"
                  onClick={
                    ()=>{
                      setShow('summary_sales')
                    }
                  }>
                  <i className="as fa-rotate-left text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                  Summary Sales
                </button>
                <button  className="btn btn-sm mb-1 mt-0 me-1 bg-gradient-dark"
                  onClick={
                    ()=>{
                      setShow('customer_summary')
                    }
                  }>
                  <i className="as fa-rotate-left text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                  Customer Summary
                </button>
                <button  className="btn btn-sm mb-1 mt-0 me-1 bg-gradient-dark"
                  onClick={
                    ()=>{
                      setShow('shop_summary')
                    }
                  }>
                  <i className="as fa-rotate-left text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                  Shop Summary
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body px-0 pb-2">
          <div className="table-responsive p-0">
            {tab}
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
  paddinBottom: "0.5rem"
}