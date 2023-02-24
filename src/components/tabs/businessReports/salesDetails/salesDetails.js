import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncSalesByPartnerId } from "../../../../store/sales-slice";
import DailySalesList from "../../../Sales/SalesList/DailySalesList";
import PartnerSalesList from "../../../Sales/SalesList/PartnerSalesList";
import SalesList from "../../../Sales/SalesList/PartnerSalesList";
import TotalSalesList from "../../../Sales/SalesList/TotalSalesList";
import SalesTableDetails from "../../../tables/SalesTableDetails";

export default function SalesDetails (){

  const [id, setId] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAsyncSalesByPartnerId(id))
  }, [dispatch, id]);

  const [show, setShow] =useState('')
  let tab = ''
  if(show === 'total_sales'){
    tab = <TotalSalesList/>
  }
  else if(show === 'daily_sales'){
    tab = <DailySalesList/>
  }
  else if(show  === 'partner_sales'){
    tab = <PartnerSalesList/>
  }
  else{
    tab = <TotalSalesList/>
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
                      setShow('total_sales')
                    }
                  }>
                  <i className="as fa-rotate-left text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                  Total Sales
                </button>
                <button  className="btn btn-sm mb-1 mt-0 me-1 bg-gradient-dark"
                  onClick={
                    ()=>{
                      setShow('daily_sales')
                    }
                  }>
                  <i className="as fa-rotate-left text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                  Daily Sales
                </button>
                <button  className="btn btn-sm mb-1 mt-0 me-1 bg-gradient-dark"
                  onClick={
                    ()=>{
                      setShow('partner_sales')
                    }
                  }>
                  <i className="as fa-rotate-left text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                  Business Partner Sales
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