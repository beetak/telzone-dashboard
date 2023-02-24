import React from 'react';
import { useSelector } from 'react-redux';
import { getAllVouchers, getLoadingStatus, getSelectedBatch } from '../../../store/batch-slice';
import VoucherCard from '../VoucherCard/VoucherCard';
import BeatLoader from 'react-spinners/BeatLoader'

const userRole = localStorage.getItem('role')

const VoucherList = () => {
  const vouchers = useSelector(getSelectedBatch)
  const loading = useSelector(getLoadingStatus)

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

  var count = Object.keys(vouchers).length
  let renderedVouchers = ''
  if(count>0){
    renderedVouchers = (
      Object.values(vouchers.data).map((voucher, index)=>(
        <tr key={index}>
          <VoucherCard data={voucher} index={index}/>
        </tr>
      ))
    )
  }
  else{
    renderedVouchers = <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No Vouchers Exist In This Batch</h5></td>
    </tr>
  }

  let errorMsg =  
    <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#E91E63'}}>Opps something went wrong. Please refresh page</h5></td>
    </tr>

  return (
    <div>
      <table className="table align-items-center mb-0">
        <thead>
          <tr>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Encrypted Voucher Code</th>
            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Voucher Type</th>
            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Generated By</th>
            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Availability</th>
          </tr>
        </thead>
        <tbody>
          {
            loading==='pending'?
            loadingAnimation: 
            loading ==='rejected'?
              errorMsg: renderedVouchers
          }
        </tbody>
      </table>
    </div>
  );
}

export default VoucherList;

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