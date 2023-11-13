import { useEffect } from "react";
import axios from "axios"
import UserDetails from "./usersDetails/userDetails";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAsyncUser } from "../../../store/user-slice";
import { fetchAsyncRole } from "../../../store/role-slice";
import { fetchAsyncRegion, fetchAsyncShops, fetchAsyncTown } from "../../../store/entities-slice";

 // URL variable stores JSON url || API taken from 10 Degrees WordPress Agency

export default function UserManagement(){

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAsyncUser())
    dispatch(fetchAsyncRole())
    dispatch(fetchAsyncTown())
    dispatch(fetchAsyncShops())
    dispatch(fetchAsyncRegion())
  }, [dispatch]);
    
  return(
    <div>
      <div className="row">
          <div className="col-12">
              <div className="card my-4">
                  <div className="row">
                      <div className="col-5">
                          <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                              <div  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                  style={Style2}
                                  >
                                  <div className="col-12 d-flex align-items-center">
                                      <h6 className="text-white text-capitalize ps-3">View User Details</h6>
                                      <ul className="navbar-nav d-lg-block d-none ps-3" style={Style3}>
                                        <Link to="/profile" className="btn btn-sm mb-0 me-1 bg-gradient-dark">
                                          <i className='fa fa-undo' style={{fontSize: "10px", paddingRight: "10px"}}/>
                                          back to profile
                                        </Link>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive p-0">
                  <UserDetails/>
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
    paddinBottom: "0.5rem"
}
const Style3 ={
  position: "absolute",
  top: 0,
  right: 30
}