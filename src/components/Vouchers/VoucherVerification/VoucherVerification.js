import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { batchActions, getSearchMessage, getSoldStatus, getStatusSearch, getUsedStatus, getVerified, getVerifyStatus, voucherVerification } from '../../../store/batch-slice';
import { BeatLoader } from 'react-spinners';
import { Button, Modal } from 'react-bootstrap';
const userRole = localStorage.getItem('role')

const VoucherVerification = () => {

  const [voucherCode, setVoucherCode] = useState('');
  const [isOpen, setIsOpen] = useState(false)


  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const soldState = useSelector(getSoldStatus)
  const usedState = useSelector(getUsedStatus)
  const verified = useSelector(getVerified)
  const verifyStatus = useSelector(getVerifyStatus)
  const searchStatus = useSelector(getStatusSearch)

  const today = new Date()
  const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  console.log("date: ", date)

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsOpen(true)
    dispatch(voucherVerification(
      {
        voucherCode
      }
    )).then((response)=>{
        console.log("my respo", response)
      
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
      <span class="badge badge-sm bg-gradient-danger w-50 p-2">Voucher Not Found</span>
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
              {/* <span 
                onClick={
                  userRole ===  'Admin' || userRole ===  'Super Admin'?
                    ()=>openModal():
                    ()=>dispatch(batchActions.showDetails())
                }
                class="badge badge-sm bg-gradient-secondary w-30 p-2 cursor-pointer">More details
              </span> */}
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
    return dateString.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  const padZero = (value) => {
    return value.toString().padStart(2, '0');
  };

  const convertTime = (timeCreated) => {
    // Convert milliseconds to seconds
    let seconds = Math.floor(timeCreated / 1000);
  
    // Calculate hours, minutes, and remaining seconds
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
  
    const formattedTime = `${hours}:${padZero(minutes)}:${padZero(seconds)}`;
    return formattedTime;
  };

  return (
    <>
      <div className="col-md-6 pb-2">
        <div className="card h-100">
          <div className="card-header px-3">
            <div className="row">
              <div className="col-md-12">
                <h6 className="mb-0">Voucher Status Query</h6>
              </div>
            </div>
          </div>
          <div className="card-body  p-3">
            <div className="p-4">
              <form >
                <label className="form-label">Voucher Code</label>
                <div className="input-group input-group-dynamic mb-4">
                  <input type="text" name="voucherCode" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} className="form-control" placeholder='Enter Voucher Code'/>
                </div>

                {
                  searchStatus === 'pending' ?
                    loadingAnimation :
                    searchStatus === 'rejected' ?
                      errorMsg :
                      searchStatus === 'fulfilled' && message !== "NOT_FOUND" ?
                        renderedVouchers : 
                        searchStatus === 'fulfilled' && message === "NOT_FOUND" ?
                          renderedError : ''
                }
                <button onClick={handleSubmit} className="btn btn-info my-4">Verify</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Activate / Deactivate Modal */}

      <Modal show={isOpen} onHide={closeModal} style={{ marginTop: 100 }}>
        <Modal.Header closeButton closeVariant='black'>            
          <Modal.Title>Voucher Modal</Modal.Title>   
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group">
            <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column">
                  <h6 className="mb-1 text-dark text-sm">Voucher Code</h6>
                </div>
              </div>
              <div className="d-flex align-items-center text-dark text-gradient text-sm font-weight-bold ml-8">
                {message === 'found' ? (
                  <>{verified.data.vouchers.bundle.name}</>
                ) : (
                  ""
                )}
              </div>
            </li>
            
            <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column">
                  <h6 className="mb-1 text-dark text-sm">Voucher Status</h6>
                </div>
              </div>
              {
                message==='found'?
                !verified.data.sold && !verified.data.used ? (
                  <div className="d-flex align-items-center text-info text-gradient text-sm font-weight-bold">
                    Available
                  </div>) : 
                  (
                  verified.data.sold && !verified.data.used?
                    <div className="d-flex align-items-center text-info text-gradient text-sm font-weight-bold">
                      Sold and Not Used
                    </div> : 
                    (
                    verified.data.sold && verified.data.used ?
                      <span class="badge badge-sm bg-gradient-secondary w-50 p-2">Sold & used</span> : 
                      ''
                    )
                  ):
                  ''
                }
            </li>
            <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column">
                  <h6 className="mb-1 text-dark text-sm">Sales Agent</h6>
                </div>
              </div>
              <div className="d-flex align-items-center text-info text-gradient text-sm font-weight-bold">
                { message==='found'?
                  <>{verified.data.vouchers.order.adminPortalUsers.firstname} {verified.data.vouchers.order.adminPortalUsers.surname}</>:""
                }
              </div>
            </li>
            <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column">
                  <h6 className="mb-1 text-dark text-sm">Client Name</h6>
                </div>
              </div>
              <div className="d-flex align-items-center text-success text-gradient text-sm font-weight-bold">
                { message==='found'?
                  <>{verified.data.vouchers.order.businessPartner.name}</>:""
                }
              </div>
            </li>
            <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column">
                  <h6 className="mb-1 text-dark text-sm">Sold On</h6>
                </div>
              </div>
              <div className="d-flex align-items-center text-success text-gradient text-sm font-weight-bold">
                { message==='found'?
                  <>{convertDate(verified.data.vouchers.order.dateCreated)}</>:""
                  // <>{convertDate(verified.data.vouchers.order.dateCreated)} {convertTime(verified.data.vouchers.order.timeCreated)}</>:""
                }
              </div>
            </li>
            <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column">
                  <h6 className="mb-1 text-dark text-sm">Usage Date</h6>
                </div>
              </div>
              <div className="d-flex align-items-center text-danger text-gradient text-sm font-weight-bold">
                { message==='found'?
                  <>{!verified.data.vouchers.dateUsed?"Not Yet Used":convertDate(verified.data.vouchers.dateUsed)}</>:""
                }
              </div>
            </li>
            <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column">
                  <h6 className="mb-1 text-dark text-sm">Used By:</h6>
                </div>
              </div>
              <div className="d-flex align-items-center text-danger text-gradient text-sm font-weight-bold">
                {"Guest User"}
              </div>
            </li>
            <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column">
                  <h6 className="mb-1 text-dark text-sm">Mac Address:</h6>
                </div>
              </div>
              <div className="d-flex align-items-center text-danger text-gradient text-sm font-weight-bold">
                { message==='found'?
                  <>{!verified.data.vouchers.macAddress?"Not Yet Used":verified.data.vouchers.macAddress}</>:""
                }
              </div>
            </li>
          </ul>
          <br/>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default VoucherVerification;

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