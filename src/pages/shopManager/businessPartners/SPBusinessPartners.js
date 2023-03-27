import React from 'react';
import BusinessPartnerPost from '../../../components/BusinessPartner/BusinessPartnerPost/BusinessPartnerPost';
import SideNavigation from '../../../components/NavBar/sideNav';
import TopNavigation from '../../../components/NavBar/topNav';
import BusinessPartnerDetails from '../../../components/tabs/businessReports/busPartnerDetails/busPartnerDetails';

export default function SPBusinessPartners() {
  return (
    <div>
        {<SideNavigation/>}
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            {<TopNavigation title={"Business Partners"}/>}
            <div className="container-fluid py-4">
                <BusinessPartnerDetails/>
            </div>
        </main>
    </div>
  );
}

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem"
}