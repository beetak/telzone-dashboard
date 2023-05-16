import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { batchActions, getSearchMessage, getSoldStatus, getStatusSearch, getUsedStatus, getVerified, voucherVerification } from '../../../store/batch-slice';
import { BeatLoader } from 'react-spinners';
import { Button, Modal } from 'react-bootstrap';
const userRole = localStorage.getItem('role')

const VoucherVerification = () => {

  const [voucherCode, setVoucherCode] = useState('');
  const [isOpen, setIsOpen] = useState(false)
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updateStatus, setUpdateStatus] = useState('')
  const [current, setCurrent] = useState('')

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const soldState = useSelector(getSoldStatus)
  const usedState = useSelector(getUsedStatus)
  const verified = useSelector(getVerified)

  const today = new Date()
  const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  console.log("date: ", date)

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(voucherVerification(
      {
        voucherCode
      }
    ))
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
  if(message==='found'){
    renderedVouchers =
    <div className="align-middle text-center">
      {
        !verified.data.sold && !verified.data.used ? (
          <span class="badge badge-sm bg-gradient-success w-50 p-2">Available</span>) : 
          (
          verified.data.sold && !verified.data.used ?
            <>
              <span class="badge badge-sm bg-gradient-info w-50 p-2 mb-2">sold & Not Used</span><br/>
              <span 
                onClick={
                  userRole ===  'Admin' || userRole ===  'Super Admin'?
                    ()=>openModal():
                    ()=>dispatch(batchActions.showDetails())
                }
                class="badge badge-sm bg-gradient-secondary w-30 p-2 cursor-pointer">More details
              </span>
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

  return (
    <>
      <div className="col-md-6 pb-2">
        <div className="card h-100">
          <div className="card-header px-3">
            <div className="row">
              <div className="col-md-12">
                <h6 className="mb-0">Voucher Status Verification</h6>
              </div>
            </div>
          </div>
          <div className="card-body  p-3">
            <div className="p-4">
              <form >
                <label className="form-label">Voucher Code</label>
                <div className="input-group input-group-dynamic mb-4">
                  <input type="text" name="voucherCode" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} className="form-control" placeholder='Coming Soon'/>
                </div>

                {
                  message === 'pending' ?
                    loadingAnimation :
                    message === 'rejected' ?
                      errorMsg :
                      message === 'found' ?
                        renderedVouchers : 
                        message === 'not-found' ?
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
          <Modal.Title>Advert Update</Modal.Title>   
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group">
            <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column">
                  <h6 className="mb-1 text-dark text-sm">Voucher Code</h6>
                </div>
              </div>
              <div className="d-flex align-items-center text-dark text-gradient text-sm font-weight-bold">
                {"bundleType"}
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
                {"voucherCount - soldCount"}
              </div>
            </li>
            <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column">
                  <h6 className="mb-1 text-dark text-sm">Client Name</h6>
                </div>
              </div>
              <div className="d-flex align-items-center text-success text-gradient text-sm font-weight-bold">
                {"soldCount"}
              </div>
            </li>
            <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column">
                  <h6 className="mb-1 text-dark text-sm">Sold On</h6>
                </div>
              </div>
              <div className="d-flex align-items-center text-success text-gradient text-sm font-weight-bold">
                {"soldCount"}
              </div>
            </li>
            <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column">
                  <h6 className="mb-1 text-dark text-sm">Usage Date</h6>
                </div>
              </div>
              <div className="d-flex align-items-center text-danger text-gradient text-sm font-weight-bold">
                {"usedCount"}
              </div>
            </li>
            <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column">
                  <h6 className="mb-1 text-dark text-sm">Usaged By</h6>
                </div>
              </div>
              <div className="d-flex align-items-center text-danger text-gradient text-sm font-weight-bold">
                {"usedCount"}
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