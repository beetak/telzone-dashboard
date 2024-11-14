import React, {useState, useRef} from 'react';
import { fetchAsyncAgentSalesByShop, fetchAsyncSalesByShop, getAgentLoadingStatus, getShopAgentSales, getShopSales } from '../../store/sales-slice';
import { useDispatch, useSelector } from 'react-redux';
import { currencyActions, getAllCurrencies } from '../../store/currency-slice';
import CurrencyDropdown from '../Currency/CurrencyDropdown/CurrencyDropdown';
import { useReactToPrint } from "react-to-print";
import { toggleActions } from '../../store/toggle-slice';
import { getShopAgents, userActions } from '../../store/user-slice';
import AgentDropdown from '../User/AgentDropdown/AgentDropdown';
import { Dropdown } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
// import datetime from 'datetime'

const userRole = localStorage.getItem('role')
const shopId = localStorage.getItem('shopId')

const img = "assets/img/telonelogo.png"

export default function SummarySalesShopAgent() {

    const today = new Date()
    const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
    const dateString = date.toString();

    const totalSales = useSelector(getShopAgentSales)
    const shopSales = useSelector(getShopSales)
    const loadingAgent = useSelector(getAgentLoadingStatus)
    
    const[currencyID, setCurrencyID] = useState('')
    const[currencyState, setCurrencyState] = useState('Currency')
    const[currencyActioned, setCurrencyActioned]= useState('')
    const[startDate, setStartDate] = useState('')
    const[endDate, setEndDate] = useState('')
    const[empty, setEmpty] = useState('')
    const[emptyAgent, setAgentEmpty] = useState('')
    const[validate, setValidate] = useState('')
    const[adminPortalUserId, setAdminPortalUserId]= useState('')
    const[agentName, setAgentName]= useState('')
    const[agentState, setAgentState]= useState('Find By Agent')
    const[userID, setUserID]= useState('')
    const[filterBy, setFilterBy]= useState('Transaction Status')
    const[status, setStatus]= useState(true)

    const currencyData = useSelector(getAllCurrencies)
    const agentData = useSelector(getShopAgents)
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

    const getUser =(id, firstname, surname)=>{
        setAdminPortalUserId(id)
        setUserID(id)
        setAgentState(firstname+" "+surname)
    }

    let renderedAgent = ''
    renderedAgent = agentData ? (
        <>
            <tr>
                <Dropdown.Item 
                    onClick={
                        () => {
                            setAdminPortalUserId(0)
                            setAgentState('All Shop Sales')
                        }
                    }
                    >All Sales
                </Dropdown.Item>
            </tr> 
            {
                agentData.map((user, index)=>(
                    <tr key={index}>
                        <AgentDropdown data={user} setUser={getUser}/>
                    </tr>
                ))
            }
        </>
    ):(<div><h1>Error</h1></div>)

    const salesData = adminPortalUserId===0 ? shopSales:totalSales

    const output2 = Object.entries(
        salesData.reduce((prev, { bundles }) => {
            prev[bundles.name] = prev[bundles.name] ? prev[bundles.name] + 1 : 1;
            return prev;
        }, {})
    )
    .map(([bundles, count]) => ({ bundles, count }))
    .sort((a, b) => b.count - a.count);

    console.log("the out put2: ",output2);

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

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
      content: ()=> componentRef.current,
      documentTitle: 'TelOne SmartWiFi Agent Sales Report',
      // onAfterPrint: ()=> alert('Printing Completed')
    })
    

    const salesTotalCalc = () =>{
        let successTotal = 0
        let total = 0

        salesData.map((item, i)=>{
            total += item.order.amount      
        })
        return(
            (Math.round((successTotal+total)*100)/100).toFixed(2)
        )
    }

    const submitRequest = async () => {
        if(currencyID===''||startDate==='' || endDate==='' || adminPortalUserId===''){
            if(startDate==='' || endDate===''){
                setValidate("Please select the start date and end date")
            }
            if(currencyID===''){
                setEmpty("Please select the currency")
            }
            if(adminPortalUserId===''){
                setAgentEmpty("Please select the agent")
            }
        }
        else if(startDate>endDate){
            setValidate("Invalid Time Range")
        }
        else{
            if(adminPortalUserId===0){
                dispatch(fetchAsyncSalesByShop({startDate, endDate, curId:currencyID, shopId, status}))                
            }
            else{
                dispatch(fetchAsyncAgentSalesByShop({curId:currencyID, userID, startDate, endDate, status}))
            }
        }
        setTimeout(()=>{
            setEmpty("")
            setValidate("")
        }, 3000)    
    }

    let loadingAnimation = 
    <tr className='' style={anime}>
      <td colspan={6}>
        <BeatLoader
          color={'#055bb5'}
          loading={loadingAgent}
          cssOverride={override}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </td>
    </tr>

    let agentSalesData = ''

    var count = Object.keys(salesData).length
    if(count>0){
        agentSalesData = (
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
        )
    }
    else{
        agentSalesData = 
        <tr>
        <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No {currencyState ==='Currency'?'':currencyState ==='USD'?'USD':currencyState ==='ZiG'&&'ZiG'} Agent Sales Found</h5></td>
        </tr>
    }

    let errorMsg =  
        <tr>
        <td colspan={7} className='text-center'><h5 style={{color: '#E91E63'}}>Opps something went wrong. Please refresh page</h5></td>
        </tr>

    let filterButton = <>
        <div className="dropdown" style={{paddingLeft: 10}}>
            <button 
                className="btn bg-gradient-primary dropdown-toggle" 
                type="button" 
                id="dropdownMenuButton" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
                >
                {filterBy}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                    <a  className="dropdown-item" 
                        onClick={(e)=>{
                            e.preventDefault()
                            setStatus(true)
                            setFilterBy("Successful Transactions")
                        }}>
                        Successful Transactions
                    </a>
                </li>
                <li>
                    <a  className="dropdown-item" 
                        onClick={(e)=>{
                            e.preventDefault()
                            setStatus(false)
                            setFilterBy("Failed Transactions")
                        }}>
                        Failed Transactions
                    </a>
                </li>
            </ul>
        </div>
    </>

  return (
    <>
        <div className='row'>
            <div className="col-12">
                <div className="card pb-0 p-3 mb-1">
                    <div className="row">
                        <div className="col-10 d-flex align-items-center">
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
                            {/* Users dropdown */}
                            <div className="dropdown" style={{marginLeft: 20}}>
                                <button 
                                    className="btn bg-gradient-primary dropdown-toggle" 
                                    type="button" 
                                    id="dropdownMenuButton" 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                    >
                                    {agentState}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {renderedAgent}
                                </ul>
                            </div>
                            {filterButton}
                            <div><sup style={{color: 'red', paddingLeft: 10}}>{emptyAgent}</sup></div>
                            <button onClick={()=>submitRequest()} className="btn btn-primary">Search</button>
                        </div>
                        <div className="col-2 text-end">
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
                                <h6 className="mb-0">SUMMARY AGENT SALES REPORT</h6>
                                <h6 className="mb-0">By: {agentState}</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 align-items-center">
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>From Date:</span><input type="date" style={{border: 0}} name="startDate" onChange={(e) => setStartDate(e.target.value)} value={startDate} max={dateString}/></h6>
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>To Date:</span><input type="date" style={{border: 0}} name="endDate" onChange={(e) => setEndDate(e.target.value)} value={endDate} max={dateString}/><sup style={{color: 'red', paddingLeft: 10}}>{validate}</sup></h6>
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Currency:</span> {currencyState}</h6>
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Transaction Status:</span> {status? "Successful":"Failed"}</h6>
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
                                {
                                    loadingAgent==='pending'?
                                    loadingAnimation: 
                                    loadingAgent ==='rejected'?
                                    errorMsg: agentSalesData
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