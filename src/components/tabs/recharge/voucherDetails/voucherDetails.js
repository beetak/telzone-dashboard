import { Component } from "react";
import axios from "axios"
import Modal from 'react-bootstrap/Modal'
import { Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup'
import { FormControl } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown'
import { DropdownButton } from "react-bootstrap";
import { ButtonGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import VoucherGenForm from "../../../forms/voucherGeneration";
import VoucherGenResponse from "../../../forms/voucherGenResponse";

const url = "http://localhost:8082/smart-wifi/bundle/"; // URL variable stores JSON url || API taken from 10 Degrees WordPress Agency
const urlCurrency = "http://localhost:8082/smart-wifi/currency";
const urlCategory = "http://localhost:8082/smart-wifi/product/category";

export default class VoucherDetails extends Component{
    state = {
      post: [],
      currency: [],
      category: [],
      currencyID: '',
      categoryID: '',
      loadingStatus: '',
      loadingCur: '',
      loadingCat: '',
      products: 'Loading Vouchers...',
      productImage: '',
      voucherName: '',
      voucherPrice: '',
      voucherId: '',
      voucherDescription: '',
      active: '',
      activeState: '',
      currencyIDState: '',
      isOpen: false,
      selectedStatus: '',
      toggleStatus: true,
      policyLoadingState: '',
      policyById: ''
    };

    componentDidMount() {
        this.getVouchers()
        this.getCurrency()
        this.getCategory()
    }
    
    getVouchers = () => {
      const url = `http://localhost:8082/smart-wifi/bundle/`;
      let setResp = this
      setResp.setState({loadingStatus: 'Loading packages information...'})
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
              policyID: data.data.groupPolicyId, // array data from JSON stored in these
              loadingStatus: ''
          });
      })
      .catch(err => {
        this.setState({
          loadingStatus: "Sorry we encounterd an error, Please refresh page"
        })
      });
    }

    getCategory = () => {
      let setResp = this
      setResp.setState({loadingCur: 'Loading ...'})
      axios
      .get(urlCategory, {
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          }
      })
      .then(({ data }) => {
          this.setState({
              category: data.data,
              loadingCur: ''
          });
      })
      .catch(err => {
        this.setState({
          loadingCur: "Not Found"
        })
      });
    }

    getCurrency = () => {
      let setResp = this
      setResp.setState({loadingCur: 'Loading ...'})
      axios
      .get(urlCurrency, {
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          }
      })
      .then(({ data }) => {
          this.setState({
              currency: data.data,
              loadingCur: ''
          });
      })
      .catch(err => {
        this.setState({
          loadingCur: "Not Found"
        })
      });
    }

    handleUpdate = (e) =>{
      const id = this.state.voucherId
      const putUrl = `http://localhost:8082/smart-wifi/product/${id}`
      e.preventDefault()
      const {voucheryName, voucherDescription, voucherPrice} = this.state //send details to state
      const putData = {        
        "categoryID": this.state.categoryID,
        "currencyID": this.state.currencyID,
        "product": {
          "active": this.state.selectedStatus,
          "description": this.state.voucherDescription,
          "id": parseInt(id),
          "name": this.state.voucherName,
          "price": this.state.voucherPrice
        },
        "productPictureDTO": {
          "name": "string",
          "picByte": "string",
          "type": "string"
        }        
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

    refreshPage = () => {
      // window.location.reload();
      this.setState({
        updateStatus: ''
      })
      this.componentDidMount()
    }

    handleChange = (e) =>{
      this.setState(
        {
          [e.target.name] : e.target.value
        }
      )
    }
    openModal = () => this.setState({ isOpen: true });

    closeModal = () => this.setState({ isOpen: false });
    render(){
        return(

<div className="container-fluid">
  <div className="row">
    <div class="col-lg-8 py-4">                
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
              <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                <h6 className="text-white text-capitalize ps-3">Voucher Generation Response</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <VoucherGenResponse/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4 py-4">                
      <div className="row">
        <div className="col-12">
        <div className="card my-4">
            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
              <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                <h6 className="text-white text-capitalize ps-3">Generate Vouchers</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <VoucherGenForm/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* <Button variant="primary" onClick={this.openModal}>Launch demo modal</Button> */}
<Modal show={this.state.isOpen} onHide={this.closeModal}>

<Modal.Header closeButton>

<Modal.Title>Currency Update</Modal.Title>

</Modal.Header>

<Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Voucher Name</InputGroup.Text>
          <FormControl
            // value={this.state.currencyName}
            aria-label="Username"
            aria-describedby="basic-addon1"
            defaultValue = {this.state.voucherName}
            name = "voucherName"
            onChange = {this.handleChange}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">Voucher Price</InputGroup.Text>
          <FormControl
            // value={this.state.currencySymbol}
            aria-label="Username"
            aria-describedby="basic-addon2"
            defaultValue = {this.state.voucherPrice}
            name = "voucherPrice"
            onChange = {this.handleChange}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">Voucher Description</InputGroup.Text>
          <FormControl
            // value={this.state.currencySymbol}
            aria-label="Username"
            aria-describedby="basic-addon2"
            defaultValue = {this.state.voucherDescription}
            name = "voucherDescription"
            onChange = {this.handleChange}
          />
        </InputGroup>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {this.state.VoucherCategory}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {this.state.category.map((car, index) => (
              <li>
                <Dropdown.Item 
                  onClick={(e)=>{
                    e.preventDefault()
                    this.setState({
                        categoryID: car.id,
                        VoucherCategory: car.name
                    })
                  }}>
                  {car.name}
                </Dropdown.Item>
              </li>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {this.state.VoucherCurrency}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {this.state.currency.map((cur, index) => (
              <li>
                <Dropdown.Item 
                  onClick={(e)=>{
                    e.preventDefault()
                    this.setState({
                        currencyID: cur.id,
                        VoucherCurrency: cur.name
                    })
                  }}>
                  {cur.name}
                </Dropdown.Item>
              </li>
            ))}
          </Dropdown.Menu>
        </Dropdown>


      <Dropdown as={ButtonGroup}>
<Button variant="success">{this.state.activeState}</Button>

<Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

<Dropdown.Menu>
<Dropdown.Item 
onClick={
  () => {
    this.setState(
      {
        selectedStatus: true,
        activeState: 'Active'
      }
    )
  }
}
>Active
</Dropdown.Item>
<Dropdown.Item
onClick={
  () => {
    this.setState(
      {
        selectedStatus: false,
        activeState: 'Deactivated'
      }
    )
  }
}
>
Deactivate</Dropdown.Item>
</Dropdown.Menu>
</Dropdown>
      <p>{this.state.updateStatus}</p>
      <Button variant="primary" onClick={this.handleUpdate}>Update</Button>
</Modal.Body>

<Modal.Footer>

<Button variant="secondary" onClick={this.closeModal}>

  Close

</Button>

</Modal.Footer>

</Modal>
</div>

        )
    }
}

const Style1={
  textAlign:"center"
}

const Position ={
  position: "absolute",
  right: 0
}

const Search ={
  top: "-10px",
}

const TableRow ={
  lineHeight: "10px",
  paddingBottom: "0"
}

const thHeight = {
  padding: "0.1rem 1.5rem"
}
const Style2={
  paddingTop: "1rem",
  paddinBottom: "0.5rem"
}