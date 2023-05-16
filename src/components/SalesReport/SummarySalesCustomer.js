import React, {useState, useRef} from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import { Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup'
import { FormControl } from "react-bootstrap";
import { ButtonGroup, Form } from "react-bootstrap";
import { getAgentSales, getTotalSales } from '../../store/sales-slice';
import { useDispatch, useSelector } from 'react-redux';
import { currencyActions, getAllCurrencies } from '../../store/currency-slice';
import CurrencyDropdown from '../Currency/CurrencyDropdown/CurrencyDropdown';
import { useReactToPrint } from "react-to-print";
import { toggleActions } from '../../store/toggle-slice';

const firstname = localStorage.getItem('firstname')
const surname = localStorage.getItem('surname')
const img = "assets/img/telonelogo.png"

export default function SummarySalesCustomer() {

    const today = new Date()
    const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
    const dateString = date.toString();

    const totalSales = useSelector(getTotalSales)
    const agentSales = useSelector(getAgentSales)
    
    const [filter, setFilter] = useState('Filter by');
    const[currencyID, setCurrencyID] = useState('')
    const[currencyState, setCurrencyState] = useState('Currency')
    const[currencyActioned, setCurrencyActioned]= useState('')
    const[startDate, setStartDate] = useState('')
    const[endDate, setEndDate] = useState('')
    const[empty, setEmpty] = useState('')
    const[validate, setValidate] = useState('')

    const currencyData = useSelector(getAllCurrencies)
    const dispatch = useDispatch()
  
    const getCurrency =(id, name, symbol)=>{
        setCurrencyID(id)
        setCurrencyActioned(name)
        setCurrencyState(symbol)
        sessionStorage.setItem("currency_id", id);
        dispatch(
            currencyActions.setGlobalCurrency(id)
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

   
    const data = totalSales

    const output2 = Object.entries(
        data.reduce((prev, { bundles }) => {
            prev[bundles.name] = prev[bundles.name] ? prev[bundles.name] + 1 : 1;
            return prev;
        }, {})
      )
      .map(([bundles, count, id]) => ({ bundles, id, count }))
      .sort((a, b) => b.count - a.count);

      console.log("the output2: ",output2);

    const output = Object.entries(
        data.reduce((prev, { businessPartner }) => {
          prev[businessPartner.name] = prev[businessPartner.name] ? prev[businessPartner.name] + 1 : 1;
          return prev;
        }, {})
      )
      .map(([businessPartner, count]) => ({ businessPartner, count }))
      .sort((a, b) => b.count - a.count);

      console.log("the out put: ",output);

    const displayByPartner = (businessPartnerName) => {
        let mybundles = []
        output2.map((bundleItem)=>{
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
                            <>{calculateByBundle(item, businessPartnerName)}</>
                        </div>
                    ))
                }
           </>
        )
    }

    const calculateByBundle = (bundle, businessPartnerName) =>{
        let count = 0
        let totalAmount = 0
        let bundleName = ''

        totalSales.map((items, i)=>{
            if(items.businessPartner.name===businessPartnerName &&items.bundles.name===bundle){
                count += items.order.quantity
                totalAmount += items.order.amount
                bundleName = bundle
            }
        })

        if(count>0)
            return (
                <>
                    <div style={{width: "40%", textAlign: 'left'}}>{bundle}</div>
                    <div style={{width: '25%'}}>{count}</div>
                    <div style={{width: '35%', textAlign: 'right', paddingRight: 70}}>${(Math.round(totalAmount*100)/100).toFixed(2)}</div>
                </>)
        else{
            return
        }
    }

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
      content: ()=> componentRef.current,
      documentTitle: 'TelOne SmartWiFi Receipt',
      // onAfterPrint: ()=> alert('Printing Completed')
    })
    

    const salesTotalCalc = () =>{
        let salesTotal = 0
        totalSales.map((item, i)=>{
            salesTotal += item.order.amount
        })
        return(
            (Math.round(salesTotal*100)/100).toFixed(2)
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
                                <h6 className="mb-0">SUMMARY NATIONAL CUSTOMER SALES REPORT</h6>
                                <h6 className="mb-0">National Customers Sales Total</h6>
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
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Customer</th>
                                    <th className="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                        <div className="row">
                                            <div style={{width: '40%', textAlign: 'left'}}>Product Type</div>
                                            <div style={{width: '25%'}}>Quantity</div>
                                            <div style={{width: '35%',  textAlign: 'right', paddingRight: 50}}>Total Sales</div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    output.map((item)=>(
                                        <tr key={item.businessPartner}>
                                            <th scope="row">{item.businessPartner}</th>
                                            <td colSpan={4} className="text-center">
                                                {displayByPartner(item.businessPartner)}
                                            </td>
                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td>Total Revenue</td>
                                    <td>
                                        <div className="row">
                                            <div style={{width: '100%', textAlign: 'right', paddingRight:70}}>${salesTotalCalc()}</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}
