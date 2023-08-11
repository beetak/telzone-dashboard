import React, {useState} from 'react';
import VoucherManagement from './voucherManTab/VoucherManagement';
import VoucherVerificationTab from './voucherVerification/VoucherVerificationTab';

export default function VouchersMain() {
    const [tabState, setTabState] = useState('')

    let tabinfo
    
    if (tabState === 'vouchers') {
      tabinfo = <VoucherManagement/>;
    } 
    else if(tabState === 'verification') {
      tabinfo = <VoucherVerificationTab/>;
    }
    else{
      tabinfo = <VoucherVerificationTab/>;
    }

    return(
    <div>
        <div className="row">
            <div className="col-12">
                <div className="card my-4">
                    <div className="row">
                        <div className="col-3">
                            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                                <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                    onClick={()=>setTabState('verification')}
                                    style={Style2}
                                    >
                                    <div className="col-12 d-flex align-items-center">
                                        <h6 className="text-white text-capitalize ps-3">Voucher Verification</h6>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                                <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                    onClick={()=>setTabState('vouchers')}
                                    style={Style2}>
                                    <div className="col-12 d-flex align-items-center">
                                        <h6 className="text-white text-capitalize ps-3">Voucher Distribution</h6>
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
    )
}
const Style1={
    textAlign:"center"
}

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem",
    cursor: "pointer"
}