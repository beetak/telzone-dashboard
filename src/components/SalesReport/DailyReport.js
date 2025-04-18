import React, {useState, useRef} from 'react';
import { fetchAsyncSalesByAgent, getAgentSales, getAllSales, getLoadingStatus } from '../../store/sales-slice';
import { useDispatch, useSelector } from 'react-redux';
import { currencyActions, getAllCurrencies } from '../../store/currency-slice';
import CurrencyDropdown from '../Currency/CurrencyDropdown/CurrencyDropdown';
import { useReactToPrint } from "react-to-print";
import { BeatLoader } from 'react-spinners';

const firstname = localStorage.getItem('firstname')
const surname = localStorage.getItem('surname')
const userID = localStorage.getItem('userId')
const img = "assets/img/telonelogo.png"

export default function DailyReport() {

    const agentSales = useSelector(getAgentSales)
    const loading = useSelector(getLoadingStatus)
    
    const[currencyID, setCurrencyID] = useState('')
    const[currencyState, setCurrencyState] = useState('Currency')
    const[currencyActioned, setCurrencyActioned]= useState('')
    const[transactionDate, setTransactionDate]= useState('')
    const[empty, setEmpty] = useState('')
    const[validate, setValidate] = useState('')
    const[filterBy, setFilterBy] = useState('Transaction Status')
    const[status, setStatus] = useState(true)

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

    let loadingAnimation = 
    <tr className='' style={anime}>
      <td colspan={6}>
        <BeatLoader
          color={'#055bb5'}
          loading={loading}
          cssOverride={override}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </td>
    </tr>

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
                count += items.order.quantity
                totalAmount += items.order.amount
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
            salesTotal += item.order.amount
        })
        return(
            (Math.round(salesTotal*100)/100).toFixed(2)
        )
    }

    const submitRequest = async () => {
        // setEndDate(endDate)
        if(currencyID===''||transactionDate===''){
            if(transactionDate===''){
                setValidate("Please select the start date and end date")
            }
            if(currencyID===''){
                setEmpty("Please select the currency")
            }
        }
        else{
            dispatch(fetchAsyncSalesByAgent({curId: currencyID, userID, date: transactionDate, status}))  
        }
        setTimeout(()=>{
            setEmpty("")
            setValidate("")
        }, 3000)    
    }

    let agentSalesData = ''

    var count = Object.keys(agentSales).length
    if(count>0){
        agentSalesData = (
            output.map((item)=>(
                <tr key={item.bundles}>
                    <th scope="row">{item.bundles}</th>
                    <td colSpan={4} className="text-center">
                        {displayByPartner(item.bundles)}
                    </td>
                </tr>
            ))
        )
    }
    else{
        agentSalesData = 
        <tr>
        <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No {currencyState ==='Currency'?'':currencyState ==='USD'?'USD':currencyState ==='ZiG'&&'ZiG'} Sales Record Found</h5></td>
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
                            {filterButton}
                            <div><sup style={{color: 'red', paddingLeft: 10}}>{empty}</sup></div>
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
                                <h6 className="mb-0">SUMMARY DAY END SALES REPORT</h6>
                                <h6 className="mb-0">By: {firstname} {surname}</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 align-items-center">
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Cashier:</span> {firstname} {surname}</h6>
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Region:</span></h6>
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Town:</span></h6>
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Shop:</span></h6>
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Date:</span> <input type="date" style={{border: 0}} name="date" onChange={(e) => setTransactionDate(e.target.value)} value={transactionDate}/></h6>
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
                                            <div style={{width: '25%', textAlign: 'left'}}>Customer</div>
                                            <div style={{width: '25%', textAlign: 'left'}}>Payment Method</div>
                                            <div style={{width: '25%'}}>Quantity</div>
                                            <div style={{width: '25%'}}>Total Collections</div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading==='pending'?
                                    loadingAnimation: 
                                    loading ==='rejected'?
                                      errorMsg: agentSalesData
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