import { useEffect, useState } from "react";
import SideNavigation from "../../components/NavBar/sideNav";
import TopNavigation from "../../components/NavBar/topNav";
import CartBundleList from "../../components/ShoppingCart/CartBundleList/CartBundleList";
import CartItems from "../../components/ShoppingCart/CartItems/CartItems";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncBundles } from "../../store/bundle-slice";
import { fetchAsyncBusiness } from "../../store/business-slice";
import { fetchAsyncCurrency } from "../../store/currency-slice";
import FocList from "../../components/ShoppingCart/FocList/FocList";
import FocItems from "../../components/ShoppingCart/FocItems/FocItems";
import { fetchAsyncFoc } from "../../store/foc-slice";
import { fetchAsyncUser } from "../../store/user-slice";

export default function Sales ({page}) {
    // return(
    //     <div>
    //         {<SideNavigation/>}
    //         <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    //             {<TopNavigation title={"Sales"}/>}
    //             <div className="container-fluid py-4">
    //                 <SalesDetails/>
    //             </div>
    //         </main>
    //     </div>
    // )
    
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
    else{
        tabinfo = <>
            <div className="row">
                <CartBundleList pageType="foc-sales"/>
                <FocItems/>
            </div>
        </>;
    }

    return(
        <div>
            {<SideNavigation/>}
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                {<TopNavigation title={"Sales"}/>}
                { 
                    page === 'sales' &&
                    <div className="container-fluid py-4">
                        <div className="container-fluid">
                            <div className="row">
                                <CartBundleList pageType="sales"/>
                                <CartItems/>
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