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
import PackageCreation from "../../../forms/packageCreation/package";
import BatchTable from "../../../tables/BatchTable";

const url = "http://localhost:8082/smart-wifi/bundle/"; // URL variable stores JSON url || API taken from 10 Degrees WordPress Agency
const urlCurrency = "http://localhost:8082/smart-wifi/currency";
const urlCategory = "http://localhost:8082/smart-wifi/product/category";

export default class BatchesTab extends Component{
   
    render(){
        return(

<div className="container-fluid">
  <div className="row">
    <div class="col-12 py-4">    
            <div className="position-relative mt-n4 mx-3 z-index-2 py-4" style={Style2}>
              <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                <h6 className="text-white text-capitalize ps-3">Voucher Batch Table</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <BatchTable/>
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
  paddinBottom: "0.5rem"
}