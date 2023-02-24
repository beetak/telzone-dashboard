import { Component } from "react";
import axios from "axios"
import BundlesTab from "./bundleTable/bundleTable";
import CategoryCreate from "./createBundle/createBundle";
import CurrencyDetails from "./currencyDetails/currencyDetails";
import BaseCurrencyTab from "./baseCurr/baseCurrency";

 // URL variable stores JSON url || API taken from 10 Degrees WordPress Agency

export default class CartDetails extends Component{
    state = {
        post: [],
        loadingStatus: '',
        allPosts: [],
        users: 'Loading Vouchers...',
        userEmail: '',
        userName: '',
        userPhone: '',
        isOpen: false,
        userDescription: '',
        userState: '',
        tabState: ''
    };

    render(){

        let tabinfo
        
        if (this.state.tabState === 'catTab') {
          tabinfo = <CategoryCreate/>;
        } 
        else if(this.state.tabState === 'bundles') {
          tabinfo = <BundlesTab/>;
        }
        else if(this.state.tabState === 'currency') {
          tabinfo = <CurrencyDetails/>;
        }
        else if(this.state.tabState === 'base') {
            tabinfo = <BaseCurrencyTab/>;
        }
        else{
          tabinfo = <CategoryCreate/>;
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
                            onClick={()=>this.setState({
                                tabState: 'catTab'
                            })}
                            style={Style2}
                            >
                            <div className="col-12 d-flex align-items-center">
                            <i className="fas fa-eye text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                                <h6 className="text-white text-capitalize ps-3">View Bundle Category</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="col-3">
                    <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                        <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                            onClick={()=>this.setState({
                                tabState: 'bundles'
                            })}
                            style={Style2}>
                            <div className="col-12 d-flex align-items-center">
                            <i className="fas fa-eye text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                                <h6 className="text-white text-capitalize ps-3">View Bundles</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="col-3">
                    <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                        <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                            onClick={()=>this.setState({
                                tabState: 'currency'
                            })}
                            style={Style2}>
                            <div className="col-12 d-flex align-items-center">
                            <i className="fas fa-eye text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                                <h6 className="text-white text-capitalize ps-3">View Currency</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="col-3">
                    <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                        <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                            onClick={()=>this.setState({
                                tabState: 'base'
                            })}
                            style={Style2}>
                            <div className="col-12 d-flex align-items-center">
                            <i className="fas fa-eye text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                                <h6 className="text-white text-capitalize ps-3">View Base Currency</h6>
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
}


const Style1={
  textAlign:"center"
}

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem",
    cursor: "pointer"
}