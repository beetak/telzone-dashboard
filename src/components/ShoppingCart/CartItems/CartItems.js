import {useState, useRef, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBusinessPartners } from "../../../store/business-slice";
import { 
  cartActions, 
  getAccount, 
  getAmount, 
  getBtnState, 
  getCustomerAddress, 
  getCustomerEmail, 
  getCustomerLevel, 
  getCustomerName, 
  getCustomerNumber, 
  getDicountPercentage, 
  getLastId, 
  getOrderStatus, 
  getSaleVoucher, 
  getSoldVoucherIds, 
  getSoldVouchers, 
  getStateUpdate, 
  getVATPercentage, 
  getVoucherUpdateStatus, 
  postSale, 
  postVoucherSaleByBundleId, 
  updateVoucherOnSale, 
  updateVoucherStatus
} from "../../../store/cart-slice";
import Dropdown from 'react-bootstrap/Dropdown'
import { Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup'
import { FormControl } from "react-bootstrap";
import { ButtonGroup, Form } from "react-bootstrap";
import BusinessPartnerDropdown from "../../BusinessPartner/BusinessPartnerDropdown/BusinessPartnerDropdown";
import CartItem from "../CartItem/CartItem";
import jsPDF from 'jspdf'
import "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import InvoiceItem from "../InvoiceItem/InvoiceItem";
import { getPaymentMethod, getToggleStatus, toggleActions } from "../../../store/toggle-slice";
import { Br, Cut, Line, Printer, Text, Row, render } from 'react-thermal-printer';
import axios from  'axios'
import { fetchAsyncBasePrice, getBasePrice } from "../../../store/basePrice-slice";

const userId = localStorage.getItem('userId')
const img = "assets/img/telonelogo.png"
const firstname = localStorage.getItem('firstname')
const surname = localStorage.getItem('surname')
const userID = localStorage.getItem('userId')

let voucherIdArray = []

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
)

const CartItems = () => {

  const today = new Date()
  const date = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
  console.log("date: ", date)

  const dispatch  = useDispatch()
  const prices  = useSelector(getBasePrice)
  const paymentValue = useSelector(getPaymentMethod)

  let priceCount = ''
  useEffect(() => {
    dispatch(fetchAsyncBasePrice())
      priceCount = Object.keys(prices).length
      if(priceCount<=0){
        setRateStatus(false)    
      }
      else{
        setRateStatus(true)
        setRate(prices[0].price)
        setRateId(prices[0].id)
      }
  }, [dispatch]);

  const bpname = useSelector(getCustomerName)
  const bpemail = useSelector(getCustomerEmail)
  const customerPhone = useSelector(getCustomerNumber)
  const customerAddress = useSelector(getCustomerAddress)
  const [isOpen, setIsOpen] = useState(false)
  const [printState, setPrintState] = useState(false)

  const [businessPartnerName, setBusinessPartnerName] = useState(`Client's Name`)
  const [adminPortalUserId, setAdminPortalUserId] = useState(3)
  const [businessPartnerId, setBusinessPartnerId] = useState('')
  const [businessPartnerEmail, setBusinessPartnerEmail] = useState('')
  const [businessPartnerDiscount, setBusinessPartnerDiscount] = useState('')
  const [businessPartnerVat, setBusinessPartnerVat] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [rateStatus, setRateStatus] = useState('')
  const [rate, setRate] = useState('')
  const [rateId, setRateId] = useState('')
  const [payment, setPayment] = useState('Payment Method')

  const voucherId = useSelector(getSaleVoucher)
  const btnState = useSelector(getBtnState)
  const discountPercentage = useSelector(getDicountPercentage)
  const vatPercentage = useSelector(getVATPercentage)
  const clientLevel = useSelector(getCustomerLevel)
  const soldVouchersId = useSelector(getSoldVoucherIds)
  const stateUpdate = useSelector(getStateUpdate)


  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  let total = 0;
  let subTotal = 0;
  let valueAddedTax = 0;
  let disc = 0;
  let totalQty = 0;
  const itemsList = useSelector((state) => state.cart.itemsList);
  const orderId = useSelector(getLastId)
  const orderStatus = useSelector(getOrderStatus)
  const soldVouchers = useSelector(getSoldVouchers)
  const updateState = useSelector(getVoucherUpdateStatus)

  const getBusinessPartner =(id, name, discount, vat)=>{
    setBusinessPartnerId(id)
    setBusinessPartnerName(name)
    setBusinessPartnerDiscount(discount)
    setBusinessPartnerVat(vat)
  } 

  const handleUpdateOnSale = () => {
    dispatch(updateVoucherOnSale(
      {
        voucherId
      }
    ))
    if(updateState === 'success'){
      printVouchers()
    }
    closeModal()
  }

  // const updateVoucherState = () => {
  //   console.log("",soldVouchersId)
  //   dispatch(updateVoucherStatus(
  //     soldVouchersId
  //   ))
  // }

  const updateVoucherState = (callback) => {
    console.log("",soldVouchersId)
    dispatch(updateVoucherStatus(
      soldVouchersId
    ))
    callback()
  }
  
  const businessPartners = useSelector(getAllBusinessPartners)
  let renderedBusinessPartner = ''
  renderedBusinessPartner = businessPartners ? (
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
        <li>
          <a  className="dropdown-item" 
              onClick={
                  ()=>{
                    setBusinessPartnerId(100)
                    setBusinessPartnerName("Walk In Client")
                    setBusinessPartnerEmail("N/A")
                    setBusinessPartnerDiscount(0)
                    setBusinessPartnerVat(14.5)
                    dispatch(cartActions.setClient(
                      {
                        addBtn: false,
                        level: 1,
                        vat: 15,
                        discount: 0
                      })
                    )
                  }
              }>
              Walk in Client
          </a>
        </li>
        {businessPartners.map((partner, index)=>(
          <>
            <li key={index}>
              <BusinessPartnerDropdown data={partner} setBusinessPartner={getBusinessPartner}/>
              {/*<BusinessPartnerDropdown data={partner} setBusinessPartner={getBusinessPartner} setClientLevel={getClientLevel}/>*/}
            </li>
          </>
        ))}
      </ul>
    </div>
    ):(<div><h1>Error</h1></div>)
  // const cartItem = useSelector(getAllSales)

  itemsList.forEach((item) => {
    subTotal += item.totalPrice;
    totalQty += item.quantity
    disc = (Math.round(subTotal * discountPercentage) / 100).toFixed(2)
    valueAddedTax = (Math.round((subTotal - disc) * vatPercentage) / 100).toFixed(2)
    total = (Math.round((subTotal - disc) * 100 + valueAddedTax * 100) / 100).toFixed(2)
  });

  let renderedItems = itemsList.map((item, index)=>(
    <tr key={index}>
      <CartItem 
        quantity={item.quantity}
        id={item.id}
        price={item.price}
        total={item.totalPrice}
        name={item.name}
        product={item.product}/>
    </tr>
  ))

  let invoiceItems = itemsList.map((item, index)=>(
    <tr key={index}>
      <InvoiceItem 
        quantity={item.quantity}
        id={item.id}
        price={item.price}
        total={item.totalPrice}
        name={item.name}
        product={item.product}/>
    </tr>
  ))

  const processSale = ()=>{
    itemsList.forEach((item) => {
      saleByBundle(item.product, item.quantity)
    });
  }

  const makeSale = (callback) => {
    dispatch(postSale(
      {
        adminPortalUserId: userID,
        businessPartnerId,
        order: {
          amount: total,
          dateCreated: today,
          payingAccountNumber: "TelOne",
          quantity: totalQty
        }
      }
    ))
    var todayDate = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}); // 08/19/2020 (month and day with two digits)
    setCurrentDate(todayDate)
    console.log(todayDate);
    setPrintState(true)
    callback()
  }

  const saleByBundle = (bundleId, quantity) => {
    dispatch(postVoucherSaleByBundleId(
      {
        bundleId,
        quantity
      }
    ))
  }

  const getVoucherId = () =>{
    soldVouchers.map((items, index)=>
      voucherIdArray.push(items.id)
    )
    console.log("voucher ids: ",voucherIdArray)
  }

  const printSingleVoucher = () => {

    let count = 1
    console.log("generated vouchers: ",soldVouchers)
    // const data = Object.values(soldVouchers).map(elt=> [count++, elt.bundleName, elt.voucherCode]);
    const data = Object.values(soldVouchers).map(elt=> [count++, elt.bundleName, elt.voucherCode]);
    const title = "My Awesome Report";
    const headers = [["","Name", "Voucher Code"]];

    let content = {
      startY: 180,
      head: headers,
      margin: { left: 15, right: 15},
      body: data
    };  
    
    var doc = new jsPDF()

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    var today = new Date(),
    curTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    // var doc = new jsPDF('potrait', 'px', 'a6', 'false')
    var doc = new jsPDF('potrait', 'px', [240,160], 'false')
    doc.addImage(img, 'PNG', 15, 0, 70, 25)
    doc.setFont('Times New Roman', 'bold')
    doc.setFontSize(12)
    doc.text(15, 40, 'Headquarters: Runhare House')
    doc.setFont('Times New Roman', 'regular')
    doc.setFontSize(10)
    doc.setTextColor(0,0,0);
    doc.text(15, 55, '107 Kwame Nkrumah Avenue, Harare, \nZimbabwe\nP.O Box CY 331, Causeway, Harare, \nZimbabwe\n24 Hour Call Center - +263 0242 700950')
    doc.setFont('Times New Roman', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(0,0,0);
    doc.text(15, 105, 'Client Details')
    doc.setFont('Times New Roman', 'medium')
    doc.setFontSize(10)
    doc.setTextColor(0,0,0);
    doc.text(15, 120, 'Client Name:  '+bpname+ '\nClient Email:  ' +bpemail+ '\nInvoice Number:  ' +orderId+ '\nDate:  ' + date + ' ' + curTime + "\n")
    // doc.text(15, 120, 'Client Name:  ' + businessPartnerId===0? 'N/A': bpname + '\nClient Email:  ' + businessPartnerId===0? 'N/A': bpemail + '\nInvoice Number:  ' +orderId+ '\nDate:  ' + date + ' ' + curTime + "\n")
    doc.setFont('Times New Roman', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(0,0,0);
    doc.text(15, 160, 'Cashier Details')
    doc.setFont('Times New Roman', 'medium')
    doc.setFontSize(10)
    doc.setTextColor(0,0,0);
    doc.text(15, 175, 'Cashier Name: ' +firstname+ " "+surname+ '\nShop: TelOne Shop ' + "\n")

    doc.setTextColor(0,0,0);
    doc.setFontSize(10)
    // doc.autoTable(content);

    soldVouchers.map((item, i)=>{
      doc.text(
        15,
        200 + i * 18,
        'Bundle: ' + item.bundleName + '\nPIN: ' + item.voucherCode
      )
    });

    // var blob = doc.output('blob');
    // var formData = new FormData();
    // formData.append('pdf', blob);

    // var res = doc.output('datauristring');   //this line!!!!
    // axios.post('/mailsender', res).then((res) => {
    //     if(res.status === 'ok') console.log("Yeah!");
    //     else console.log(":(");
    // });


    // const nodemailer = require("nodemailer")
    // let mailTransporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'beetaktj1@gmail.com',
    //     pass: '@Mywife1000'
    //   }
    // })
    // let mailDetails = {
    //   from: 'masiyablessingt@getCustomerEmail.com',
    //   to: 'blessing.masiya@telone.co.zw',
    //   subject: 'test mail',
    //   text: 'Node js try out',
    //   attachment: [{
    //     path: data.filename
    //   }]
    // }
    // mailTransporter.sendMail(mailDetails, function(err, data){
    //   if(err){
    //     console.log('error occurred')
    //   }
    //   else{
    //     console.log('successful send')
    //   }
    // })
    
    doc.save('invoice.pdf')
    window.location = '/sales'
  }

  let paymentDrop = 
  <>
  
      <Dropdown as={ButtonGroup}>
            <Button variant="info">{payment}</Button>
            <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item 
                onClick={
                  ()=>{
                    changePayment(true)
                    setPayment('USD')
                  }
                }
              >USD
              </Dropdown.Item>
              <Dropdown.Item 
                onClick={
                  ()=>{
                    changePayment(false)
                    setPayment('RTGS')
                  }
                }
              >RTGS
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <br/></>

  const printVouchers = () => {

    let count = 1
    const data = Object.values(soldVouchers).map(elt=> [count++, elt.bundleName, elt.voucherCode]);

    const title = "My Awesome Report";
    const headers = [["","Name", "Voucher Code"]];

    let content = {
      startY: 190,
      head: headers,
      margin: { left: 45, right: 35},
      body: data
    };    

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    var today = new Date(),
    curTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var doc = new jsPDF('potrait', 'px', 'a4', 'false')
    doc.addImage(img, 'PNG', 45, 40, 70, 25)
    doc.setFont('Times New Roman', 'bold')
    doc.setFontSize(12)
    doc.text(410, 80, 'Headquarters: Runhare House',{align: 'right'})
    doc.setFont('Times New Roman', 'regular')
    doc.setFontSize(10)
    doc.setTextColor(112,112,112);
    doc.text(410, 95, '107 Kwame Nkrumah Avenue, Harare, Zimbabwe\nP.O Box CY 331, Causeway, Harare, Zimbabwe\n24 Hour Call Center - +263 0242 700950',{align: 'right'})
    doc.setFont('Times New Roman', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(0,0,0);
    doc.text(45, 130, 'Client Details')
    doc.setFont('Times New Roman', 'medium')
    doc.setFontSize(10)
    doc.setTextColor(112,112,112);
    doc.text(45, 140, 'Client Name:  ' +bpname+ '\nClient Email:  ' +bpemail+ '\nInvoice Number:  ' +orderId+ '\nDate:  ' + date + ' ' + curTime + "\n")

    doc.setTextColor(0,0,0);
    doc.setFontSize(11)
    doc.autoTable(content);
    
    doc.save('invoice.pdf')
    window.location = '/sales'
  }

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: ()=> componentRef.current,
    documentTitle: 'TelOne SmartWiFi Receipt',
    // onAfterPrint: ()=> alert('Printing Completed')
  })


  const closePrintScreen = () =>{
    setPrintState(false)
  }

  const toggleStatus  = useSelector(getToggleStatus)
  

  const changeStatus = () => {
    console.log(toggleStatus)
    dispatch(
        toggleActions.changeState({
          status: !toggleStatus
        })
    )
  }

  const changePayment = (paymentStatus) => {
    dispatch(
        toggleActions.changePaymentMethod({
          payment: paymentStatus
        })
    )
  }

  let single = printState? (''):('')

  let showData = printState? (
    <div className="">
      <div className="text-center">
        {toggleStatus?
          <button 
            onClick={()=>updateVoucherState(function(){if(stateUpdate){printSingleVoucher()}})}  
            className="btn btn-danger mx-1"
          >Close</button>:
          <>
            <button 
              // onClick={()=>updateVoucherState(function(){if(stateUpdate){printVouchers()}})}
              onClick={function(event){getVoucherId();handlePrint()}}
              className="btn btn-info mx-1"
            >Print</button>
            <button 
              // onClick={()=>updateVoucherState(function(){if(stateUpdate){closePrintScreen()}})} 
              // onClick={()=>updateVoucherState(function(){if(stateUpdate){printSingleVoucher()}})} 
              onClick={()=>updateVoucherState(function(event){if(stateUpdate){closePrintScreen()}})}
              className="btn btn-danger mx-1"
            >Close</button>
          </>
        }
      </div>
      <div className="" ref={componentRef} style={{width: '100%', height: window.innerHeight, padding: '80px'}}>
        <img src={img} style={{width: '100px'}}/>
        <div className="">
          <div className="text-right"  style={{textAlign: "right"}}>
            <h6>Headquarters: <span>Runhare House</span></h6>
            <p style={{fontSize: '12px', fontWeight: 'bold'}}>107 Kwame Nkrumah Avenue, Harare, Zimbabwe 
              <br/> P.O Box CY 331, Causeway, Harare, Zimbabwe 
              <br/> 24 Hour Call Center - +263 0242 700950
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <h6>Customer Details</h6>
            <div style={{listStyle: 'none'}}>
              <div style={lineStyle}><span style={{fontWeight: 'bold'}}>Name:</span> {bpname}</div>
              <div style={lineStyle}><span style={{fontWeight: 'bold'}}>Email:</span> {bpemail}</div>
              <div style={lineStyle}><span style={{fontWeight: 'bold'}}>Cellphone:</span> {customerPhone}</div>
              <div style={lineStyle}><span style={{fontWeight: 'bold'}}>Address:</span> {customerAddress}</div>
            </div>
          </div>
          <div className={"col-6"} style={{textAlign: "right"}}>
            <h6>Invoice Details</h6>
            <div>
              <div style={lineStyle}><span style={{fontWeight: 'bold'}}>Invoice Date:</span> {currentDate}</div>
              <div style={lineStyle}><span style={{fontWeight: 'bold'}}>Invoice Number:</span> {orderId}</div>
              <div style={lineStyle}><span style={{fontWeight: 'bold'}}>BP Number:</span> 200001412</div>
              <div style={lineStyle}><span style={{fontWeight: 'bold'}}>VAT Number:</span> 10001509</div>
            </div>
          </div>
        </div>
        <h6 className="mt-3 mb-0">Payment</h6>
        

        
          
        <table className="w-100">
          <thead>
            <tr className='border-top-lg border-bottom-lg'>
              <th style={{fontSize: '14px', width: '100px'}}>Qty</th>
              <th style={{fontSize: '14px'}}>Product</th>
              <th style={{fontSize: '14px', textAlign:'right'}}>Unit Price</th>
              <th style={{fontSize: '14px', textAlign:'right'}}>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceItems} 
            <tr>
              <td></td>
              <td></td>
              <td style={{fontSize: '14px',fontWeight:'bold', textAlign:'right'}} className='border-top-lg border-bottom-lg'>Sub Total</td>
              <td style={{fontSize: '14px', textAlign:'right'}} className='border-top-xl border-bottom-xl'>${(Math.round(subTotal * 100) / 100).toFixed(2)}</td>
            </tr> 
            {
              clientLevel===2?
              <tr>
                <td></td>
                <td></td>
                <td style={{fontSize: '14px',fontWeight:'bold', textAlign:'right'}} className='border-top-lg border-bottom-lg'>Discount {businessPartnerDiscount}%</td>
                <td style={{fontSize: '14px', textAlign:'right'}} className='border-top-xl border-bottom-xl'>${disc}</td>
              </tr>:''
            }
            <tr>
              <td></td>
              <td></td>
              <td style={{fontSize: '14px',fontWeight:'bold', textAlign:'right'}} className='border-top-lg border-bottom-lg'>VAT {businessPartnerVat}%</td>
              <td style={{fontSize: '14px', textAlign:'right'}} className='border-top-xl border-bottom-xl'>${valueAddedTax}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td style={{fontSize: '14px',fontWeight:'bold', textAlign:'right'}} className='border-top-lg border-bottom-lg'>Total</td>
              <td style={{fontSize: '14px', textAlign:'right'}} className='border-top-xl border-bottom-xl'>${(Math.round(total * 100) / 100).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <div className="text-center bottom-8 w-80" style={{position: 'absolute'}}>
        <hr/>
          <h6>Cashier Details</h6>
          <div style={lineStyle}><span style={{fontWeight: 'bold'}}>Receipting Cashier:</span> {firstname} {surname}</div>
          <div style={lineStyle}><span style={{fontWeight: 'bold'}}>TelOne Shop</span></div>
        </div>
      </div>
    </div>
  ):(
    <>
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
                {renderedItems}
                {!btnState?
                  <>
                  <tr>
                    <td colSpan={2}></td>
                    <td>Sub Total
                    </td>
                    <td style={{textAlign: 'right'}}> ${(Math.round(subTotal * 100) / 100).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}></td>
                    <td>Discount {discountPercentage}%
                    </td>
                    <td style={{textAlign: 'right'}}> ${disc}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}></td>
                    <td>VAT {vatPercentage}%</td>
                    <td style={{textAlign: 'right'}}> ${valueAddedTax}</td>
                  </tr>
                  </>:
                  <></>}
              </tbody>
            </table>
          </div>
          <label className="form-label" style={{marginBottom: '0px'}}>Customer</label>                  
          {renderedBusinessPartner}

          {orderStatus==="idle"?
            <button 
            // onClick={processSale} 
            onClick={()=>makeSale(function(){processSale()})} 
            className="btn btn-info"
            disabled = {businessPartnerName===`Client's Name` || totalQty === 0 ?true:false}
            >Generate Sale</button>
            :orderStatus==="success"?
              (stateUpdate === 'successful'?
                <button onClick={printVouchers} type='button' className="btn btn-primary">Retrieve Vouchers</button>:<button onClick={updateVoucherState} type='button' className="btn btn-primary">Retry</button>):(<button disabled={true} type='button' className="btn btn-primary">Try Again</button>)
          }
        </div>
      </div>
    </>
  )

  return (
    <div class="col-lg-7 py-4"> 
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
              <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                  <div className="col-3">
                    <h6 className="text-white text-capitalize ps-3">Generate Sale</h6>
                  </div>
                  <div className="col-5 form-check form-switch d-flex align-items-center">
                    <input className="form-check-input" type="checkbox" onClick={changeStatus}/>
                    <label className="form-check-label mb-0 ms-2" style={{color: 'white'}}>{toggleStatus?"Single Voucher Receipt":"Multiple Voucher Receipt"}</label>
                  </div>
                  <div className="col-4">
                    <h6 className="text-white text-capitalize ps-3"><span style={{float: 'right'}}>Total Price: ${total}</span></h6>
                  </div>
                </div>
            </div>
            <div className="card-body px-0 pb-2">
              {showData}  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;


const Style2 ={
  paddingTop: "1rem",
  paddinBottom: "0.5rem",
  cursor: "pointer"
}

const lineStyle={
  lineHeight:'17px',
  fontSize: '14px',
}
