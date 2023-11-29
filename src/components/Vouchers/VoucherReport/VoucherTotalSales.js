import React, {useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToggleStatus } from '../../../store/toggle-slice';
import { fetchAsyncSoldVouchers, getLoadingStatus, getSoldUsedVouchers, getVouchersSoldByShop } from '../../../store/batch-slice';
import { useReactToPrint } from "react-to-print";
import { BeatLoader } from 'react-spinners';
import VoucherReportCard from '../VoucherReportCard/VoucherReportCard';
import { getAllShops } from '../../../store/entities-slice';
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
const fileName = "Sold Vouchers_"

const userRole = localStorage.getItem("role")
const img = "assets/img/telonelogo.png"

export default function VoucherTotalSales() {

    const today = new Date()
    const mydate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
    const dateString = mydate.toString();
    const dispatch = useDispatch()
    const active = useSelector(getToggleStatus)
    const loading = useSelector(getLoadingStatus)
    const soldVouchers = useSelector(getSoldUsedVouchers)
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
                        Used Vouchers
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

    const submitRequest = async (e) => {
      e.preventDefault();
      if(status===''){
        setValidate("Please select the start date and end date")
      }
      else{
        dispatch(fetchAsyncSoldVouchers({status}))
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
    const totalPages = Math.ceil(soldVouchers.length / itemsPerPage);

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
    const paginatedData = soldVouchers.slice(startIndex, endIndex);

    const count = Object.keys(paginatedData).length;

    let renderedBundles = ''
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
    
    let newObj = [];

    // const convertDate = (dateCreated) => {
    //   const dateString = new Date(dateCreated);
    //   const day = dateString.toLocaleDateString('en-GB', { day: 'numeric' });
    //   const month = dateString.toLocaleDateString('en-GB', { month: 'long' });
    //   const year = dateString.toLocaleDateString('en-GB', { year: 'numeric' });
    //   // const hours = dateString.getHours().toString().padStart(2, '0');
    //   // const minutes = dateString.getMinutes().toString().padStart(2, '0');
      
    //   return `${day} ${month} ${year}`;
    //   // return `${day} ${month} ${year} \t\t ${hours}:${minutes}`;
    // };

    const convertDate = (dateCreated) => {
      const dateString = new Date(dateCreated);
      const day = dateString.getDate().toString().padStart(2, '0');
      const month = (dateString.getMonth() + 1).toString().padStart(2, '0');
      const year = dateString.getFullYear().toString().slice(-2);
      
      return `${day}/${month}/${year}`;
    }
    const convertDateTime = (dateCreated) => {
      const dateString = new Date(dateCreated);
      const day = dateString.toLocaleDateString('en-GB', { day: '2-digit' });
      const month = dateString.toLocaleDateString('en-GB', { month: '2-digit' });
      const year = dateString.toLocaleDateString('en-GB', { year: '2-digit' });
      const hours = dateString.getHours().toString().padStart(2, '0');
      const minutes = dateString.getMinutes().toString().padStart(2, '0');
      const seconds = dateString.getSeconds().toString().padStart(2, '0');
      
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    const convertTime = (timeCreated) => {
      const timeArray = timeCreated;
      const newTime = timeArray.join(':');
      
      return newTime;
    }

    if (soldVouchers.length > 0) {
      soldVouchers.map((item, i) => {
        newObj.push({
          voucherCode: item.vouchers.voucherCode,
          usageDate: item.order.dateCreated > new Date('2023-04-14') ? convertDate(item.order.dateCreated) + " " + convertTime(item.order.timeCreated ? item.order.timeCreated : [0, 0, 0]):"",
          product: item.bundles.name,
          soldBy: `${item.order.adminPortalUsersId === 1?"Unavailable": item.order.firstName + " " + item.order.surname }`,
          dateSold: `${item.vouchers.dateUsed?convertDateTime(item.vouchers.dateUsed):"Unavailbale"}`,
          status: item.vouchers.used?"Used":"Not Used"
        });
      });
    }
    const newArray = newObj
    console.log("new: ",newArray)

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8';
    const fileExtension = '.xlsx'

    const exportToExcel = async () => {
      const ws = XLSX.utils.json_to_sheet(newArray);
      const wb = { Sheets: {'data': ws}, SheetNames: ['data']};
      const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
      const data = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(data, fileName + dateString + fileExtension)
    }
      
    let displayData = ""
    if(userRole === "Admin"){
      displayData=
      <div className='row'>
            <div className="col-12">
                <div className="card pb-0 p-3 mb-1">
                    <div className="row">
                        <div className="col-8 d-flex align-items-center">
                          {filterButton}
                          <div><sup style={{color: 'red', paddingLeft: 10}}>{empty}</sup></div>
                          <button onClick={submitRequest} className="btn btn-primary">Search</button>
                          <div className="d-flex align-items-center justify-content-between mx-2">
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
                        </div>
                        <div className="col-4 text-end">
                          <button class="btn btn-link text-success text-sm mb-0 px-0 ms-4"  onClick={(e)=>exportToExcel(fileName)}><i class="material-icons text-lg position-relative me-1">download</i> DOWNLOAD EXCELL</button>
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
                                <h6 className="mb-0">Sales Total</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 align-items-center">
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>NB: Reporting Voucher Usage from Start Date (14 April 2023)</span></h6>
                                {/* <h6 className="mb-0 ms-2"><span style={{width:100}}>NB:</span><input type="date" style={{border: 0}} name="startDate" onChange={(e) => setStartDate(e.target.value)} value={startDate} max={dateString}/></h6> */}
                                {/* <h6 className="mb-0 ms-2"><span style={{width:100}}>To Date:</span><input type="date" style={{border: 0}} name="endDate" onChange={(e) => setEndDate(e.target.value)} value={endDate} max={dateString}/><sup style={{color: 'red', paddingLeft: 10}}>{validate}</sup></h6> */}
                                <h6 className="mb-0 ms-2"><span style={{width:100}}>Usage Status:</span> {status? "Used":"Not Used"}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-3 pb-0">
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