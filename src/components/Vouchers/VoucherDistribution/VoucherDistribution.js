import React, {useState} from 'react';
import DistributionList from '../DistributionList/DistributionList';
import DistributionInbox from '../DustributionInbox/DistributionInbox';

export default function VoucherDistribution() {
    const [tabState, setTabState] = useState('')

        let tabinfo
        
        if (tabState === 'request') {
          tabinfo = '';
        } 
        else if(tabState === 'actioned') {
          tabinfo = <DistributionList/>;
        }
        else if(tabState === 'inbox') {
          tabinfo = <DistributionInbox/>;
        }
        else{
          tabinfo = '';
        }
  return (
    <>
        <div className='col-2 pb-1'>
            <div className="col-12">
                <div className="position-relative z-index-2" style={Style2}>
                    <a  className="row bg-gradient-primary shadow-primary border-radius-lg" 
                        onClick={()=>setTabState('request')}
                        style={Style2}
                        >
                        <div className="d-flex align-items-center">
                            <h6 className="text-white text-capitalize ps-3">Request Creation</h6>
                        </div>
                    </a>
                </div>
            </div>
            <div className="col-12">
                <div className="position-relative z-index-2" style={Style2}>
                    <a  className="row bg-gradient-primary shadow-primary border-radius-lg" 
                        onClick={()=>setTabState('inbox')}
                        style={Style2}>
                        <div className="d-flex align-items-center">
                            <h6 className="text-white text-capitalize ps-3">Inbox</h6>
                        </div>
                    </a>
                </div>
            </div>
            <div className="col-12">
                <div className="position-relative z-index-2" style={Style2}>
                    <a  className="row bg-gradient-primary shadow-primary border-radius-lg" 
                        onClick={()=>setTabState('actioned')}
                        style={Style2}>
                        <div className="d-flex align-items-center">
                            <h6 className="text-white text-capitalize ps-3">Actioned</h6>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div className='col-10 mb-1 mt-1'>
            <div className="card h-100">
                <div className="card-body p-3">
                    <div className="table-responsive p-0">
                        {tabinfo}
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem",
    cursor: "pointer"
}