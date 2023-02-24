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
import BatchPost from "../../../Batches/BatchPost/BatchPost";
import BatchPostResponse from "../../../Batches/BatchPostResponse/BatchPostResponse";

const url = "http://localhost:8082/smart-wifi/bundle/"; // URL variable stores JSON url || API taken from 10 Degrees WordPress Agency
const urlCurrency = "http://localhost:8082/smart-wifi/currency";
const urlCategory = "http://localhost:8082/smart-wifi/product/category";

export default function BatchCreateForm(){
    
    
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
                <BatchPostResponse/>
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
                <BatchPost/>
              </div>
            </div>
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