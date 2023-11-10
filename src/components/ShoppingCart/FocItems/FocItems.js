import {useState, useRef, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBusinessPartners } from "../../../store/business-slice";
import {  
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
  getLoadingStatus, 
  getOrderStatus, 
  getRetrievalStatus, 
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
import { focActions, getBundleId, postAsyncRequest } from "../../../store/foc-slice";
import Dropdown from 'react-bootstrap/Dropdown'
import { Button } from "react-bootstrap";
import { ButtonGroup, Form } from "react-bootstrap";
import BusinessPartnerDropdown from "../../BusinessPartner/BusinessPartnerDropdown/BusinessPartnerDropdown";
import CartItem from "../CartItem/CartItem";
import jsPDF from 'jspdf'
import "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import InvoiceItem from "../InvoiceItem/InvoiceItem";
import { getPaymentMethod, getToggleStatus, toggleActions } from "../../../store/toggle-slice";
import axios from  'axios'
import { fetchAsyncBasePrice, getBasePrice } from "../../../store/basePrice-slice";
import { BeatLoader } from "react-spinners";
import CurrencyDropdown from "../../Currency/CurrencyDropdown/CurrencyDropdown";
import { getAllCurrencies } from "../../../store/currency-slice";
import { getAllUsers } from "../../../store/user-slice";
import UserDropdown from "../../User/UserDropdown/UserDropdown";
import FocItem from "../CartItem/FocItem";

const img = "assets/img/telonelogo.png"
const firstname = localStorage.getItem('firstname')
const surname = localStorage.getItem('surname')
const userID = localStorage.getItem('userId')

let voucherIdArray = []

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
)

const FocItems = () => {

  const today = new Date()
  const date = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
  console.log("date: ", date)

  const dispatch  = useDispatch()
  const prices  = useSelector(getBasePrice)
  
  const bpname = useSelector(getCustomerName)
  const bpemail = useSelector(getCustomerEmail)
  const customerPhone = useSelector(getCustomerNumber)
  const customerAddress = useSelector(getCustomerAddress)
  const [isOpen, setIsOpen] = useState(false)
  const [printState, setPrintState] = useState(false)
  const [empty, setEmpty] = useState('')

  const [businessPartnerName, setBusinessPartnerName] = useState(`Client's Name`) 
  const [supervisorId, setSupervisorId] = useState()
  const [supervisorName, setSupervisorName] = useState(`Supervisor's Name`)
  const [businessPartnerId, setBusinessPartnerId] = useState('')
  const [businessPartnerEmail, setBusinessPartnerEmail] = useState('')
  const [businessPartnerDiscount, setBusinessPartnerDiscount] = useState('')
  const [businessPartnerVat, setBusinessPartnerVat] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [rateStatus, setRateStatus] = useState('')
  const [rate, setRate] = useState(1)
  const [rateId, setRateId] = useState('')
  const [payment, setPayment] = useState('Payment Method')
  const [currencyId, setCurrencyID] = useState('')
  const [currencyState, setCurrencyState] = useState('Currency')
  const [currencyActioned, setCurrencyActioned]= useState('')
  const [currencySymbol, setCurrencySymbol]= useState('')

  const voucherId = useSelector(getSaleVoucher)
  const btnState = useSelector(getBtnState)
  const discountPercentage = useSelector(getDicountPercentage)
  const vatPercentage = useSelector(getVATPercentage)
  const clientLevel = useSelector(getCustomerLevel)
  const soldVouchersId = useSelector(getSoldVoucherIds)
  const stateUpdate = useSelector(getStateUpdate)
  const postBundleId = useSelector(getBundleId)
  const users = useSelector(getAllUsers)

  let priceCount = ''
  useEffect(() => {
    dispatch(fetchAsyncBasePrice())
      priceCount = Object.keys(prices).length
      if(priceCount<=0){
        setRateStatus(false)    
      }
      else{
        setRateStatus(true)
        currencySymbol === 'ZWL'?setRate(prices[0].price):setRate(1)
        setRateId(prices[0].id)
      }
  }, [dispatch, currencySymbol, postBundleId]);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  
  const itemsList = useSelector((state) => state.foc.itemsList);
  const orderId = useSelector(getLastId)
  const orderStatus = useSelector(getOrderStatus)
  const soldVouchers = useSelector(getSoldVouchers)
  const updateState = useSelector(getVoucherUpdateStatus)
  const loading = useSelector(getRetrievalStatus)

  const getBusinessPartner =(id, name, email, discount, vat)=>{
    setBusinessPartnerId(id)
    setBusinessPartnerName(name)
    setBusinessPartnerDiscount(discount)
    setBusinessPartnerVat(vat)
    setBusinessPartnerEmail(email)
  } 

  const getSupervisor =(id, firstname, surname)=>{
    setSupervisorId(id)
    setSupervisorName(firstname +' ' +surname)
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

  const supervisors = useSelector(getAllUsers)
  let renderedSupervisors = ''
  renderedSupervisors = supervisors ? (
    <div className="dropdown">
      <button 
          className="btn bg-gradient-primary dropdown-toggle" 
          type="button" 
          id="dropdownMenuButton" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
          >
          {supervisorName}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {supervisors.map((partner, index)=>(
          
          <>
            {
              partner.roleId.role === "Area Manager" ?
                <li key={index}>
                  <UserDropdown data={partner} setSupervisor={getSupervisor}/>
                </li>:
              partner.roleId.role === "Super Admin" &&
                <li key={index}>
                  <UserDropdown data={partner} setSupervisor={getSupervisor}/>
                </li>
            }
          </>
        ))}
      </ul>
    </div>
    ):(<div><h1>Error</h1></div>)
  // const cartItem = useSelector(getAllSales)

  let unitPrice = 0
  let totalPrice = 0
  let unitDiscount = 0
  let totalDiscount = 0
  let unitVat = 0
  let totalVat = 0
  let netTotal = 0
  let totalQty = 0;

  itemsList.forEach((item) => {
    totalQty += item.quantity

    unitPrice = (Math.round((item.price - (item.price*discountPercentage/100)) * 10000 * rate / (vatPercentage+100)) / 100).toFixed(2)
    totalPrice = (Math.round(unitPrice*item.quantity*100)/100).toFixed(2)
    unitDiscount = item.price*discountPercentage/100*rate
    totalDiscount = (Math.round(unitDiscount*item.quantity*100)/100).toFixed(2)
    unitVat = (Math.round((unitPrice*1.15 - unitPrice)*100)/100).toFixed(2)
    totalVat = (Math.round(unitVat*item.quantity*100)/100).toFixed(2)
    netTotal = (Math.round((parseFloat(totalVat) + parseFloat(totalPrice))*100)/100).toFixed(2)

  });

  let renderedItems = itemsList.map((item, index)=>(
    <tr key={index}>
      <FocItem
        quantity={item.quantity}
        id={item.id}
        price={item.price}
        total={item.totalPrice}
        name={item.name}
        product={item.product}
        rate={rate}
        vat={vatPercentage}
        discount={discountPercentage}/>
    </tr>
  ))

  const processSale = ()=>{
    itemsList.forEach((item) => {
      saleByBundle(item.product, item.quantity)
    });
  }

  const makeSale = (callback) => {
    if(currencyId===''){
      setEmpty("Please select currency")
    }
    else{
      dispatch(postAsyncRequest(
        {
          bundleId: postBundleId,
          businessPartnerId,
          currentUser: supervisorId,
          foc: {
            approved: false,
            businessPartnerEmail,
            id: 1,
            lastModified: today,
            quantity: totalQty,
            requestDate: today,
            suspended: false
          },
          requestCreator: userID
        }
      ))
      var todayDate = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}); // 08/19/2020 (month and day with two digits)
      setCurrentDate(todayDate)
      console.log(todayDate);
      setPrintState(true)
      callback()
    }
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

  const getCurrency =(id, name, symbol)=>{
    setCurrencyID(id)
    setCurrencyActioned(name)
    setCurrencyState(name)
    setCurrencySymbol(symbol)
  }

  const currencyData = useSelector(getAllCurrencies)

  let renderedCurrency = ''
    renderedCurrency = currencyData ? (
      currencyData.map((currency, index)=>(
        <tr key={index}>
          <CurrencyDropdown data={currency} setCurrency={getCurrency}/>
        </tr>
      ))
    ):(<div><h1>Error</h1></div>)

  const toggleStatus  = useSelector(getToggleStatus)

  let loadingAnimation = 
    <div className='text-center' style={anime}>
        <h5 style={{color: '#055bb5'}}>Preparing Invoice</h5>
        <BeatLoader
        color={'#055bb5'}
        loading={loading}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
    </div>

  let errorMsg =  
    <div className='text-center'>
      <h5 style={{color: '#E91E63'}}>Opps something went wrong. Please refresh page</h5>
    </div>

  const successTimer = () =>{
    setTimeout(() => {
      <div className='text-center'>
        <h5 style={{color: '#E91E63'}}>Success</h5>
      </div>
    }, 9000);
  }

  let showData =
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
                    <td style={{textAlign: 'right'}}> ${totalPrice}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}></td>
                    <td>Discount 100 %
                    </td>
                    <td style={{textAlign: 'right'}}> ${totalPrice}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}></td>
                    <td>VAT 0 %</td>
                    <td style={{textAlign: 'right'}}> ${totalVat-totalVat}</td>
                  </tr>
                  </>:
                  <></>}
              </tbody>
            </table>
          </div>
          <div className='row'>
            <div className="col-6">
              <label className="form-label" style={{marginBottom: '0px'}}>FOC Eligible Customer</label>                  
              {renderedBusinessPartner}
              <div style={{ color: 'red', marginBottom: '10px' }}>{empty}</div>
              <div className="dropdown">
                  <button 
                      className="btn bg-gradient-primary dropdown-toggle" 
                      type="button" 
                      id="dropdownMenuButton" 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false"
                      >
                      {currencyState}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {renderedCurrency}
                  </ul>
              </div>

              <button 
                // onClick={processSale} 
                onClick={()=>makeSale(function(){processSale()})} 
                className="btn btn-info"
                disabled = {businessPartnerName===`Client's Name` || totalQty === 0 || supervisorName ===`Supervisor's Name`?true:false}
              >Submit Request</button>
            </div>
            <div className="col-6 align-items-lg-end">
              <label className="form-label" style={{marginBottom: '0px'}}>Supervisor</label>                  
              {renderedSupervisors}
            </div>
          </div>
          

          {loading === 'idle'?
            '':(loading==='pending'?
                loadingAnimation:(
                  loading === 'fulfilled'?
                    successTimer:(
                      loading ==='rejected'?errorMsg: ''
                  )
                )
              )
          }
        </div>
      </div>
    </>

  return (
    <div class="col-lg-7 py-4"> 
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
              <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                  <div className="col-7">
                    <h6 className="text-white text-capitalize ps-3">Generate FOC Request</h6>
                  </div>
                  <div className="col-5">
                    <h6 className="text-white text-capitalize ps-3"><span style={{float: 'right'}}>Total Price: ${netTotal-netTotal}</span></h6>
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

export default FocItems;


const Style2 ={
  paddingTop: "1rem",
  paddinBottom: "0.5rem",
  cursor: "pointer"
}

const lineStyle={
  lineHeight:'17px',
  fontSize: '14px',
}

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

const anime = {
  textAlign: 'center', 
  justifyContent: 'center', 
  alignItems: 'center', 
  width: '100%', 
  height: '10vh'
}