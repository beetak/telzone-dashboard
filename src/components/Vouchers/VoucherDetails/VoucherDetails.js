import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { batchActions, getLoadingStatus, getSearchMessage, getShow, getSoldStatus, getStatusSearch, getUsedStatus, getVerified, voucherVerification } from '../../../store/batch-slice';
import { BeatLoader } from 'react-spinners';
import VoucherVerification from '../VoucherVerification/VoucherVerification';

const VoucherDetails = ({ voucherCount, usedCount, soldCount, bundleType }) => {

  const [voucherCode, setVoucherCode] = useState('');

  const soldState = useSelector(getSoldStatus)
  const usedState = useSelector(getUsedStatus)
  const verified = useSelector(getVerified)
  const showMore = useSelector(getShow)

  console.log("verified: ", verified.message)

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

  const loading = useSelector(getStatusSearch)
  const message = useSelector(getSearchMessage)
  console.log("response: ", `${verified.message}`)

  let loadingAnimation =
    <div className="align-middle text-center" style={anime}>
      <BeatLoader
        color={'#055bb5'}
        loading={loading}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>


  let renderedVouchers = ''
  if (verified!=='') {
    renderedVouchers = <div className="align-middle text-center">
      {
        !verified.data.sold && !verified.data.used ? (
          <span class="badge badge-sm bg-gradient-success w-50 p-2">Available</span>) : 
          (
          verified.data.sold && !verified.data.used ?
            <span class="badge badge-sm bg-gradient-info w-50 p-2">sold & Not Used</span> : 
            (
            verified.data.sold && verified.data.used ?
              <span class="badge badge-sm bg-gradient-secondary w-50 p-2">Sold & used</span> : 
              (
              verified.message===`Voucher doesn't exist` ?
                <span class="badge badge-sm bg-gradient-secondary w-50 p-2">Voucher Not Found</span> : ''
              )
            )
        )}
    </div>
  }
  else{
    renderedVouchers = 
    <div className="align-middle text-center">
      <span class="badge badge-sm bg-gradient-secondary w-50 p-2">Voucher Not Found</span>
    </div>
  }

  let errorMsg =
    <tr>
      <td colspan={7} className='text-center'><h5 style={{ color: '#E91E63' }}>Opps something went wrong. Please refresh page</h5></td>
    </tr>

  return (
    <div className='row pb-2'>
      <div className="col-md-6">
        <div className="card h-100 mb-4">
          <div className="card-header pb-0 px-3">
            <div className="row">
              <div className="col-md-6">
                <h6 className="mb-0">Batch Status</h6>
              </div>
              <div className="col-md-6 d-flex justify-content-start justify-content-md-end align-items-center">
                <i className="material-icons me-2 text-lg">date_range</i>
                <small>As at: {date}</small>
              </div>
            </div>
          </div>
          <div className="card-body pt-4 p-3">
            <ul className="list-group">
              <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-column">
                    <h6 className="mb-1 text-dark text-sm">Bundle Type</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center text-dark text-gradient text-sm font-weight-bold">
                  {bundleType}
                </div>
              </li>
              <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-column">
                    <h6 className="mb-1 text-dark text-sm">Available Vouchers</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center text-info text-gradient text-sm font-weight-bold">
                  {voucherCount - soldCount}
                </div>
              </li>
              <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-column">
                    <h6 className="mb-1 text-dark text-sm">Sold Vouchers</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center text-success text-gradient text-sm font-weight-bold">
                  {soldCount}
                </div>
              </li>
              <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-column">
                    <h6 className="mb-1 text-dark text-sm">Used Vouchers</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center text-danger text-gradient text-sm font-weight-bold">
                  {usedCount}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <VoucherVerification/>
    </div>
  );
}

export default VoucherDetails;

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