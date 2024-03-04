import { Component } from "react";
import { useSelector } from "react-redux";
import SideNavigation from "../../components/NavBar/sideNav";
import BatchVoucherDetails from "../../components/tabs/batchTabs/batchVoucherMain";
import BatchDetails from "../../components/tabs/batchTabs/main";
import TopNavigation from "../../components/NavBar/topNav";
import { viewVouchers, voucherViewStatus } from "../../store/batch-slice";
import { BeatLoader } from "react-spinners";

const userRole = localStorage.getItem('role')

export default function BatchList () {

    const batchVouchers = useSelector(viewVouchers)
    const voucherView = useSelector(voucherViewStatus)


    let loadingAnimation = 
    <div className='text-center' style={anime}>
        <h5 style={{color: '#055bb5'}}>Loading Vouchers</h5>
        <BeatLoader
            color={'#055bb5'}
            loading={voucherView}
            cssOverride={override}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>

    let errorMsg =  
    <div className='text-center'>
      <h5 style={{color: '#E91E63'}}>Opps something went wrong. Please refresh page</h5>
    </div>

    
    return(
        <div>
            {<SideNavigation/>}
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                {<TopNavigation title={"Batches"}/>}
                <div className="container-fluid py-4">
                    {
                        voucherView === 'idle' && userRole === 'Admin'? 
                            <BatchDetails/>
                            :(voucherView === 'pending' && userRole === 'Admin'?
                                loadingAnimation
                            :(voucherView === 'fulfilled' && userRole === 'Admin'?
                                <BatchVoucherDetails/>
                                :(voucherView === 'rejected' && userRole === 'Admin'?
                                    errorMsg:''
                                )
                            ))
                    }
                </div>
            </main>
        </div>
    )
}

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "blue",
  };
  
  const anime = {
    textAlign: 'center', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%', 
    height: '10vh',
    position: 'fixed', /* or absolute */
    top: '50%',
    left: '10%',
  }
