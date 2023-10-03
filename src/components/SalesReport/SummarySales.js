import React, {useState, useRef, useEffect} from 'react';
import { fetchAsyncSalesByCurrencyId, fetchAsyncSalesByRegion, fetchAsyncSalesByShop, fetchAsyncSalesByTown, getAgentLoadingStatus, getAgentSales, getAllSales, getRegionSales, getShopSales, getTotalSales, getTownSales, saleActions } from '../../store/sales-slice';
import { useDispatch, useSelector } from 'react-redux';
import { currencyActions, fetchAsyncCurrency, getAllCurrencies } from '../../store/currency-slice';
import CurrencyDropdown from '../Currency/CurrencyDropdown/CurrencyDropdown';
import { useReactToPrint } from "react-to-print";
import { fetchAsyncPeriodicalPayments, getAllCustomerPayments, getOnlineLoading, getPeriodicalPayments } from '../../store/customerPayments-slice';
import { fetchAsyncShopByTown, fetchAsyncTownByRegion, getAllRegions, getAllShops, getAllTowns, getRegionTowns, getTownShops } from '../../store/entities-slice';
import TelOneRegionDropdown from '../TelOneRegions/TelOneRegionDropdown/TelOneRegionDropdown';
import TelOneTownDropdown from '../TelOneTowns/TelOneTownDropdown/TelOneTownDropdown';
import TelOneShopDropdown from '../TelOneShops/TelOneShopDropdown/TelOneShopDropdown';
import { BeatLoader } from 'react-spinners';

const firstname = localStorage.getItem('firstname')
const surname = localStorage.getItem('surname')
const userRole = localStorage.getItem('role')
const userTownName = localStorage.getItem('townName')
const userTownId = localStorage.getItem('townId')
const userRegion = localStorage.getItem('regionName')
const userRegionId = localStorage.getItem('regionId')
const img = "assets/img/telonelogo.png"

export default function SummarySales() {

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

    useEffect(() => {
        dispatch(fetchAsyncCurrency(true))
        if (userRole === 'Supervisor' || userRole === 'Area Manager'){
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
    const periodicalSales = useSelector(getPeriodicalPayments)
    const onlineSales = useSelector(getAllCustomerPayments)
    const shopSales = useSelector(getShopSales)
    const townSales = useSelector(getTownSales)
    const regionSales = useSelector(getRegionSales)

    //Loading States
    const loadingAgent = useSelector(getAgentLoadingStatus)
    const loadingOnline = useSelector(getOnlineLoading)

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
                (userRole === 'Super Admin' || userRole === 'Admin' || userRole === 'Head Retail' || userRole === 'Finance Manager') && <tr>
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


    const data = currencyID === 'currency'? onlineSales : periodicalSales
    // const salesData = totalSales
    const salesData = searchLevel === 'regional' ? regionSales : searchLevel === 'town' ? townSales : searchLevel === 'shop' ? shopSales:totalSales

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

    const output = Object.entries(
        data.reduce((prev, { bundleId }) => {
            prev[bundleId.name] = prev[bundleId.name] ? prev[bundleId.name] + 1 : 1;
            return prev;
        }, {})
    )
    .map(([bundleId, count]) => ({ bundleId, count }))
    .sort((a, b) => b.count - a.count);

    console.log("data, ", salesData)
    console.log("the out put: ",output);

    // let dataToUse = salesData;
    // if (salesData === null) {
    // dataToUse = totalSales;
    // }

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

    const getBundleName = (data) => {
        let bname = '';
      
        periodicalSales.map((items, i) => {
          if (items.bundleId.name === data.bundleId && items.status !== 'FAILED') {
            bname = data.bundleId;
          }
        });
      
        if (bname !== '') {
          return (
            <tr>
                <th scope="row">{bname}</th>
                <td className="text-align-right">
                    <div className="row">
                        {calculateByPartner(data.bundleId)}
                    </div>
                </td>
            </tr>
          );
        } else {
          return null;
        }
    };

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
      content: ()=> componentRef.current,
      documentTitle: 'TelOne SmartWiFi National Sales Summary Report',
      // onAfterPrint: ()=> alert('Printing Completed')
    })
    

    const salesTotalCalc = () =>{
        let successTotal = 0
        let total = 0
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
                dispatch(fetchAsyncPeriodicalPayments({startDate, endDate, curSymbol:currencyState}))
            }
            else if(searchLevel === "town"){
                dispatch(fetchAsyncSalesByTown({startDate, endDate, curId:currencyID, townId, status}))
                dispatch(fetchAsyncPeriodicalPayments({startDate, endDate, curSymbol:currencyState}))
            }
            else if(searchLevel === "shop"){
                dispatch(fetchAsyncSalesByShop({startDate, endDate, curId:currencyID, shopId, status}))
                dispatch(fetchAsyncPeriodicalPayments({startDate, endDate, curSymbol:currencyState}))
            }
            else{
                if (userRole === 'Supervisor' || userRole === 'Area Manager'){
                    if(searchLevel === "town")
                        dispatch(fetchAsyncSalesByTown({startDate, endDate, curId:currencyID, townId, status}))
                    else
                        dispatch(fetchAsyncSalesByShop({startDate, endDate, curId:currencyID, shopId, status}))
                }
                if (userRole === 'Regional Manager' || userRole === 'Regional Accountant'){
                    dispatch(fetchAsyncSalesByShop({startDate, endDate, curId:currencyID, shopId, status}))
                }
                else{
                    dispatch(fetchAsyncSalesByCurrencyId({startDate, endDate, curId:currencyID, status}))
                    dispatch(fetchAsyncPeriodicalPayments({startDate, endDate, curSymbol:currencyState}))
                }
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
        <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No {currencyState ==='Currency'?'':currencyState ==='USD'?'USD':currencyState ==='ZWL'&&'ZWL'} Agent Sales Found</h5></td>
        </tr>
    }

    let errorMsg =  
        <tr>
        <td colspan={7} className='text-center'><h5 style={{color: '#E91E63'}}>Opps something went wrong. Please refresh page</h5></td>
        </tr>

    let onlineSalesData = ''

    var count = Object.keys(periodicalSales).length
    if(count>0){
        onlineSalesData = (
            output.map((item)=>(
                getBundleName(item)
            ))
        )
    }
    else{
        onlineSalesData = 
        <tr>
        <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No {currencyState ==='Currency'?'':currencyState ==='USD'?'USD':currencyState ==='ZWL'&&'ZWL'} Online Sales Found</h5></td>
        </tr>
    }

    let errorMsg1 =  
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
                                <h6 className="mb-0">SUMMARY NATIONAL SALES REPORT</h6>
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
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Shop:</span> {shopName}</h6>
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
                                    userRole === "Super Admin" || userRole === "Admin" || userRole === "Head Retail" ?
                                    (
                                        <>
                                            <tr>Online Sales</tr>
                                            {
                                                loadingOnline==='pending'?
                                                loadingAnimation: 
                                                loadingOnline ==='rejected'?
                                                errorMsg1: onlineSalesData
                                                
                                            }
                                        </>
                                    ):""
                                }
                                <tr>Agent Sales</tr>
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
                                            <div style={{textAlign: 'right', paddingRight: 70}}>${salesTotalCalc()}</div>
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