import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AdvertList from "../../components/Adverts/AdvertList/AdvertList";
import AdvertPost from "../../components/Adverts/AdvertPost/AdvertPost";
import SideNavigation from "../../components/NavBar/sideNav";
import TopNavigation from "../../components/NavBar/topNav";
import { fetchAsyncAdvert } from "../../store/adverts-slice";

const userRole = localStorage.getItem('role')

export default function Adverts(){
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchAsyncAdvert())
    }, [dispatch]);
    return(
        <div>
            {<SideNavigation/>}
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                {<TopNavigation title={"Adverts"}/>}
                <div className="container-fluid py-4">
                    <div className="row">
                        <div className={userRole==="Super Admin"? "col-lg-12": "col-lg-8"}>
                            <div className="row">                                
                                <div className="col-12">
                                    <div className="card my-4">
                                        <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                                        <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                                            <h6 className="text-white text-capitalize ps-3"><i className='fa fa-eye' style={{fontSize: "15px", paddingRight: "10px"}}/>Adverts Table</h6>
                                        </div>
                                        </div>
                                        <div className="card-body px-0 pb-2">
                                        <div className="table-responsive p-0">
                                            {<AdvertList/>}
                                        </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        {userRole==="Admin"? 
                            <div className="col-lg-4">
                                <div className="row">                                
                                    <div className="col-12">
                                        <div className="card my-4">
                                            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                                                <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                                                    <h6 className="text-white text-capitalize ps-3"><i className='fa fa-plus-circle' style={{fontSize: "15px", paddingRight: "10px"}}/>Create Adverts</h6>
                                                </div>
                                            </div>
                                            <div className="card-body px-0 pb-2">
                                                <div className="table-responsive p-0">
                                                    <AdvertPost/>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        : ""}
                    </div>
                </div>
            </main>
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