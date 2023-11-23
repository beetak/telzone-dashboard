import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { batchActions, getShow } from "../../../store/batch-slice";
import VoucherVerification from "../../Vouchers/VoucherVerification/VoucherVerification";
import FurtherDetails from "../../Vouchers/FurtherDetails/FurtherDetails";
import VoucherShopReport from "../../Vouchers/VoucherReport/VoucherShopReport";
import VoucherTotalSales from "../../Vouchers/VoucherReport/VoucherTotalSales";
import VoucherDailySales from "../../Vouchers/VoucherReport/VoucherDailySales";

export default function VoucherUsage(){

    const [tabState, setTabState] = useState("")
    const dispatch = useDispatch()
    const showMore = useSelector(getShow)

    let tabinfo
    
    
    if(tabState === 'shop') {
        tabinfo = <VoucherShopReport/>;
    }
    else if(tabState === 'sales') {
        tabinfo = <VoucherTotalSales/>;
    }
    else if(tabState === 'daily') {
        tabinfo = <VoucherDailySales/>;
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
        </>;
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
                                    onClick={()=>setTabState('verify')}
                                    style={Style2}
                                    >
                                    <div className="col-12 d-flex align-items-center">
                                        <h6 className="text-white text-capitalize ps-3">Voucher Verfification</h6>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                                <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                    onClick={()=>{
                                        setTabState('daily')
                                        dispatch(batchActions.clearVouchers())
                                    }}
                                    style={Style2}
                                    >
                                    <div className="col-12 d-flex align-items-center">
                                        <h6 className="text-white text-capitalize ps-3">Daily Sales</h6>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                                <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                    onClick={()=>setTabState('shop')}
                                    style={Style2}
                                    >
                                    <div className="col-12 d-flex align-items-center">
                                        <h6 className="text-white text-capitalize ps-3">Usage By Shop</h6>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                                <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                    onClick={()=>setTabState('sales')}
                                    style={Style2}
                                    >
                                    <div className="col-12 d-flex align-items-center">
                                        <h6 className="text-white text-capitalize ps-3">Total Sales</h6>
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


const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem",
    cursor: "pointer"
}