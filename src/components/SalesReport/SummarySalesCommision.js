import React, {useState, useRef} from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import { Button } from "react-bootstrap";
import { ButtonGroup, Form } from "react-bootstrap";
import { getAgentSales, getAllSales, getTotalSales } from '../../store/sales-slice';
import { useDispatch, useSelector } from 'react-redux';
import { currencyActions, getAllCurrencies } from '../../store/currency-slice';
import CurrencyDropdown from '../Currency/CurrencyDropdown/CurrencyDropdown';
import { useReactToPrint } from "react-to-print";
import { getAllCustomerPayments, getPeriodicalPayments } from '../../store/customerPayments-slice';
import { toggleActions } from '../../store/toggle-slice';
import { getAllBusinessPartners } from '../../store/business-slice';
// import datetime from 'datetime'

const firstname = localStorage.getItem('firstname')
const surname = localStorage.getItem('surname')
const img = "assets/img/telonelogo.png"

export default function SummarySalesCommission() {

    const today = new Date()
    const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
    const dateString = date.toString();

    const totalSales = useSelector(getTotalSales)
    const periodicalSales = useSelector(getPeriodicalPayments)
    
    const[currencyID, setCurrencyID] = useState('')
    const[currencyState, setCurrencyState] = useState('Currency')
    const[currencyActioned, setCurrencyActioned]= useState('')
    const[startDate, setStartDate] = useState('')
    const[endDate, setEndDate] = useState('')
    const[empty, setEmpty] = useState('')
    const[validate, setValidate] = useState('')

    const currencyData = useSelector(getAllCurrencies)
    const businessPartnersData = useSelector(getAllBusinessPartners)

    const dispatch = useDispatch()
  
    const getCurrency =(id, name, symbol)=>{
        setCurrencyID(id)
        setCurrencyActioned(name)
        setCurrencyState(symbol)
        sessionStorage.setItem("currency_id", id);
        dispatch(
            currencyActions.setGlobalCurrency(id)
        )
        dispatch(
            currencyActions.setGlobalSymbol(symbol)
        )
        
    }

    let renderedCurrency = ''
    renderedCurrency = currencyData ? (
      currencyData.map((currency, index)=>(
        <tr key={index}>
          <CurrencyDropdown data={currency} setCurrency={getCurrency}/>
        </tr>
      ))
    ):(<div><h1>Error</h1></div>)

    const data = periodicalSales
    const salesData = totalSales
    const customerData = businessPartnersData

    const output = Object.entries(
        customerData.reduce((prev, { businessPartnerRoles }) => {
            prev[businessPartnerRoles.discount] = prev[businessPartnerRoles.discount] ? prev[businessPartnerRoles.discount] + 1 : 1;
            return prev;
        }, {})
    )
    .map(([businessPartnerRoles, count]) => ({ businessPartnerRoles, count }))
    .sort((a, b) => b.count - a.count);

    console.log("the discount output: ",output);

    const output2 = Object.entries(
        salesData.reduce((prev, { businessPartner }) => {
            prev[businessPartner.name] = prev[businessPartner.name] ? prev[businessPartner.name] + 1 : 1;
            return prev;
        }, {})
    )
    .map(([businessPartner, count]) => ({ businessPartner, count }))
    .sort((a, b) => b.count - a.count);

    console.log("the out put2: ",output2);

    const output3 = Object.entries(
        salesData.reduce((prev, { bundles }) => {
            prev[bundles.name] = prev[bundles.name] ? prev[bundles.name] + 1 : 1;
            return prev;
        }, {})
    )
    .map(([bundles, count, id]) => ({ bundles, id, count }))
    .sort((a, b) => b.count - a.count);

    console.log("the output2: ",output2);

    const displayByBundle = (businessPartner, discount) => {
        let mybundles = []
        output3.map((bundleItem)=>{
            totalSales.map((item, i)=>{
                if(item.bundles.name === bundleItem.bundles){
                    let newItem = item.bundles.name
                    mybundles.indexOf(newItem) === -1 ? mybundles.push(newItem) : console.log("This item already exists");
                }
            })
            console.log("my bundles", mybundles)
        })
        return (
           <>
                {
                    Object.values(mybundles).map((item, i)=>(
                        <div className="row">
                            <>{calculateByCustomer(item, businessPartner, discount)}</>
                        </div>
                    ))
                }
           </>
        )
    }

    const calculateByCustomer = (bundle, businessPartner, discount) =>{
        let count = 0
        let bname = ''
        let totalAmount = 0
        let commission = 0
        salesData.map((items, i)=>{
            if(items.businessPartner.name===businessPartner &&items.bundles.name===bundle){
                bname = items.bundles.name
                count +=items.order.quantity
                totalAmount += items.order.amount
                commission += items.order.discount
            }
        })

        if(count>0)
            return (
                <>
                    <div style={{width: '30%', textAlign: 'left'}}>{bundle}</div>
                    <div style={{width: '40%', textAlign: 'center'}}>${(Math.round(totalAmount*100)/100).toFixed(2)}</div>
                    {businessPartner==='Free of charge (FOC)'?
                        <div style={{width: '30%', textAlign: 'right', paddingRight: 50}}>$ 0.00</div>
                    :
                        <div style={{width: '30%', textAlign: 'right', paddingRight: 50}}>$ {(Math.round(commission*100)/100).toFixed(2)}</div>
                    }
                </>)
        else{
            return
        }
    }

    const getDiscount = (businessPartner) =>{
        let disc = ''

        businessPartnersData.map((items, i)=>{
            if(items.name===businessPartner){
                disc = items.businessPartnerRoles.discount
            }
        })
        if(disc===''){
            return 0
        }
        else{
            return (
                disc
            )
        }
    }

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
      content: ()=> componentRef.current,
      documentTitle: 'TelOne SmartWiFi National Sales Summary Report',
      // onAfterPrint: ()=> alert('Printing Completed')
    })
    

    const salesTotalCalc = () =>{
        let total = 0
        let disc = ''

        output2.map((customer, i)=>{
            salesData.map((item, i)=>{
                if(customer.businessPartner===item.businessPartner.name){
                    if(customer.businessPartner!=='Free of charge (FOC)'){
                        // total += item.order.amount*(getDiscount(customer.businessPartner)/100) 
                        total += item.order.discount
                    }
                }
            })
        })
        return(
            (Math.round((total)*100)/100).toFixed(2)
        )
    }

    const submitRequest = async (endDate) => {
        setEndDate(endDate)
        if(currencyID===''){
          setEmpty("Please select the currency")
        }
        else if(startDate==='' || endDate===''){
            setValidate("Please select the start date and reselect end date")
        }
        else{
            if(startDate>endDate){
                setValidate("Invalid Time Span")
            }
            else{
                dispatch(
                    toggleActions.setTimeSpan({startDate, endDate})
                )
                setEmpty("")
                setValidate('')
            }
        }
    }

  return (
    <>
        <div className='row'>
            <div className="col-12">
                <div className="card pb-0 p-3 mb-1">
                    <div className="row">
                        <div className="col-6 d-flex align-items-center">
                            {/* Currency dropdown */}
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
                            <div><sup style={{color: 'red', paddingLeft: 10}}>{empty}</sup></div>
                        </div>
                        <div className="col-6 text-end">
                            <button class="btn btn-link text-dark text-sm mb-0 px-0 ms-4" onClick={()=>handlePrint()}><i class="material-icons text-lg position-relative me-1">picture_as_pdf</i> DOWNLOAD PDF</button>
                        </div> 
                    </div>
                </div>
                <div className="card h-100" ref={componentRef} style={{width: '100%', height: window.innerHeight, padding: '80px'}}>
                    <div className="card-header pb-0 p-3">
                        <div className="row" style={{lineHeight: 2}}>
                            <div class="col-6 text-left mb-5">
                                <img src={img} style={{width: '200px'}}/>
                            </div>                      
                            <div class="col-6 text-end">
                                <h6 className="mb-0">SUMMARY NATIONAL SALES COMMISSION REPORT</h6>
                                <h6 className="mb-0">National Total</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 align-items-center">
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>From Date:</span><input type="date" style={{border: 0}} name="startDate" onChange={(e) => setStartDate(e.target.value)} value={startDate} max={dateString}/></h6>
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>To Date:</span><input type="date" style={{border: 0}} name="endDate" onChange={(e) => submitRequest(e.target.value)} value={endDate} max={dateString}/><sup style={{color: 'red', paddingLeft: 10}}>{validate}</sup></h6>
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Currency:</span> {currencyState}</h6>
                            </div> 
                        </div>
                    </div>
                    <div className="card-body p-3 pb-0">
                        <table className="table align-items-center mb-0 p-5">
                            <thead>
                                <tr>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" style={{width:'20%'}}>Customer</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" style={{width:'10%', paddingRight:'0.5rem'}}>Discount</th>
                                    <th className="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                        <div className="row">
                                            <div style={{width: '30%', textAlign: 'left'}}>Product Type</div>
                                            <div style={{width: '30%', textAlign: 'right', paddingRight: 50}}>Total Sales</div>
                                            <div style={{width: '40%', textAlign: 'right', paddingRight: 50}}>Total Commissions</div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    output2.map((item)=>(
                                        <tr key={item.businessPartner}>
                                            <th scope="row">{item.businessPartner}</th>
                                            <th scope="row">{getDiscount(item.businessPartner)}%</th>
                                            <td className="text-align-right">
                                                <div className="row">
                                                    {displayByBundle(item.businessPartner, getDiscount(item.businessPartner))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td>Total Commission Payable</td>
                                    <td></td>
                                    <td>
                                        <div className="row">
                                            <div style={{textAlign: 'right', padding: 75}}>${salesTotalCalc()}</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12" style={{textAlign: 'center'}}><h6>Disclaimer: To sum up both online and physical shop sales.</h6></div>
                </div>
            </div>
        </div>
    </>
  );
}
