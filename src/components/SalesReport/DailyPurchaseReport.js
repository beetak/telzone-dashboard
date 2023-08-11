import React, {useState, useRef} from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import { Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup'
import { FormControl } from "react-bootstrap";
import { ButtonGroup, Form } from "react-bootstrap";
import { getAgentSales, getAllSales } from '../../store/sales-slice';
import { useDispatch, useSelector } from 'react-redux';
import { currencyActions, getAllCurrencies } from '../../store/currency-slice';
import CurrencyDropdown from '../Currency/CurrencyDropdown/CurrencyDropdown';
import { useReactToPrint } from "react-to-print";

const firstname = localStorage.getItem('firstname')
const surname = localStorage.getItem('surname')
const img = "assets/img/telonelogo.png"

export default function DailyPurchaseReport() {

    const totalSales = useSelector(getAllSales)
    const agentSales = useSelector(getAgentSales)
    
    const [filter, setFilter] = useState('Filter by');
    const[currencyID, setCurrencyID] = useState('')
    const[currencyState, setCurrencyState] = useState('Currency')
    const[currencyActioned, setCurrencyActioned]= useState('')

    const currencyData = useSelector(getAllCurrencies)
    const dispatch = useDispatch()
  
    const getCurrency =(id, name, symbol)=>{
        setCurrencyID(id)
        setCurrencyActioned(name)
        setCurrencyState(symbol)
        sessionStorage.setItem("currency_id", id);
        dispatch(
            currencyActions.setGlobaCurrency(id)
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

    let durationDrop = 
    
    <>
        <Dropdown as={ButtonGroup}>
            <Button variant="info">{filter}</Button>
            <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item 
                onClick={
                  ()=>{
                    setFilter('USD')
                  }
                }
              >USD
              </Dropdown.Item>
              <Dropdown.Item 
                onClick={
                  ()=>{
                    setFilter('USD')
                  }
                }
              >ZWL
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        <br/>
    </>
    const data = agentSales
    const output = Object.entries(
        data.reduce((prev, { bundles }) => {
            prev[bundles.name] = prev[bundles.name] ? prev[bundles.name] + 1 : 1;
            return prev;
        }, {})
      )
      .map(([bundles, count, id]) => ({ bundles, id, count }))
      .sort((a, b) => b.count - a.count);

      console.log("the out put: ",output);

    const output2 = Object.entries(
        data.reduce((prev, { businessPartner }) => {
          prev[businessPartner.name] = prev[businessPartner.name] ? prev[businessPartner.name] + 1 : 1;
          return prev;
        }, {})
      )
      .map(([businessPartner, count]) => ({ businessPartner, count }))
      .sort((a, b) => b.count - a.count);

      console.log("the out put: ",output2);

    const displayByPartner = (bundleName) => {
        let mypartner = []
        output2.map((partner)=>{
            agentSales.map((item, i)=>{
                if(item.businessPartner.name === partner.businessPartner){
                    let newItem = item.businessPartner.name
                    mypartner.indexOf(newItem) === -1 ? mypartner.push(newItem) : console.log("This item already exists");
                }
            })
            console.log("my partner", mypartner)
        })
        return (
           <>
                {
                    Object.values(mypartner).map((item, i)=>(
                        <div className="row">
                            <div style={{width: "25%", textAlign: 'left'}}>{item}</div>
                            <>{calculateByPartner(item, bundleName)}</>
                        </div>
                    ))
                }
           </>
        )
    }

    const calculateByPartner = (partner, bundleName) =>{
        let voucherType = ''
        let count = 0
        let totalAmount = 0

        agentSales.map((items, i)=>{
            if(items.bundles.name===bundleName&&items.businessPartner.name===partner){
                count += items.orders.quantity
                totalAmount += items.orders.amount
            }
            voucherType=items.currency.symbol==='USD'?'Cash':'Electronic'
        })
        return (<>
                <div style={{width: '25%', textAlign: 'left'}}>{voucherType}</div>
                <div style={{width: '25%'}}>{count}</div>
                <div style={{width: '25%', textAlign: 'right', paddingRight: 70}}>${(Math.round(totalAmount*100)/100).toFixed(2)}</div>
            </>)
    }

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
      content: ()=> componentRef.current,
      documentTitle: 'TelOne SmartWiFi Receipt',
      // onAfterPrint: ()=> alert('Printing Completed')
    })
    

    const salesTotalCalc = () =>{
        let salesTotal = 0
        agentSales.map((item, i)=>{
            salesTotal += item.orders.amount
        })
        return(
            (Math.round(salesTotal*100)/100).toFixed(2)
        )
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
                            <button onClick={()=>submitRequest()} className="btn btn-primary">Search</button>
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
                                <h6 className="mb-0">SUMMARY DAY END BUNDLE SALES REPORT</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 align-items-center">
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Date:</span></h6>
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
                                            <div style={{width: '75%'}}>Quantity</div>
                                            <div style={{width: '25%'}}>Total Collections</div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    output.map((item)=>(
                                        <tr key={item.bundles}>
                                            <th scope="row">{item.bundles}</th>
                                            <td colSpan={4} className="text-center">
                                                {displayByPartner(item.bundles)}
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
