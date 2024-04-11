import { useEffect, useState } from "react";
import SideNavigation from "../../components/NavBar/sideNav";
import TopNavigation from "../../components/NavBar/topNav";
import CartBundleList from "../../components/ShoppingCart/CartBundleList/CartBundleList";
import CartItems from "../../components/ShoppingCart/CartItems/CartItems";
import { useDispatch } from "react-redux";
import { fetchAsyncBundles } from "../../store/bundle-slice";
import { fetchAsyncBusiness } from "../../store/business-slice";
import { fetchAsyncCurrency } from "../../store/currency-slice";
import FocList from "../../components/ShoppingCart/FocList/FocList";
import FocItems from "../../components/ShoppingCart/FocItems/FocItems";
import { fetchAsyncFoc } from "../../store/foc-slice";
import { fetchAsyncUser } from "../../store/user-slice";
import BulkVoucherPost from "../../components/Vouchers/BulkVoucherPost/BulkVoucherPost";
import BulkPostResponse from "../../components/Batches/BatchPostResponse/BulkPostResponse";

const userShop = localStorage.getItem('shopName')

export default function Sales ({page}) {
    
    const[tabState, setTabState] = useState('')

    const dispatch = useDispatch()
    const active = true

    useEffect(() => {
      dispatch(fetchAsyncBundles(active))
      dispatch(fetchAsyncBusiness(active))
      dispatch(fetchAsyncFoc())
      dispatch(fetchAsyncCurrency(active))
      dispatch(fetchAsyncUser())
    }, [dispatch]);

    const BulkSale = () => {
        return <>
            <div className="row mx-4">
                <div class="col-lg-6 py-4">                
                    <div className="row">
                        <div className="col-12">
                            <div className="card my-4">
                                <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                                    <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                                        <h6 className="text-white text-capitalize ps-3">Voucher Distribution Response</h6>
                                    </div>
                                </div>
                                <div className="card-body px-0 pb-2">
                                    <div className="table-responsive p-0">
                                        <BulkPostResponse/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 py-4">                
                    <div className="row">
                        <div className="col-12">
                            <div className="card my-4">
                                <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                                    <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                                        <h6 className="text-white text-capitalize ps-3">Bulk SMS Voucher Distribution</h6>
                                    </div>
                                </div>
                                <div className="card-body px-0 pb-2">
                                    <div className="p-0">
                                        <BulkVoucherPost/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>          
            </div>
        </>
    }

    let tabinfo
    
    if (tabState === 'sales') {
        tabinfo = <>
            <div className="row">
                <CartBundleList page="foc-sales"/>
                <FocItems/>
            </div>
        </>;
    } 
    else if(tabState === 'table') {
        tabinfo = <FocList/>;
    }
    else if(tabState === 'bulk') {
        tabinfo = BulkSale();
    }
    else if(tabState === 'tcflSales'){
        tabinfo = 
        <div className="container-fluid">
            <div className="row">
                <CartBundleList pageType="sales"/>
                <CartItems/>      
            </div>
        </div>
    }
    else{
        tabinfo = 
        <div className="container-fluid">
            <div className="row">
                <CartBundleList pageType="sales"/>
                <CartItems/>      
            </div>
        </div>
    }

    return(
        <div>
            {<SideNavigation/>}
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                {<TopNavigation title={"Sales"}/>}
                { 
                    page === 'sales' && userShop !== "TCFL" ?
                    <div className="container-fluid py-4">
                        <div className="container-fluid">
                            <div className="row">
                                <CartBundleList pageType="sales"/>
                                <CartItems/>      
                            </div>
                        </div>
                    </div>:
                    <div className="container-fluid m py-4">
                        <div className="col-12">
                            <div className="card my-4">
                                <div className="row">
                                    <div className="col-3">
                                        <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                                            <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                                onClick={()=>setTabState('tcflSales')}
                                                style={Style2}>
                                                <div className="col-12 d-flex align-items-center">
                                                    <h6 className="text-white text-capitalize ps-3">POS Distribution</h6>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                                            <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                                onClick={()=>setTabState('bulk')}
                                                style={Style2}>
                                                <div className="col-12 d-flex align-items-center">
                                                    <h6 className="text-white text-capitalize ps-3">SMS Distribution</h6>
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
                }
                { 
                    page === 'foc-report' &&
                    <div className="container-fluid py-4">
                        <div className="container-fluid">
                            <div className="row">
                                <FocList/>
                            </div>
                        </div>
                    </div>
                }
                { 
                    page === 'foc-sales' &&
                    <div className="container-fluid py-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card my-4">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                                                    <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                                        onClick={()=>setTabState('sales')}
                                                        style={Style2}>
                                                        <div className="col-12 d-flex align-items-center">
                                                            <i className="fas fa-eye text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                                                            <h6 className="text-white text-capitalize ps-1">FOC Sale</h6>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                                                    <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                                        onClick={()=>setTabState('table')}
                                                        style={Style2}>
                                                        <div className="col-12 d-flex align-items-center">
                                                        <div className="text-white text-center me-2 pb-2 d-flex align-items-center justify-content-center">
                                                            <i className="material-icons opacity-10">groups</i>
                                                        </div>
                                                            <h6 className="text-white text-capitalize ps-1">Report</h6>
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
                }
            </main>
        </div>
    )
}

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem",
    cursor: "pointer"
}