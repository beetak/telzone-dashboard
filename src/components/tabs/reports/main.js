import { Component } from "react";
import axios from "axios"
import BatchesTab from "./salesReports/batchTable";
import BatchCreateForm from "./createBatch/createBatch";

const url = "http://localhost:8082/smart-wifi/user/"; // URL variable stores JSON url || API taken from 10 Degrees WordPress Agency

export default class BundleDetails extends Component{
    state = {
        tabState: ''
    };

    render(){

        let tabinfo
        
        if (this.state.tabState === 'catTab') {
          tabinfo = <BatchCreateForm/>;
        } 
        else if(this.state.tabState === 'bundles') {
          tabinfo = <BatchesTab/>;
        }
        else{
          tabinfo = <BatchCreateForm/>;
        }

        return(
<div>
<div className="row">
    <div className="col-12">
        <div className="card my-4">
            <div className="row">
                <div className="col-6">
                    <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                        <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                            onClick={()=>this.setState({
                                tabState: 'catTab'
                            })}
                            style={Style2}
                            >
                            <div className="col-6 d-flex align-items-center">
                                <h6 className="text-white text-capitalize ps-3">Voucher Generation</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="col-6">
                    <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                        <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                            onClick={()=>this.setState({
                                tabState: 'bundles'
                            })}
                            style={Style2}>
                            <div className="col-6 d-flex align-items-center">
                                <h6 className="text-white text-capitalize ps-3">Voucher Batches</h6>
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


const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem",
    cursor: "pointer"
}