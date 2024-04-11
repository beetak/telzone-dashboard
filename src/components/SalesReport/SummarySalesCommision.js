import React, {useState, useRef, useEffect} from 'react';
import { fetchAsyncSalesByCurrencyId, fetchAsyncSalesByRegion, fetchAsyncSalesByShop, fetchAsyncSalesByTown, getAgentLoadingStatus, getLoadingStatus, getRegionSales, getShopSales, getTotalSales, getTownSales, saleActions } from '../../store/sales-slice';
import { useDispatch, useSelector } from 'react-redux';
import { currencyActions, fetchAsyncCurrency, getAllCurrencies } from '../../store/currency-slice';
import CurrencyDropdown from '../Currency/CurrencyDropdown/CurrencyDropdown';
import { useReactToPrint } from "react-to-print";
import { toggleActions } from '../../store/toggle-slice';
import { getAllBusinessPartners } from '../../store/business-slice';
import { BeatLoader } from 'react-spinners';
import { getAllCustomerPayments, getOnlineLoading, getPeriodicalPayments } from '../../store/customerPayments-slice';
import TelOneShopDropdown from '../TelOneShops/TelOneShopDropdown/TelOneShopDropdown';
import { fetchAsyncShopByTown, fetchAsyncTownByRegion, getAllRegions, getRegionTowns, getTownShops } from '../../store/entities-slice';
import TelOneTownDropdown from '../TelOneTowns/TelOneTownDropdown/TelOneTownDropdown';
import TelOneRegionDropdown from '../TelOneRegions/TelOneRegionDropdown/TelOneRegionDropdown';
// import datetime from 'datetime'

const firstname = localStorage.getItem('firstname')
const surname = localStorage.getItem('surname')
const userRole = localStorage.getItem('role')
const userTownName = localStorage.getItem('townName')
const userTownId = localStorage.getItem('townId')
const userRegion = localStorage.getItem('regionName')
const userRegionId = localStorage.getItem('regionId')
const img = "assets/img/telonelogo.png"

export default function SummarySalesCommission() {

    useEffect(() => {
        dispatch(fetchAsyncCurrency(true))
        
        if (userRole === 'Supervisor' || userRole === 'Area Manager' || userRole === 'Regional Manager'){
            dispatch(fetchAsyncShopByTown(userTownId))
        }
        if (userRole === 'Regional Accountant' || userRole === 'Regional Manager'){
            dispatch(fetchAsyncTownByRegion(userRegionId))
            setRegion(userRegion)
        }
        if(userRole==="Area Manager"){
            setSearchLevel("town")
            setTownId(userTownId)
            setTown(userTownName)
            setRegion(userRegion)
        }
    }, [userRole]);

    const today = new Date()
    const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
    const dateString = date.toString();

    const totalSales = useSelector(getTotalSales)
    const regionSales = useSelector(getRegionSales)
    const townSales = useSelector(getTownSales)
    const shopSales = useSelector(getShopSales)
    const currencyData = useSelector(getAllCurrencies)
    const businessPartnersData = useSelector(getAllBusinessPartners)

    //Loading States
    const loadingAgent = useSelector(getAgentLoadingStatus)
    const loadingOnline = useSelector(getOnlineLoading)
    
    const[currencyID, setCurrencyID] = useState('')
    const[currencyState, setCurrencyState] = useState('Currency')
    const[regionState, setRegionState] = useState('Region')
    const[townState, setTownState] = useState('Town')
    const[shopState, setShopState] = useState('Shop')
    const[currencyActioned, setCurrencyActioned]= useState('')
    const[regionId, setRegionId] = useState('')
    const[region, setRegion] = useState('All Regions')
    const[shopId, setShopId] = useState('')
    const[shopName, setShopName] = useState('All Shops')
    const[townId, setTownId] = useState('')
    const[town, setTown] = useState('All Towns')
    const[startDate, setStartDate] = useState('')
    const[endDate, setEndDate] = useState('')
    const[empty, setEmpty] = useState('')
    const[validate, setValidate] = useState('')
    const [searchLevel, setSearchLevel] = useState('')
    const [filterBy, setFilterBy] = useState('Transaction Status')
    const [status, setStatus] = useState(true)

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

    //SHOPS DATA
    const shopData = useSelector(getTownShops)
    const getShop =(id, name)=>{
        setShopId(id)
        setShopName(name)
        setShopState(name)
        setSearchLevel("shop")
        dispatch(saleActions.clearSales())
    }
    let renderedShop = ''
    renderedShop = shopData ? (
        <>
            <tr>
                <a  className="dropdown-item"
                    onClick={()=>{
                        setSearchLevel("town")
                        setShopState("All Shops") 
                        setShopName("All Shops")
                        dispatch(saleActions.clearSales())
                    }}
                >
                    Select All
                </a>
            </tr>
            {
                shopData.map((role, index)=>(
                    <tr key={index}>
                      <TelOneShopDropdown data={role.shop} setShop={getShop}/>
                    </tr>
                ))
            }
        </>
    ):(<div><h1>Error</h1></div>)

    //TOWNS DATA
    const townData = useSelector(getRegionTowns)
    const getTown =(id, name)=>{
        setTownId(id)
        setTown(name)
        setTownState(name)
        setShopName("All Shops")
        setShopState("All Shops")
        setSearchLevel("town")
        dispatch(fetchAsyncShopByTown(id))
    }
    let renderedTown = ''
    renderedTown = townData ? (
        <>
            {
                userRole !== 'Regional Manager' || userRole !== 'Regional Accountant' && <tr>
                    <a  className="dropdown-item"
                        onClick={()=>{setSearchLevel("regional"); setTownState("All Towns")}}>
                        Select All
                    </a>
                </tr>
            }
            {
                townData.map((role, index)=>(
                    <tr key={index}>
                      <TelOneTownDropdown data={role.town} setTown={getTown}/>
                    </tr>
                ))
            }
        </>
    ):(<div><h1>Error</h1></div>)

    //REGIONS DATA
    const regionData = useSelector(getAllRegions)
    const getRegion =(id, name)=>{
        setRegionId(id)
        setRegion(name)
        setRegionState(name)
        setTown("All Towns")
        setTownState("All Towns")
        setShopState("All Shops")
        setShopName("All Shops")
        setSearchLevel(name==='No Region'?'':"regional")
        dispatch(fetchAsyncTownByRegion(id))
    }
    
    let renderedRegions = ''
    renderedRegions = regionData ? (
      regionData.map((region, index)=>(
        <tr key={index}>
          <TelOneRegionDropdown data={region} setRegion={getRegion}/>
        </tr>
      ))
    ):(<div><h1>Error</h1></div>)

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

    // const salesData = regionSales
    const salesData = searchLevel === 'regional' ? regionSales : searchLevel === 'town' ? townSales : searchLevel === 'shop' ? shopSales:totalSales
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

    console.log("the output2: ",output3);

    const displayByBundle = (businessPartner, discount) => {
        let mybundles = []
        output3.map((bundleItem)=>{
            salesData.map((item, i)=>{
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
                    <div style={{width: '10%', textAlign: 'center'}}>{count}</div>
                    <div style={{width: '30%', textAlign: 'right', paddingRight: 30}}>${(Math.round(totalAmount*100)/100).toFixed(2)}</div>
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

    const submitRequest = async () => {
        // setEndDate(endDate)
        if(currencyID===''||startDate==='' || endDate===''){
            if(startDate==='' || endDate===''){
                setValidate("Please select the start date and end date")
            }
            if(currencyID===''){
                setEmpty("Please select the currency")
            }
        }
        else if(startDate>endDate){
            setValidate("Invalid Time Range")
        }
        else{
            if(searchLevel === "regional"){
                dispatch(fetchAsyncSalesByRegion({startDate, endDate, curId:currencyID, regionId, status}))
            }
            else if(searchLevel === "town"){
                dispatch(fetchAsyncSalesByTown({startDate, endDate, curId:currencyID, townId, status}))
            }
            else if(searchLevel === "shop"){
                dispatch(fetchAsyncSalesByShop({startDate, endDate, curId:currencyID, shopId, status}))
            }
            else{
                dispatch(fetchAsyncSalesByCurrencyId({startDate, endDate, curId:currencyID, status}))
            }
        }
        setTimeout(()=>{
            setEmpty("")
            setValidate("")
        }, 3000)
        
    }

    let agentSalesData = ''

    var count = Object.keys(salesData).length
    if(count>0){
        agentSalesData = (
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
        )
    }
    else{
        agentSalesData = 
        <tr>
        <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No {currencyState ==='Currency'?'':currencyState ==='USD'?'USD':currencyState ==='ZiG'&&'ZiG'} Commissions Found</h5></td>
        </tr>
    }

    let errorMsg =  
        <tr>
        <td colspan={7} className='text-center'><h5 style={{color: '#E91E63'}}>Opps something went wrong. Please refresh page</h5></td>
        </tr>

    let selectionLevel = ''

    if(userRole === 'Supervisor' || userRole === 'Area Manager'){
        {/* Shop Dropdown */}
        selectionLevel =
        <div className="dropdown"  style={{paddingLeft: 10}}>
            <button 
                className="btn bg-gradient-primary dropdown-toggle" 
                type="button" 
                id="dropdownMenuButton" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
                >
                {shopState}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {renderedShop}
            </ul>
        </div>
    }
    else if( userRole === 'Regional Manager' || userRole === 'Regional Accountant'){
        selectionLevel = <>
            {/* Town Dropdown */}
            <div className="dropdown"  style={{paddingLeft: 10}}>
                <button 
                    className="btn bg-gradient-primary dropdown-toggle" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    >
                    {townState}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {renderedTown}
                </ul>
            </div>
            {/* Shop Dropdown */}
            <div className="dropdown"  style={{paddingLeft: 10}}>
                <button 
                    className="btn bg-gradient-primary dropdown-toggle" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    >
                    {shopState}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {renderedShop}
                </ul>
            </div>
        </>
    }
    else{
        selectionLevel =
        <>
            {/* Region Dropdown */}
            <div className="dropdown"  style={{paddingLeft: 10}}>
                <button 
                    className="btn bg-gradient-primary dropdown-toggle" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    >
                    {regionState}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {renderedRegions}
                </ul>
            </div>
            {/* Town Dropdown */}
            <div className="dropdown"  style={{paddingLeft: 10}}>
                <button 
                    className="btn bg-gradient-primary dropdown-toggle" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    >
                    {townState}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {renderedTown}
                </ul>
            </div>
            {/* Shop Dropdown */}
            <div className="dropdown"  style={{paddingLeft: 10}}>
                <button 
                    className="btn bg-gradient-primary dropdown-toggle" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    >
                    {shopState}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {renderedShop}
                </ul>
            </div>
        </>
    }

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
                            {selectionLevel}
                            {filterButton}
                            <div><sup style={{color: 'red', paddingLeft: 10}}>{empty}</sup></div>
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
                                <h6 className="mb-0">SUMMARY NATIONAL SALES COMMISSION REPORT</h6>
                                <h6 className="mb-0">National Total</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 align-items-center">
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>From Date:</span><input type="date" style={{border: 0}} name="startDate" onChange={(e) => setStartDate(e.target.value)} value={startDate} max={dateString}/></h6>
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>To Date:</span><input type="date" style={{border: 0}} name="endDate" onChange={(e) => setEndDate(e.target.value)} value={endDate} max={dateString}/><sup style={{color: 'red', paddingLeft: 10}}>{validate}</sup></h6>
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Currency:</span> {currencyState}</h6>
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Transaction Status:</span> {status? "Successful":"Failed"}</h6>
                            </div>
                            <div className="col-6 align-items-center">
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Region:</span> {region==='No Region'? 'All Regions': region}</h6>
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Town:</span> {town==='No Town'? 'All Towns': town}</h6>
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Shop:</span> {shopName==='No Shop'? 'All Shops': shopName}</h6>
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
                                            <div style={{width: '5%', textAlign: 'right'}}>Quantity</div>
                                            <div style={{width: '30%', textAlign: 'right', paddingRight: 0}}>Total Sales</div>
                                            <div style={{width: '35%', textAlign: 'right', paddingRight: 50}}>Total Commissions</div>
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
                                    <td>Total Commission Payable</td>
                                    <td></td>
                                    <td>
                                        <div className="row">
                                            <div style={{textAlign: 'right', paddingRight: 75}}>${salesTotalCalc()}</div>
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