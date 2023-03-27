import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideNavigation from '../../components/NavBar/sideNav';
import TopNavigation from '../../components/NavBar/topNav';
import DailyReport from '../../components/SalesReport/DailyReport';
import { fetchAsyncBundles } from '../../store/bundle-slice';
import { fetchAsyncBusiness } from '../../store/business-slice';
import { fetchAsyncCurrency, getGlobalCurrency } from '../../store/currency-slice';
import { fetchAsyncSales, fetchAsyncSalesByAgent } from '../../store/sales-slice';
import { getStartTime } from '../../store/toggle-slice';
const userID = localStorage.getItem('userId')
export default function SalesAgent() {

  // const today = new Date()
  // const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
  // console.log("date: ", date)



  const dispatch = useDispatch()

  const curId = useSelector(getGlobalCurrency)
  const date = useSelector(getStartTime)

  useEffect(() => {
    dispatch(fetchAsyncSalesByAgent({curId, userID, date}))
    dispatch(fetchAsyncBundles(true))
    dispatch(fetchAsyncBusiness(true))
    dispatch(fetchAsyncCurrency(true))
  }, [dispatch, curId, date]);

  return (

    <div>
        {<SideNavigation/>}
        <main className="main-content position-relative max-height-vh-100 h-100 border-!radius-lg ">
            {<TopNavigation title={"Dashboard"}/>}
            <div className="container-fluid py-4">
                <DailyReport/>
            </div>
        </main>
    </div>
  );
}
