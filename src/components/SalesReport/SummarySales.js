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
// import datetime from 'datetime'

const firstname = localStorage.getItem('firstname')
const surname = localStorage.getItem('surname')
const img = "assets/img/telonelogo.png"

export default function SummarySales() {

    const today = new Date()
    const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
    const dateString = date.toString();

    const totalSales = useSelector(getTotalSales)
    const periodicalSales = useSelector(getPeriodicalPayments)
    
    const[filter, setFilter] = useState('Filter by');
    const[currencyID, setCurrencyID] = useState('')
    const[currencyState, setCurrencyState] = useState('Currency')
    const[currencyActioned, setCurrencyActioned]= useState('')
    const[timeSpan, setTimeSpan] = useState('')
    const[duration, setDuration] = useState('Filter By')
    const[birthday, setBirthday] = useState('')


    const [startDay, setStartDay] = useState(date)
    const [endDay, setEndDay] = useState('')

    console.log("my bday: ",birthday)

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

    // function subtractMonths(date, months) {
    //     date.setMonth(date.getMonth() - months);
    //     return date;
    // }

    // function subtractWeek(date, days) {
    //     date.setDate(date.getDate() - days);
    //     return date;
    // }
      
    // // August 13, 2022
    // const newDate = new Date();
    // const dateTime = new Date();
    
    // const stringDate = subtractMonths(newDate, 1);
    // const myDate = subtractWeek(dateTime, 7);

    // const startDate = `${stringDate.getFullYear()}-${stringDate.getMonth()+1}-${stringDate.getDate()}`;
    // const weekDate = `${myDate.getFullYear()}-${myDate.getMonth()+1}-${myDate.getDate()}`;
    
    // // May 13, 2022
    // console.log('start date',startDate); // 2022-05-13T00:00:00.000Z
    // console.log('start date2',weekDate); // 2022-05-13T00:00:00.000Z

    let durationDrop = 
    
    <>
        <div className="dropdown" style={{marginLeft: 10}}>
            <button 
                className="btn bg-gradient-primary dropdown-toggle" 
                type="button" 
                id="dropdownMenuButton" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
                >
                {duration}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{paddingLeft:20}}>
                <li  
                    onClick={
                        () => {
                            // dispatch(
                            //     toggleActions.setTimeSpan(weekDate)
                            // )
                            setDuration('Daily')
                        }
                    }>Daily
                </li>
                <li  
                    onClick={
                        () => {
                            // dispatch(
                            //     toggleActions.setTimeSpan(weekDate)
                            // )
                            setDuration('Weekly')
                        }
                    }>Weekly
                </li>
                <li  
                    onClick={
                        () => {
                            // dispatch(
                            //     toggleActions.setTimeSpan(startDate)
                            // )
                            setDuration('Monthly')
                        }
                    }>Monthly
                </li>
            </ul>
        </div>
        <br/>
    </>

    let datePicker = 
        duration === 'Daily'? <input type='date'/> : 
        duration === 'Weekly'? <input type='date'/> : 
        duration === 'Monthly'? <input type='date'/> : ''

    const data = periodicalSales
    const salesData = totalSales

    const output = Object.entries(
        data.reduce((prev, { bundleId }) => {
            prev[bundleId.name] = prev[bundleId.name] ? prev[bundleId.name] + 1 : 1;
            return prev;
        }, {})
    )
    .map(([bundleId, count]) => ({ bundleId, count }))
    .sort((a, b) => b.count - a.count);

    console.log("the out put: ",output);

    const output2 = Object.entries(
        salesData.reduce((prev, { bundles }) => {
            prev[bundles.name] = prev[bundles.name] ? prev[bundles.name] + 1 : 1;
            return prev;
        }, {})
    )
    .map(([bundles, count]) => ({ bundles, count }))
    .sort((a, b) => b.count - a.count);

    console.log("the out put2: ",output2);

    const calculateByPartner = (bundleName) =>{
        let count = 0
        let totalAmount = 0

        periodicalSales.map((items, i)=>{
            if(items.bundleId.name===bundleName&&items.status!=='FAILED'){
                count ++
                totalAmount += items.amount
            }
        })
        return (
            count !== 0 ? 
            <>
                <div style={{width: '50%', textAlign: 'center'}}>{count}</div>
                <div style={{width: '50%', textAlign: 'right', paddingRight: 70}}>${(Math.round(totalAmount*100)/100).toFixed(2)}</div>
            </>:''
        )
    }

    const calculateByBundle = (bundleName) =>{
        let count = 0
        let totalAmount = 0

        salesData.map((items, i)=>{
            if(items.bundles.name===bundleName){
                count +=items.order.quantity
                totalAmount += items.order.amount
            }
        })
        return (
            count !== 0 ? 
            <>
                <div style={{width: '50%', textAlign: 'center'}}>{count}</div>
                <div style={{width: '50%', textAlign: 'right', paddingRight: 70}}>${(Math.round(totalAmount*100)/100).toFixed(2)}</div>
            </>:''
        )
    }

    const getBundle = (bundleName) =>{
        let bname = ''

        salesData.map((items, i)=>{
            if(items.bundles.name===bundleName&&items.status!=='FAILED'){
                bname = bundleName
            }
        })
        return (
            bname
           )
    }

    const getBundleName = (bundleName) =>{
        let bname = ''

        periodicalSales.map((items, i)=>{
            if(items.bundleId.name===bundleName&&items.status!=='FAILED'){
                bname = bundleName
            }
        })
        return (
            bname
           )
    }

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
      content: ()=> componentRef.current,
      documentTitle: 'TelOne SmartWiFi Receipt',
      // onAfterPrint: ()=> alert('Printing Completed')
    })
    

    const salesTotalCalc = () =>{
        let successTotal = 0
        let total = 0
        let successQty = 0
        periodicalSales.map((item, i)=>{
            if(item.status === 'Successful'){
                successTotal += item.amount
            }                 
        })

        salesData.map((item, i)=>{
            total += item.order.amount      
        })
        return(
            (Math.round((successTotal+total)*100)/100).toFixed(2)
        )
    }

    const calcDate = (startDay) => {
        setBirthday(startDay)
        if(duration === 'Daily'){
            setEndDay(startDay)
            dispatch(
                toggleActions.setTimeSpan({startDate: startDay, endDate: startDay})
            )
        }
        else if(duration === 'Weekly'){
            function subtractWeek(date, days) {
                date.setDate(date.getDate() + days);
                return date;
            }
            const dateTime = new Date(startDay);
            const myDate = subtractWeek(dateTime, 7);
            const weekDate = `${myDate.getFullYear()}-${myDate.getMonth()+1}-${myDate.getDate()}`;
            setEndDay(weekDate)
            console.log('start date2',weekDate); // 2022-05-13T00:00:00.000Z
            dispatch(
                toggleActions.setTimeSpan({startDate: startDay, endDate: weekDate})
            ) 

        }
        else if(duration  === 'Monthly'){
            function subtractMonths(date, months) {
                date.setMonth(date.getMonth() + months);
                return date;
            }  
            const newDate = new Date(startDay);  
            const stringDate = subtractMonths(newDate, 1);   
            const monthDate = `${stringDate.getFullYear()}-${stringDate.getMonth()+1}-${stringDate.getDate()}`; 
            setEndDay(monthDate) 
            console.log('start date',monthDate); // 2022-05-13T00:00:00.000Z  
            dispatch(
                toggleActions.setTimeSpan({startDate: startDay, endDate: monthDate})
            ) 
        }
        else {
            setEndDay(startDay)
            dispatch(
                toggleActions.setTimeSpan({startDate: startDay, endDate: startDay})
            )
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
                            {durationDrop}
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
                                <h6 className="mb-0">SUMMARY NATIONAL SALES REPORT</h6>
                                <h6 className="mb-0">Natioinal Total</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 align-items-center">
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>From Date:</span> <input type="date" style={{border: 0}} name="birthday" onChange={(e) => calcDate(e.target.value)} value={birthday} max={dateString}/></h6>
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>To Date:</span> {endDay<date?endDay:date}</h6>
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Currency:</span> {currencyState}</h6>
                            </div> 
                        </div>
                    </div>
                    <div className="card-body p-3 pb-0">
                        <table className="table align-items-center mb-0 p-5">
                            <thead>
                                <tr>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Product Type</th>
                                    <th className="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                        <div className="row">
                                            <div style={{width: '50%', textAlign: 'center'}}>Quantity</div>
                                            <div style={{width: '50%', textAlign: 'right', paddingRight: 50}}>Total Collections</div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>Splash Page Sales</tr>
                                {
                                    output.map((item)=>(
                                        <tr key={item.bundleId}>
                                            <th scope="row">{getBundleName(item.bundleId)}</th>
                                            <td className="text-align-right">
                                                <div className="row">
                                                    {calculateByPartner(item.bundleId)}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                                <tr>Agents' Sales</tr>
                                {
                                    output2.map((item)=>(
                                        <tr key={item.bundles}>
                                            <th scope="row">{getBundle(item.bundles)}</th>
                                            <td className="text-align-right">
                                                <div className="row">
                                                    {calculateByBundle(item.bundles)}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td>Total</td>
                                    <td>
                                        <div className="row">
                                            <div style={{textAlign: 'right', padding: 70}}>{salesTotalCalc()}</div>
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
