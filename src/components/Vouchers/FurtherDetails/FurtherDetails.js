import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchMessage, getSoldStatus, getStatusSearch, getUsedStatus, getVerified, getVerifyStatus, voucherVerification } from '../../../store/batch-slice';
import { BeatLoader } from 'react-spinners';
import { fetchAsyncClientDetails, fetchAsyncClientUsageReport, getAllClientDetails, getAllClientUsage } from '../../../store/report-slice';
import { Button, Modal } from 'react-bootstrap';

const FurtherDetails = () => {

  const [voucherCode, setVoucherCode] = useState('');
  const [macAddress, setMacAddress] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const soldState = useSelector(getSoldStatus)
  const usedState = useSelector(getUsedStatus)
  const verified = useSelector(getVerified)
  const verifyStatus = useSelector(getVerifyStatus)
  const searchStatus = useSelector(getStatusSearch)
  const clientUsage = useSelector(getAllClientUsage)
  const clientDetails = useSelector(getAllClientDetails)

  const today = new Date()
  const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  console.log("date: ", date)

  const dispatch = useDispatch()

  useEffect(()=>{
    setLoadingDetails(true)
    dispatch(fetchAsyncClientUsageReport(
      {
        macAddress: verified.data.vouchers.macAddress
      }
    )).then((response)=>{
      if(response.payload[0].clientId){
        dispatch(fetchAsyncClientDetails(
          {clientId: response.payload[0].clientId}
        )).then((response)=>{
          if(response){
            setLoadingDetails(false)
          }
        })
      }
      setLoadingDetails(false)
    })
  },[verified])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    dispatch(fetchAsyncClientUsageReport(
      {
        macAddress: verified.data.vouchers.macAddress
      }
    )).then((response)=>{
      if(response.payload[0].clientId){
        setIsOpen(true)
        setLoading(false)
        dispatch(fetchAsyncClientDetails(
          {clientId: response.payload[0].clientId}
        ))
      }
      setLoading(false)
    })
  };
  const message = useSelector(getSearchMessage)

  let loadingAnimation =
    <div className="align-middle text-center" style={anime}>
      <BeatLoader
        color={'#055bb5'}
        loading={message}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>


  let renderedError = 
    <div className="align-middle text-center">
      <span class="badge badge-sm bg-gradient-secondary w-50 p-2">Voucher Not Found</span>
    </div>
  
  let renderedVouchers = ''
  if(verifyStatus && message !== "NOT_FOUND"){
    renderedVouchers =
    <div className="align-middle text-center">
      {
        !verified.data.sold && !verified.data.used ? (
          <span class="badge badge-sm bg-gradient-success w-50 p-2">Available</span>) : 
          (
          verified.data.sold && !verified.data.used ?
            <>
              <span class="badge badge-sm bg-gradient-info w-50 p-2 mb-2">sold & Not Used</span><br/>
              <span class="badge badge-sm bg-gradient-secondary w-30 p-2">More details</span>
            </> : 
            (
            verified.data.sold && verified.data.used ?
              <span class="badge badge-sm bg-gradient-secondary w-50 p-2">Sold & used</span> : 
              ''
            )
        )}
    </div>
  }

  let errorMsg =
    <tr>
      <td colspan={7} className='text-center'><h5 style={{ color: '#E91E63' }}>Opps something went wrong. Please refresh page</h5></td>
    </tr>

  const convertDate = (dateCreated) => {
    const dateString = new Date(dateCreated);
    const day = dateString.toLocaleDateString('en-GB', { day: 'numeric' });
    const month = dateString.toLocaleDateString('en-GB', { month: 'long' });
    const year = dateString.toLocaleDateString('en-GB', { year: 'numeric' });
    const hours = dateString.getHours().toString().padStart(2, '0');
    const minutes = dateString.getMinutes().toString().padStart(2, '0');
    
    return `${day} ${month} ${year} \t\t ${hours}:${minutes}`;
  }

  let renderedUsage = ''
  
    var count = Object.keys(clientUsage).length
    if(count>0){
      renderedUsage = (
        clientUsage.map((usage, index)=>(
          <tr key={index}>
            <td className="align-middle">
              <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{convertDate(usage.ts)}</p>
            </td>
            <td>
              <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{Math.ceil(usage.received/1024)} mb</p>
            </td>
            <td>
              <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{Math.ceil(usage.sent/1024)} mb</p>
            </td>
          </tr>
        ))
      )
    }
    else{
      renderedUsage = 
      <tr>
        <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No Vouchers Found</h5></td>
      </tr>
    }

  return (
    <>
    <div class="col-lg-6"> 
      <div className="row">
        <div className="col-12">
          <div className="card h-100">
            <div className="card-header pb-0 px-3">
              <div className="row">
                <div className="col-md-6">
                  <h6 className="mb-0">Voucher Information</h6>
                </div>
              </div>
            </div>
            <div className="card-body pt-4 ps-3">
              <div className="ps-4">
                <ul className="list-group">
                  {
                    verifyStatus && message !== "NOT_FOUND"? 
                    <>
                      <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                        <div className="d-flex align-items-center">
                          <div className="d-flex flex-column">
                            <h6 className="mb-1 text-dark text-sm">Voucher Code</h6>
                          </div>
                        </div>
                        <div className="d-flex align-items-center text-dark text-gradient text-sm font-weight-bold">
                          {verified.data.vouchers.voucherCode}
                        </div>
                      </li>
                      <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                        <div className="d-flex align-items-center">
                          <div className="d-flex flex-column">
                            <h6 className="mb-1 text-dark text-sm">Voucher Status</h6>
                          </div>
                        </div>
                        <div className={`${verified.data.used ? "text-danger " : "text-info "}d-flex align-items-center text-gradient text-sm font-weight-bold`}>
                          {
                            verified.data.sold && !verified.data.used ? "Not Used":
                              verified.data.sold && verified.data.used ? "Used":""
                          }
                        </div>
                      </li>
                      {
                        verified.data.vouchers.order.id !== 1 ?
                        <>
                          <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">Sales Agent</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center text-dark text-gradient text-sm font-weight-bold">
                              {verified.data.vouchers.order.adminPortalUsers.firstname} {verified.data.vouchers.order.adminPortalUsers.surname}
                            </div>
                          </li>
                          <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">Client Name</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center text-dark text-gradient text-sm font-weight-bold">
                              {verified.data.vouchers.order.businessPartner.name}
                            </div>
                          </li>
                          <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">Sold On</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center text-dark text-gradient text-sm font-weight-bold">
                              {convertDate(verified.data.vouchers.order.dateCreated)}
                            </div>
                          </li>
                        </>:
                        <>
                          <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">Sales Agent</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center text-danger text-gradient text-sm font-weight-bold">
                              Not Available
                            </div>
                          </li>
                          <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">Client Name</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center text-danger text-gradient text-sm font-weight-bold">
                              Not Available
                            </div>
                          </li>
                          <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">Sold On</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center text-danger text-gradient text-sm font-weight-bold">
                              Not Available
                            </div>
                          </li>
                        </>
                      }
                      {
                        verified.data.used&&
                        <>
                          <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">Usage Date</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center text-dark text-gradient text-sm font-weight-bold">
                              {!verified.data.vouchers.dateUsed?"Not Yet Used":convertDate(verified.data.vouchers.dateUsed)}
                            </div>
                          </li>
                          <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">Used By:</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center text-dark text-gradient text-sm font-weight-bold">
                              {"Guest User"}
                            </div>
                          </li>
                          <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">Mac Address:</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center text-dark text-gradient text-sm font-weight-bold">
                              {!verified.data.vouchers.macAddress?"Not Yet Used":verified.data.vouchers.macAddress}
                            </div>
                          </li>
                          <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">Manufacturer:</h6>
                              </div>
                            </div>
                            <div className={`${clientDetails.manufacturer ? "text-dark " : "text-danger "}d-flex align-items-center text-gradient text-sm font-weight-bold`}>
                              {clientDetails.manufacturer?clientDetails.manufacturer:"null"}
                            </div>
                          </li>
                          <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">User:</h6>
                              </div>
                            </div>
                            <div className={`${clientDetails.user? "text-dark " : "text-danger "}d-flex align-items-center text-gradient text-sm font-weight-bold`}>
                              {clientDetails.user?clientDetails.user:"null"}
                            </div>
                          </li>
                          <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">OS:</h6>
                              </div>
                            </div>
                            <div className={`${clientDetails.os? "text-dark " : "text-danger "}d-flex align-items-center text-gradient text-sm font-weight-bold`}>
                              {clientDetails.os?clientDetails.os:"null"}
                            </div>
                          </li>
                          <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">SSID:</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center text-dark text-gradient text-sm font-weight-bold">
                              {clientDetails.ssid}
                            </div>
                          </li>
                          <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">Description:</h6>
                              </div>
                            </div>
                            <div className={`${clientDetails.description? "text-dark " : "text-danger "}d-flex align-items-center text-gradient text-sm font-weight-bold`}>
                              {clientDetails.description?clientDetails.description:"null"}
                            </div>
                          </li>
                          <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">First Seen:</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center text-dark text-gradient text-sm font-weight-bold">
                              {convertDate(clientDetails.firstSeen)}
                            </div>
                          </li>
                          <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">Last Seen:</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center text-dark text-gradient text-sm font-weight-bold">
                              {convertDate(clientDetails.lastSeen)}
                            </div>
                          </li>
                          <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">Recent Mac Address:</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center text-dark text-gradient text-sm font-weight-bold">
                              {clientDetails.recentDeviceMac?clientDetails.recentDeviceMac:"null"}
                            </div>
                          </li>
                          <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">Status:</h6>
                              </div>
                            </div>
                            <div className={`${clientDetails.status==="Offline" ? "text-danger " : "text-info "}d-flex align-items-center text-gradient text-sm font-weight-bold`}>
                              {clientDetails.status}
                            </div>
                          </li>
                        </>
                      }
                    </>:""
                  }
                </ul>
                <button onClick={handleSubmit} className="btn btn-info my-4">View History</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Modal show={isOpen} onHide={closeModal} style={{ marginTop: 100 }}>
  <Modal.Header closeButton closeVariant='black'>            
    <Modal.Title>Usage Details</Modal.Title>   
  </Modal.Header>
  <Modal.Body>
    <h6>NB: Usage for the past 7 days (Not in association to a voucher)</h6>
    <div style={{ maxHeight: '50vh', overflowY: 'scroll' }}>
      <table className="table align-items-center mb-0">
        <thead>
          <tr>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Received</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Sent</th>
          </tr>
        </thead>
        <tbody style={{ maxHeight: 'calc(50vh - 120px)', overflowY: 'auto' }}>
          {
            loading === 'pending' ?
              loadingAnimation :
              loading === 'rejected' ?
                errorMsg : renderedUsage
          }
        </tbody>
      </table>
    </div>
    <br/>
    <Button variant="secondary" onClick={closeModal}>
      Cancel
    </Button>
  </Modal.Body>
</Modal>
    </>
  );
}

export default FurtherDetails;

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