import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { Button, Modal } from 'react-bootstrap';
import { fetchAsyncSMSVoucher, getAllSales, getLoadingStatus } from '../../../store/sales-slice';
import FailedAnimation from '../../FailedAnimation/FailedAnimation';
import TickAnimation from '../../TickAnimation/TickAnimation';
import { isEmpty } from 'lodash';
const userRole = localStorage.getItem('role')

const SMSVerification = () => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [loadingError, setLoadingError] = useState(false)
  const [loadingSuccess, setLoadingSuccess] = useState(false)
  const [loadingFail, setLoadingFail] = useState(false)
  const [voucherCodes, setVoucherCodes] = useState([])

  const searchStatus = useSelector(getLoadingStatus)

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setVoucherCodes([])
    dispatch(fetchAsyncSMSVoucher(
        phoneNumber
    )).then((response)=>{
      console.log("my resp: ", response)
        if(response.payload.code === "NOT_FOUND"){
          setLoadingFail(true)
        }
        else if(response.payload.code === "SUCCESS"){
          setLoadingSuccess(true)
          setVoucherCodes(response.payload.data)
        }
        else{
          setLoadingError(true)
        }
    }).finally(()=>{
      setTimeout(()=>{
        setLoading(false)
        setLoadingFail(false)
        setLoadingError(false)
        setLoadingSuccess(false)
      },5000)
    })
  };
  const clearVouchers = (e)=>{
    e.preventDefault()
    setVoucherCodes([])
  }

  let loadingAnimation =
    <div className='text-center' style={anime}>
      <h5 style={{color: '#055bb5', overflow: 'hidden'}}>{
        loading&&!loadingFail&&!loadingError&&!loadingSuccess?"Proccessing Request":loadingError?<FailedAnimation message="Request Failed"/>:loadingSuccess?<TickAnimation message="Vouchers Found"/>:<FailedAnimation message="No Vouchers Found"/>}</h5>
      {
        loading&&!loadingSuccess&&loadingFail&&loadingError&&
        <BeatLoader
          color={'#055bb5'}
          loading={loading}
          cssOverride={override}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      }
    </div>


  let renderedError = 
    <div className="align-middle text-center">
      <span class="badge badge-sm bg-gradient-danger w-50 p-2">Voucher Not Found</span>
    </div>
  
  let renderedVouchers = ''
  if(voucherCodes.length > 0){
    renderedVouchers =
      <div className="align-middle text-center">
        {
            voucherCodes.map((item, index)=>{
              return <>
                <span class="badge badge-sm bg-gradient-success w-50 p-2 mt-2">{item}</span><br/>
              </>
            })          
        }
        <button onClick={clearVouchers} className="btn btn-info my-2">Clear</button>
      </div>
  }
  else{
    renderedVouchers = <div className="align-middle text-center">Check Vouchers</div>
  }

  return (
    <>
      <div className="col-md-6 pb-2">
        <div className="card h-100">
          <div className="card-header px-3">
            <div className="row">
              <div className="col-md-12">
                <h6 className="mb-0">SMS Voucher Query</h6>
              </div>
            </div>
          </div>
          <div className="card-body  p-3">
            <div className="p-4">
              <form >
                <label className="form-label">Mobile Number</label>
                <div className="input-group input-group-dynamic mb-4">
                  <input type="text" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-control" placeholder='Enter Voucher Code'/>
                </div>
                {
                  loading ?
                    loadingAnimation : ""
                }
                {renderedVouchers}
                <button onClick={handleSubmit} className="btn btn-info my-4">Verify</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Activate / Deactivate Modal */}

    </>
  );
}

export default SMSVerification;

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