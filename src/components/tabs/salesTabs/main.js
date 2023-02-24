import { Component } from "react";
import axios from "axios"
import SalesCreateForm from "./createSale/createSale";
import SalesTab from "./salesTable/salesTable";

const url = "http://localhost:8082/smart-wifi/user/"; // URL variable stores JSON url || API taken from 10 Degrees WordPress Agency

export default class SalesDetails extends Component{
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

    componentDidMount() {
        let setResp = this
        setResp.setState({loadingStatus: 'Loading client information...'})
        axios
            .get(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(({ data }) => {
                this.setState({
                    post: data.data,
                    allPosts: data.data, // array data from JSON stored in these
                    users: ''
                });
            })
            .catch(err => {
              this.setState({
                loadingStatus: "Sorry we encounterd an error, Please refresh page"
              })
            }
            );
    }

    openModal = () => this.setState({ isOpen: true });

    closeModal = () => this.setState({ isOpen: false });

    handleChange = (e) =>{
      this.setState(
        {
          [e.target.name] : e.target.value
        }
      )
    }

    handleUpdate = (e) =>{
      e.preventDefault()
      const {clientEmail, clientName} = this.state //send details to state
      const putData = {
        "active": true,
        "id": 1,
        "name": this.state.clientEmail,
        "email": this.state.clientName
      }
    }

    handleUpdate = (e) =>{
      const id = this.state.currencyId
      const putUrl = `http://localhost:8082/smart-wifi/user/${id}`
      e.preventDefault()
      const {userName, userEmail, userPhone} = this.state //send details to state
      const putData = {
        "active": this.state.selectedStatus,
        "id": parseInt(id),
        "name": this.state.userName,
        "email": this.state.userEmail,
        "phone": this.state.userPhone
      }

      const headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      }

      this.setState({
        updateStatus: 'Updating...'
      })

      axios.put(putUrl, putData, { headers })
      .then(response => {
        // alert(response.data.code)
        if(response.data.code === "SUCCESS"){
          alert("Record Update Success")
        this.setState({
          updateStatus: "Updated Successfuly"
        })
        this.refreshPage()
      }

      else{
        alert("Record Update Failed")
        this.setState({
          updateStatus: "Sorry! Update Failed"
        })
      }
      }
      )

    }


    render(){

        let tabinfo
        
        if (this.state.tabState === 'sale') {
          tabinfo = <SalesCreateForm/>;
        } 
        else if(this.state.tabState === 'report') {
          tabinfo = <SalesTab/>;
        }
        else{
          tabinfo = <SalesCreateForm/>;
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
                                tabState: 'sale'
                            })}
                            style={Style2}
                            >
                            <div className="col-6 d-flex align-items-center">
                                <h6 className="text-white text-capitalize ps-3">Sell Vouchers</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="col-6">
                    <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                        <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                            onClick={()=>this.setState({
                                tabState: 'report'
                            })}
                            style={Style2}>
                            <div className="col-6 d-flex align-items-center">
                                <h6 className="text-white text-capitalize ps-3">Sales Report</h6>
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