import React, {useState, useRef, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from "react-to-print";
import { BeatLoader } from 'react-spinners';
import SessionsDropdown from '../Session/SessionsDropdown/SessionsDropdown';
import VoucherUsage from '../tabs/voucherUsage/main';
import { getLoadingStatus } from '../../store/batch-slice';
import Api from '../Api/Api';
import SMSVoucherReportCard from '../Vouchers/VoucherReportCard/SMSVoucherReportCard';

const userRole = localStorage.getItem("role")
const img = "assets/img/telonelogo.png"

export default function SummarySessionSales() {

    const [shopState, setShopState] = useState('Select Shop')
    const [loadingState, setLoadingState] = useState(false)
    const [loadingError, setLoadingError] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [empty, setEmpty] = useState('')
    const [validate, setValidate] = useState('')
    const [status, setStatus] = useState(true)
    const [sessionState, setSessionState] = useState('Session')
    const [sessionId, setSessionId] = useState('')
    const [sessions, setSessions] = useState([])
    const [soldVouchers, setSoldVouchers] = useState([])

    const today = new Date()
    const mydate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
    const dateString = mydate.toString();

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    useEffect(()=>{
        const fetchSessions = async () => {
          try {
            const response = await Api.get(`/session/active`, { headers });
            console.log("resp", response);
            
            if (response.data && response.data.code === 'SUCCESS') {
              setSessions(response.data.data); 
            }
          } catch (error) {
            console.error("Error fetching sessions:", error);
          }
        };
        
        fetchSessions();
      }, []);

    const loading = useSelector(getLoadingStatus)

    const getSession = (id, name, price) => {
        setSessionId(id)
        setSessionState(name)
    }

    const submitRequest = async (e) => {
      e.preventDefault();
      setLoadingError(false)
      setLoadingState(true)
      try{
        const response = await Api.get(`/tcfl-students/vouchers/session/${sessionId}`, { headers })
        if(response.data.code === 'SUCCESS'){
            setSoldVouchers(response.data)
        }
      }
      catch(error){
        setLoadingError(true)
        console.error("Error fetching sessions:", error);
      }
      finally{
        setTimeout(()=>{
            setEmpty("")
            setValidate("")
            setLoadingState(false)
        }, 1000)
      }
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

    var count = soldVouchers?.data ? soldVouchers.data.length : 0;

    if(count>0){
      renderedBundles = (
        soldVouchers.data.map((bundle, index)=>(
          <tr key={index}>
            <SMSVoucherReportCard data={bundle}/>
          </tr>
        ))
      )
    }

    else{
      renderedBundles = 
      <tr>
        <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>Not Found</h5></td>
      </tr>
    }
    
    let renderedSessions = ''
    renderedSessions = sessions ? (
        sessions.map((session, index) => (
        <tr key={index}>
            <SessionsDropdown data={session} setSession={getSession} />
        </tr>
        ))
    ) : (<div><h1>Error</h1></div>)
    
    let errorMsg =  
      <tr>
        <td colspan={7} className='text-center'><h5 style={{color: '#E91E63'}}>Opps something went wrong. Please refresh page</h5></td>
      </tr>
      
    let displayData = ""
    if(userRole === "Supervisor"){
      displayData =
      <div>
        <div className="row">
          <div className="col-9 d-flex align-items-center">
              {/* Shop Dropdown */}
                <div className="dropdown"  style={{paddingLeft: 10}}>
                    {/* Session dropdown */}
                    <div className="dropdown">
                        <button
                            className="btn bg-gradient-primary dropdown-toggle"
                            type="button"
                            id="sessionDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {sessionState}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="sessionDropDown">
                            {renderedSessions}
                        </ul>
                    </div>
                </div>
                <button className="btn btn-primary ms-2" onClick={submitRequest}>Search</button>
            </div> 
        </div>
        
        <table className="table align-items-center mb-0">
          <thead>
            <tr>
              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Voucher Code</th>
              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {
              loadingState?
                loadingAnimation: 
                loadingState&&loadingError?
                  errorMsg: renderedBundles
            }
          </tbody>
        </table>
      </div>
    }
    else if(userRole === "Finance Manager"){
      displayData=
      <div className='row'>
            <div className="col-12">
                <div className="card pb-0 p-3 mb-1">
                    <div className="row">
                        <div className="col-10 d-flex align-items-center">
                          {/* Session dropdown */}
                            <div className="dropdown">
                            <button
                                className="btn bg-gradient-primary dropdown-toggle"
                                type="button"
                                id="sessionDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {sessionState}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="sessionDropDown">
                                {renderedSessions}
                            </ul>
                            </div>
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
                                <h6 className="mb-0">Shop Totals</h6>
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
                        <table className="table align-items-center mb-0 p-5">
                          <thead>
                            <tr>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Voucher Code</th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Bundle Type</th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Price (USD)</th>
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
                                  errorMsg: renderedSessions
                            }
                          </tbody>
                        </table>
                    </div>
                    <div className="col-12" style={{textAlign: 'center'}}><h6>Disclaimer: To sum up both online and physical shop sales.</h6></div>
                </div>
            </div>
        </div>
    }
    else if(userRole === "Admin"){
      displayData = <VoucherUsage/>
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