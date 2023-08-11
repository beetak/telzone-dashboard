import React, {useEffect} from 'react';
import SideNavigation from '../../components/NavBar/sideNav';
import TopNavigation from '../../components/NavBar/topNav';
import { useDispatch } from 'react-redux';
import { fetchAsyncClients } from '../../store/clients-slice';
import SummarySalesCustomer from '../../components/SalesReport/SummarySalesCustomer';

export default function Customers() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAsyncClients())
      }, [dispatch]);
  return (
    <div>
        {<SideNavigation/>}
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            {<TopNavigation title={"Business Reports"}/>}
            <div className="container-fluid py-4">
                <SummarySalesCustomer/>
            </div>
        </main>
    </div>
  );
}
