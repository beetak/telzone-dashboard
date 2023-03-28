import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideNavigation from '../../../components/NavBar/sideNav';
import TopNavigation from '../../../components/NavBar/topNav';
import SummarySales from '../../../components/SalesReport/SummarySales';
import { fetchAsyncCurrency, getGlobalCurrency, getGlobalSymbol } from '../../../store/currency-slice';
import { fetchAsyncPeriodicalPayments } from '../../../store/customerPayments-slice';
import { fetchAsyncSalesByCurrencyId } from '../../../store/sales-slice';
import { getEndTime, getStartTime } from '../../../store/toggle-slice';

export default function SPSalesReports() {
    const dispatch = useDispatch()

    const startDate = useSelector(getStartTime)
    const endDate = useSelector(getEndTime)
    const curId = useSelector(getGlobalCurrency)
    const curSymbol = useSelector(getGlobalSymbol)
    
    useEffect(() => {
        dispatch(fetchAsyncCurrency(true))
        dispatch(fetchAsyncSalesByCurrencyId({startDate, endDate, curId}))
        dispatch(fetchAsyncPeriodicalPayments({startDate, endDate, curSymbol}))
    }, [dispatch, startDate, endDate, curId]);

    return (
        <div>
            {<SideNavigation/>}
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                {<TopNavigation title={"Sales Reports"}/>}
                <div className="container-fluid py-4">
                    <SummarySales/>
                </div>
            </main>
        </div>
    );
}
