import React from 'react';
import VouchersMain from '../../../components/tabs/supervisorTabs/vouchersMain';
import SideNavigation from '../../../components/NavBar/sideNav';
import TopNavigation from '../../../components/NavBar/topNav';

export default function SPVoucherManagement() {
    return (
        <div>
            {<SideNavigation/>}
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                {<TopNavigation title={"Voucher Management"}/>}
                <div className="container-fluid py-4">
                    <VouchersMain/>
                </div>
            </main>
        </div>
    );
}
