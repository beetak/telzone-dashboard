import { useState, useEffect } from "react";
import BundlesTab from "./bundleTable/bundleTable";
import CategoryCreate from "./createBundle/createBundle";
import CurrencyDetails from "./currencyDetails/currencyDetails";
import BaseCurrencyTab from "./baseCurr/baseCurrency";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncBundles } from "../../../store/bundle-slice";
import { fetchAsyncCategory } from "../../../store/category-slice";
import { fetchAsyncCurrency } from "../../../store/currency-slice";
import { fetchAsyncGroupPolicy } from "../../../store/policy-slice";
import { fetchAsyncBasePrice } from "../../../store/basePrice-slice";
import { getToggleStatus } from "../../../store/toggle-slice";

 // URL variable stores JSON url || API taken from 10 Degrees WordPress Agency

export default function BundleDetails(){
    
    const [tabState, setTabState] = useState('')

        let tabinfo
        
        if (tabState === 'catTab') {
          tabinfo = <CategoryCreate/>;
        } 
        else if(tabState === 'bundles') {
          tabinfo = <BundlesTab/>;
        }
        else if(tabState === 'currency') {
          tabinfo = <CurrencyDetails/>;
        }
        else if(tabState === 'base') {
            tabinfo = <BaseCurrencyTab/>;
          }
        else{
          tabinfo = <CategoryCreate/>;
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
                            onClick={()=>setTabState('catTab')}
                            style={Style2}
                            >
                            <div className="col-12 d-flex align-items-center">
                                <h6 className="text-white text-capitalize ps-3">Bundle Category</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="col-3">
                    <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                        <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                            onClick={()=>setTabState('bundles')}
                            style={Style2}>
                            <div className="col-12 d-flex align-items-center">
                                <h6 className="text-white text-capitalize ps-3">Bundles</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="col-3">
                    <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                        <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                            onClick={()=>setTabState('currency')}
                            style={Style2}>
                            <div className="col-12 d-flex align-items-center">
                                <h6 className="text-white text-capitalize ps-3">Currency</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="col-3">
                    <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                        <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                            onClick={()=>setTabState('base')}
                            style={Style2}>
                            <div className="col-12 d-flex align-items-center">
                                <h6 className="text-white text-capitalize ps-3">Bank Rate</h6>
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