import { useState, useEffect } from "react";
import DeviceDetails from "./deviceTables/devicesTables";
import NetworksDetails from "./networkTables/networkDetails";
import OrganisationsDetails from "./organisationTable/organisationDetails";
import { useDispatch } from "react-redux";
import { fetchAsyncClientReports, fetchAsyncNetworkReports, fetchAsyncOrganisationReports } from "../../../store/report-slice";

export default function NewtorkManagement(){

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchAsyncClientReports())
  },[dispatch])
    
  const [tabState, setTabState] = useState('')

  let tabinfo
  
  if (tabState === 'devices') {
    tabinfo = <DeviceDetails/>;
  } 
  else if(tabState === 'organisations') {
    tabinfo = <OrganisationsDetails/>;
  }
  else if(tabState === 'networks') {
    tabinfo = <NetworksDetails/>;
  }
  else{
    tabinfo = <OrganisationsDetails/>;
  }

  return(
    <div>
      <div className="row">
          <div className="col-12">
              <div className="card my-4">
                  <div className="row">
                      <div className="col-4">
                          <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                              <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                  onClick={()=>setTabState('organisations')}
                                  style={Style2}
                                  >
                                  <div className="col-12 d-flex align-items-center">
                                    <i className="fas fa-eye text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                                    <h6 className="text-white text-capitalize ps-1">View Organisations</h6>
                                  </div>
                              </a>
                          </div>
                      </div>
                      <div className="col-4">
                          <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                              <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                  onClick={()=>setTabState('networks')}
                                  style={Style2}>
                                  <div className="col-12 d-flex align-items-center">
                                    <i className="fas fa-eye text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                                    <h6 className="text-white text-capitalize ps-1">View Networks</h6>
                                  </div>
                              </a>
                          </div>
                      </div>
                      <div className="col-4">
                          <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                              <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                  onClick={()=>setTabState('devices')}
                                  style={Style2}>
                                  <div className="col-12 d-flex align-items-center">
                                    <i className="fas fa-eye text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                                    <h6 className="text-white text-capitalize ps-1">View Connecting Devices</h6>
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