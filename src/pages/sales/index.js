import { useEffect } from "react";
import SideNavigation from "../../components/NavBar/sideNav";
// import SalesDetails from "../../components/tabs/salesTabs/main";
import TopNavigation from "../../components/NavBar/topNav";
import CartBundleList from "../../components/ShoppingCart/CartBundleList/CartBundleList";
import CartItems from "../../components/ShoppingCart/CartItems/CartItems";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncBundles } from "../../store/bundle-slice";
import { fetchAsyncBusiness } from "../../store/business-slice";
import { fetchAsyncSales } from "../../store/cart-slice";
import { getToggleStatus } from "../../store/toggle-slice";
import { fetchAsyncCurrency } from "../../store/currency-slice";

export default function Sales () {
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

    const dispatch = useDispatch()
    const active = true

    useEffect(() => {
      dispatch(fetchAsyncBundles(active))
      dispatch(fetchAsyncBusiness(active))
      dispatch(fetchAsyncSales())
      dispatch(fetchAsyncCurrency(active))
    //   dispatch(fetchAsyncSoldVouchers())
    }, [dispatch]);

    return(
        <div>
            {<SideNavigation/>}
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                {<TopNavigation title={"Sales"}/>}
                <div className="container-fluid py-4">
                    <div className="container-fluid">
                        <div className="row">
                            <CartBundleList/>
                            <CartItems/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}