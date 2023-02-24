import { useState, useEffect } from "react";
import "jspdf-autotable";
import Bundles from "../bundles";
import CartItem from "../CartItem";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import jsPDF from 'jspdf'
import "jspdf-autotable";
import voucher_codes, { generate } from 'voucher-code-generator'
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import { Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup'
import { FormControl } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown'
import { DropdownButton } from "react-bootstrap";
import { ButtonGroup, Form } from "react-bootstrap";
import ProceedToPay from "./proceedToPay";
import { cartActions, fetchAsyncSales, getAllSales, postSale } from "../../store/cart-slice";

const img = "assets/img/telonelogo.png"
const userRole = localStorage.getItem('role')
// const paymentBtn = localStorage.getItem('paymentbtn')

const firstname = localStorage.getItem('firstname')
const surname = localStorage.getItem('surname')
var bpname = ''
var bpemail = ''

const globalUrl = "http://localhost:8082/smart-wifi/"

var CryptoJS = require("crypto-js");

var lastSale = ''

const ShoppingCart =()=>{
  
  const cartItems = useSelector((state) => state.cart.itemsList);
  const [loadingState, setLoadingState] = useState('')
  const [businessPartner, setBusinessPartner] = useState('')
  const [businessPartnerName, setBusinessPartnerName] = useState('Business Partner')
  const [businessPartnerEmail, setBusinessPartnerEmail] = useState('')
  const [business, setBusiness] = useState([])
  const [businessPartnerLoading, setbusinessPartnerLoading] =useState('')
  const [response, setResponse] = useState('')
  const [updateState, setUpdateState] = useState(false)
  const [lastSaleId, setLastSaleId] = useState([])
  const [sales, setSales] = useState([])

  let total = 0;
  const itemsList = useSelector((state) => state.cart.itemsList);

  itemsList.forEach((item) => {
    total += item.totalPrice;
  });

  const dispatch = useDispatch()
  
  useEffect(() => {
    getBusinessPartner()
    getSales()
    dispatch(fetchAsyncSales())
  }, []);

  const allSales = useSelector(getAllSales)

  let renderedSales
  renderedSales = allSales ? (
    lastSale = [allSales.length-1]
  ):(lastSale="not found")

  const getBusinessPartner = ()=>{
    console.log(allSales)
      const url = `http://localhost:8082/smart-wifi/business/`; // URL variable stores JSON url || API taken from 10 Degrees WordPress Agency
      setbusinessPartnerLoading('Loading ...')
      axios
      .get(url, {
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          }
      })
      .then(({ data }) => {
        setBusiness(data.data)
        setbusinessPartnerLoading('')
      })
      .catch(err => {
        setbusinessPartnerLoading('Error')
      });
    }

    const getSales = () =>{
      const url = globalUrl+`/payment/`
      axios 
        .get(url,{
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          }
        })
        .then(({data})=>{
          var count = Object.keys(data.data).length
                if(count<=0){
                    alert("No batches ")
                }
                else{
                    setSales(data.data)
                    setLastSaleId(data.data[data.data.length-1].id)
                    console.log("Sale Id: ", lastSaleId)
                    // lastBatch = this.state.batches[this.state.batches.length - 1];
                    // console.log("last: ",lastElement)
                }
        })
        .catch(err=>{
          console.log(err)
        })
    }

    const handleVoucherUpdate = () =>{
      const salesId = lastSaleId
      const id = 1
      const putUrl = `http://localhost:8082/smart-wifi/voucher/${id}`
      const putData = {
        "approved": 0,
        "approvedBy": 0,
        "id": 1,
        "isBlocked": true
      }

      const headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      }

      setUpdateState('Updating...')

      axios.put(putUrl, putData, { headers })
        .then(response => {
          // alert(response.data.code)
          if(response.data.code === "SUCCESS"){
            alert("Record Update Success")
            setUpdateState('Update Successful')
          }

          else{
            alert("Record Update Failed")
            setUpdateState('Sorry Update Failed')
          }
        })
    }

    const makeSale = async (e) => {
      e.preventDefault();
      dispatch(postSale({
        "customerID": businessPartner,
        "payments": {
          "amountPaid": total,
          "datePaid": "2022-11-14T07:33:21.119Z",
          "location": "string",
          "paying_account": '0771111111'
        }
      }));
    };

    const updateVouchers = async () => {

    }

    const getVouchers = async () => {
      
    }

    const printReceipt = () =>{
      
    }

    // const generateSale = () =>{
    //   const url = globalUrl + `payments/`
    //   axios
    //     .post(url,{
    //       "customerID": businessPartner,
    //       "payments": {
    //         "amountPaid": total,
    //         "datePaid": "2022-11-14T07:33:21.119Z",
    //         "location": "Runhare",
    //         "paying_account": '077777777'
    //       }
    //     })
    //     .then(({data})=>{
    //       getSales()
    //     })
    //     .catch(err=>{
    //       console.log(err)
    //     })
    // }
    
    return(
      <>
      <div className="container-fluid">
        <div className="row">
          <div class="col-lg-5">                
            <div className="row">
              <div className="col-12  py-4">
                <div className="card my-4">
                  <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                    <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                      <h6 className="text-white text-capitalize ps-3">Product Shop{lastSale}</h6>
                    </div>
                  </div>
                  <div className="card-body px-0 pb-2">
                    <div className="table-responsive p-0">
                    <p style={Style1}>{loadingState}</p>

                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{width: "5%"}}>Product</th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Price</th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ">Add To Cart</th>
                        </tr>
                      </thead>
                      <tbody>
                        <Bundles/>
                      </tbody>
                    </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-7 py-4">                
            <div className="row">
              <div className="col-12">
                <div className="card my-4">
                  <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                    <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                      <h6 className="text-white text-capitalize ps-3">Generate Sale <span style={{float: 'right'}}>Total Price: ${(Math.round(total * 100) / 100).toFixed(2)}</span></h6>
                    </div>
                  </div>
                  <div className="card-body px-0 pb-2">
                    <div className="table-responsive p-0">
                    <div className="p-4">
                        <div className="input-group input-group-dynamic mb-4">
                        <table class="table table-borderless">
                        <thead>
                          <tr>
                            <th scope="col">Bundle Type</th>
                            <th scope="col">Price</th>
                            <th scope="col" style={{textAlign: 'center'}}>Qty</th>
                            <th scope="col">Total Price</th>
                          </tr>
                        </thead>
                        <tbody>
                        {cartItems.map((item) => (
                          <tr key={item.id}>
                            {" "}
                            <CartItem
                              quantity={item.quantity}
                              id={item.id}
                              price={item.price}
                              total={item.totalPrice}
                              name={item.name}
                              product={item.product}
                            />{" "}
                          </tr>
                        ))}
                        </tbody>
                      </table>
                        </div>
                        <label className="form-label" style={{marginBottom: '0px'}}>Customer</label>
                        {/* Currency dropdown */}
                        <div className="dropdown">
                            <button 
                                className="btn bg-gradient-primary dropdown-toggle" 
                                type="button" 
                                id="dropdownMenuButton" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                                >
                                {businessPartnerName}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {business.map((cur, index) => (
                              <li>
                                  <a  className="dropdown-item" 
                                      onClick={(e)=>{
                                          e.preventDefault()
                                          setBusinessPartner(cur.id)
                                          setBusinessPartnerName(cur.name)
                                          setBusinessPartnerEmail(cur.email)
                                          bpname = cur.name
                                          bpemail = cur.email
                                      }}>
                                      {cur.name}
                                      {businessPartnerLoading}
                                  </a>
                              </li>
                            ))}
                            </ul>
                        </div>
                        <button onClick={makeSale}  className="btn btn-info">Generate Sale</button>
                        {/*<button onClick={this.pdfGenerator} className="btn btn-primary">Generate Receipt</button>*/}
                       
                        {/*paymentBtn !== 'SUCCESS' ? (
                          response? (
                            <button onClick={generateSale}  className="btn btn-info">Generate Sale</button>
                          ):(
                            <button  className="btn btn-primary">Generate Vouchers</button>
                          )
                        ):(
                          <button 
                                className="btn btn-info">
                                  <i className="material-icons text-md-center me-2">paid</i>Proceed to Pay          
                          </button>
                        )*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
    )
  }

  export default ShoppingCart

const Style1={
  textAlign:"center"
}

const Style2 ={
  width: "90&"
}

const err = {
  paddingTop: "8px",
  color: "red"
}