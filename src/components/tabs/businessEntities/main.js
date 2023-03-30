import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShopDetails from "./shopDetails/shopDetails";
import TownDetails from "./townDetails/townDetails";
import RegionDetails from "./regionDetails/regionDetails";
import RoleDetails from "./roleDetails/roleDetails";
import { fetchAsyncRegion, fetchAsyncRole, fetchAsyncShop, fetchAsyncTown } from "../../../store/entities-slice";
import { getToggleStatus } from "../../../store/toggle-slice";

const url = "http://localhost:8082/smart-wifi/user/"; // URL variable stores JSON url || API taken from 10 Degrees WordPress Agency

export default function BusinessEntities(){

    const[tabState, setTabState] = useState('')
    const active = useSelector(getToggleStatus)

    const dispatch = useDispatch()
    
    useEffect(() => {
      dispatch(fetchAsyncTown())
      dispatch(fetchAsyncShop())
      dispatch(fetchAsyncRegion())
      dispatch(fetchAsyncRole())
    }, [dispatch, active]);

    let tabinfo
    
    if (tabState === 'shops') {
      tabinfo = <ShopDetails/>;
    } 
    else if(tabState === 'towns') {
      tabinfo = <TownDetails/>;
    }
    else if(tabState === 'regions') {
      tabinfo = <RegionDetails/>;
    }
    else if(tabState === 'roles') {
      tabinfo = <RoleDetails/>;
    }
    else{
      tabinfo = <ShopDetails/>;
    }

    return(
    <>
      <div className="row">
          <div className="col-12">
              <div className="card my-4">
                  <div className="row">
                      <div className="col-3">
                          <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                              <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                  onClick={()=>setTabState('shops')}
                                  style={Style2}>
                                  <div className="col-12 d-flex align-items-center">
                                    <div className="text-white text-center me-2 pb-2 d-flex align-items-center justify-content-center">
                                      <i className="material-icons opacity-10">store</i>
                                    </div>
                                    <h6 className="text-white text-capitalize ps-1">Shops</h6>
                                  </div>
                              </a>
                          </div>
                      </div>
                      <div className="col-3">
                          <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                              <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                  onClick={()=>setTabState('towns')}
                                  style={Style2}>
                                  <div className="col-12 d-flex align-items-center">
                                    <div className="text-white text-center me-2 pb-2 d-flex align-items-center justify-content-center">
                                      <i className="material-icons opacity-10">home</i>
                                    </div>
                                      <h6 className="text-white text-capitalize ps-1">Towns</h6>
                                  </div>
                              </a>
                          </div>
                      </div>
                      <div className="col-3">
                          <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                              <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                  onClick={()=>setTabState('regions')}
                                  style={Style2}>
                                  <div className="col-12 d-flex align-items-center">
                                    <div className="text-white text-center me-2 pb-2 d-flex align-items-center justify-content-center">
                                      <i className="material-icons opacity-10">public</i>
                                    </div>
                                      <h6 className="text-white text-capitalize ps-1">Regions</h6>
                                  </div>
                              </a>
                          </div>
                      </div>
                      <div className="col-3">
                          <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                              <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                  onClick={()=>setTabState('roles')}
                                  style={Style2}>
                                  <div className="col-12 d-flex align-items-center">
                                    <div className="text-white text-center me-2 pb-2 d-flex align-items-center justify-content-center">
                                      <i className="material-icons opacity-10">groups</i>
                                    </div>
                                      <h6 className="text-white text-capitalize ps-1">User Roles</h6>
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
      </>
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