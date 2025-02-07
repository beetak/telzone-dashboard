import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideNavigation from '../../../components/NavBar/sideNav';
import TopNavigation from '../../../components/NavBar/topNav';
import SupervisorReportDetails from '../../../components/tabs/supervisorTabs/main';
import { fetchAsyncCurrency, getGlobalCurrency, getGlobalSymbol } from '../../../store/currency-slice';
import { saleActions } from '../../../store/sales-slice';
import { getAgentId, getEndTime, getStartTime } from '../../../store/toggle-slice';
import { fetchAsyncShopAgents, getGlobalUser } from '../../../store/user-slice';

const shopId = localStorage.getItem('shopId')

export default function SPSalesReports() {
    const dispatch = useDispatch()

    const userID = useSelector(getGlobalUser)

    const startDate = useSelector(getStartTime)
    const endDate = useSelector(getEndTime)
    const curId = useSelector(getGlobalCurrency)
    const curSymbol = useSelector(getGlobalSymbol)
    const agentId = useSelector(getAgentId)
    
    useEffect(() => {
        dispatch(fetchAsyncCurrency(true))
        dispatch(fetchAsyncShopAgents({roleId:3, shopId}))
        dispatch(saleActions.clearSales())
    }, [dispatch, startDate, endDate, curId, userID]);

    return (
        <div>
            {<SideNavigation/>}
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                {<TopNavigation title={"Sales Reports"}/>}
                <div className="container-fluid py-4">
                    <SupervisorReportDetails/>
                </div>
            </main>
        </div>
    );
}
