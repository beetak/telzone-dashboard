import React, {useEffect} from 'react';
import SideNavigation from '../../components/NavBar/sideNav';
import TopNavigation from '../../components/NavBar/topNav';
import { useDispatch } from 'react-redux';
import { fetchAsyncClients } from '../../store/clients-slice';
import SummarySalesCommission from '../../components/SalesReport/SummarySalesCommision';
import { saleActions } from '../../store/sales-slice';
import SummaryTaxes from '../../components/SalesReport/SummaryTaxes';

export default function TaxReport() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAsyncClients())
        dispatch(saleActions.clearSales())
    }, [dispatch]);
    return (
        <div>
            {<SideNavigation/>}
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                {<TopNavigation title={"Business Reports"}/>}
                <div className="container-fluid py-4">
                    <SummaryTaxes/>
                </div>
            </main>
        </div>
    );
}
