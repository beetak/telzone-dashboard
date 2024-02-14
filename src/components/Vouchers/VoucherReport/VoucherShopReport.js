import React, {useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToggleStatus } from '../../../store/toggle-slice';
import { fetchSoldVouchers, fetchSoldVouchersByAgentAndDate, fetchSoldVouchersByDate, fetchSoldVouchersByShopAndDate, getLoadingStatus, getSoldByShop, getSoldVouchers, getVouchersSoldByShop } from '../../../store/batch-slice';
import { fetchAsyncBundles, getAllBundles } from '../../../store/bundle-slice';
import { useReactToPrint } from "react-to-print";
import { BeatLoader } from 'react-spinners';
import VoucherReportCard from '../VoucherReportCard/VoucherReportCard';
import { fetchAsyncShops, getAllShops } from '../../../store/entities-slice';
import { saleActions } from '../../../store/sales-slice';
import TelOneShopDropdown from '../../TelOneShops/TelOneShopDropdown/TelOneShopDropdown';
import VoucherUsage from '../../tabs/voucherUsage/main';

const userRole = localStorage.getItem("role")
const userId = localStorage.getItem('userId')
const userShop = localStorage.getItem('shopId')
const img = "assets/img/telonelogo.png"

export default function VoucherShopReport() {

    const today = new Date()
    const mydate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
    const dateString = mydate.toString();

    const dispatch = useDispatch()
    const active = useSelector(getToggleStatus)
    const loading = useSelector(getLoadingStatus)
    const soldVouchers = useSelector(getSoldVouchers)
    const shops = useSelector(getAllShops)
    const soldByShop = useSelector(getVouchersSoldByShop)

    const [date, setDate] = useState("")
    const [shopId, setShopId] = useState('')
    const [shopName, setShopName] = useState('All Shops')
    const [shopState, setShopState] = useState('Select Shop')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [empty, setEmpty] = useState('')
    const [validate, setValidate] = useState('')
    const [searchLevel, setSearchLevel] = useState('')
    const [filterBy, setFilterBy] = useState('Usage Status')
    const [status, setStatus] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    var paginationData = ""

    var c = soldVouchers?.data ? Object.keys(soldVouchers.data.data).length : 0;
    var c2 = soldByShop?.data? Object.keys(soldByShop.data.data).length:0

    if(c>0) {
      paginationData = soldVouchers
    }
    else if(c2>0){
      paginationData = soldByShop.data.data
    }
    else{
      paginationData = ""
    }

    //SHOPS DATA
    const getShop =(id, name)=>{
        setShopId(id)
        setShopName(name)
        setShopState(name)
        setSearchLevel("shop")
        dispatch(saleActions.clearSales())
    }

    let renderedShop = ''
    renderedShop = shops ? (
      shops.map((role, index)=>(
        role.id!==1&&
        <tr key={index}>
          <TelOneShopDropdown data={role} setShop={getShop}/>
        </tr>
      ))
    ):(<div><h1>Error</h1></div>)
  
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
                            setFilterBy("Used")
                        }}>
                        Used
                    </a>
                </li>
                <li>
                    <a  className="dropdown-item" 
                        onClick={(e)=>{
                            e.preventDefault()
                            setStatus(false)
                            setFilterBy("Not Used")
                        }}>
                        Not Used
                    </a>
                </li>
            </ul>
        </div>
    </>

    useEffect(() => {
      dispatch(fetchAsyncShops(active))
    }, [dispatch, active]);

    const submitRequest = async (e) => {
      e.preventDefault();
      if(shopState===''||startDate==='' || endDate===''){
        if(startDate==='' || endDate===''){
          setValidate("Please select the start date and end date")
        }
        if(shopState===''){
          setEmpty("Please select the shop")
        }
      }
      else if(startDate>endDate){
        setValidate("Invalid Time Range")
      }
      else{
        if(userRole==="Finance Manager" || userRole==="Admin")
          dispatch(fetchSoldVouchersByShopAndDate({startDate, endDate, shopId, status}))
        else
          dispatch(fetchSoldVouchersByShopAndDate({startDate, endDate, shopId:userShop, status}))
      }
      setTimeout(()=>{
          setEmpty("")
          setValidate("")
      }, 3000)  
    };

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

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
      content: ()=> componentRef.current,
      documentTitle: 'TelOne SmartWiFi National Sales Summary Report',
      // onAfterPrint: ()=> alert('Printing Completed')
    })
    
    let renderedBundles = ''

    const totalPages = Math.ceil(paginationData.length / itemsPerPage);

    const goToPreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const goToNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = paginationData.slice(startIndex, endIndex);

    const count = Object.keys(paginatedData).length;

    if(count>0){
      renderedBundles = paginatedData.map((bundle, index)=>(
          <tr key={index}>
            <VoucherReportCard data={bundle} index={index}/>
          </tr>
        ))
    }
    else{
      renderedBundles = 
      <tr>
        <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>Not Found</h5></td>
      </tr>
    }
  
    let errorMsg =  
      <tr>
        <td colspan={7} className='text-center'><h5 style={{color: '#E91E63'}}>Opps something went wrong. Please refresh page</h5></td>
      </tr>
      
    let displayData = ""
    if(userRole === "Admin"){
      displayData=
      <div className='row'>
            <div className="col-12">
                <div className="card pb-0 p-3 mb-1">
                    <div className="row">
                        <div className="col-10 d-flex align-items-center">
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
                          {filterButton}
                          <div><sup style={{color: 'red', paddingLeft: 10}}>{empty}</sup></div>
                          <button onClick={submitRequest} className="btn btn-primary">Search</button>
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
                                <h6 className="mb-0">SUMMARY NATIONAL VOUCHER USAGE REPORT</h6>
                                <h6 className="mb-0">Vouchers Records</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 align-items-center">
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>From Date:</span><input type="date" style={{border: 0}} name="startDate" onChange={(e) => setStartDate(e.target.value)} value={startDate} max={dateString}/></h6>
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>To Date:</span><input type="date" style={{border: 0}} name="endDate" onChange={(e) => setEndDate(e.target.value)} value={endDate} max={dateString}/><sup style={{color: 'red', paddingLeft: 10}}>{validate}</sup></h6>
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Usage Status:</span> {status? "Used":"Not Used"}</h6>
                            </div> 
                            <div className="col-6 align-items-center">
                                {/* <h6 className="mb-0 ms-2"><span style={{width:100}}>Region:</span> {region==='No Region'? 'All Regions': region}</h6>
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Town:</span> {town==='No Town'? 'All Towns': town}</h6> */}
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Shop:</span> {shopState}</h6>
                            </div> 
                        </div>
                    </div>
                    <div className="card-body p-3 pb-0">
                        <div className="d-flex align-items-center justify-content-between mb-2 mx-2">
                          <div className="d-flex align-items-center mx-2">
                            <h6 className="mb-1 text-dark text-sm me-2">Show </h6>
                            <div className="dropdown">
                              <button className="btn bg-gradient-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" style={{width:100}}>
                                {itemsPerPage}
                              </button>
                              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a className="dropdown-item" onClick={()=>setItemsPerPage(5)}>5</a></li>
                                <li><a className="dropdown-item" onClick={()=>setItemsPerPage(10)}>10</a></li>
                                <li><a className="dropdown-item" onClick={()=>setItemsPerPage(15)}>15</a></li>
                                <li><a className="dropdown-item" onClick={()=>{setItemsPerPage(soldVouchers.length); setCurrentPage(1)}}>All</a></li>
                              </ul>
                            </div>
                            <h6 className="mb-1 text-dark text-sm ms-2">Entries </h6>
                          </div> 
                        </div>
                        <table className="table align-items-center mb-0 p-5">
                          <thead>
                            <tr>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Voucher Code</th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Bundle Type</th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Price</th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Date Sold</th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Date Used</th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Sold By</th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              loading==='pending'?
                                loadingAnimation: 
                                loading ==='rejected'?
                                  errorMsg: renderedBundles
                            }
                          </tbody>
                        </table>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                        <p>Showing Page {currentPage} of {totalPages}</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <button 
                        className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 p-3 btn-sm d-flex align-items-center justify-content-center"
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                      ><i className="material-icons text-lg">chevron_left</i></button>
                      <div className="d-flex flex-column" style={{ marginRight: "20px" }}>
                        <h6 className="mb-1 text-dark text-sm">{currentPage}</h6>
                      </div>
                      <button 
                        className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 p-3 btn-sm d-flex align-items-center justify-content-center"
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                      ><i className="material-icons text-lg">chevron_right</i></button>
                    </div>
                    {/* <div className="col-12" style={{textAlign: 'center'}}><h6>Disclaimer: To sum up both online and physical shop sales.</h6></div> */}
                </div>
            </div>
        </div>
    }

    return (
      <>
        {displayData}
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