import React from 'react';
import { useSelector } from 'react-redux';
import { getAllVouchers, getLoadingStatus, getSelectedBatch } from '../../../store/batch-slice';
import VoucherCard from '../VoucherCard/VoucherCard';
import BeatLoader from 'react-spinners/BeatLoader'
import VoucherDetails from '../VoucherDetails/VoucherDetails';

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

  var soldCount = 0

  var usedCount = 0

  var voucherCount = 0

  var bundleType = ''

  for (var i=0; i<vouchers.data.length; i++) {
    voucherCount++;
    bundleType = vouchers.data[0].bundles.name
    if (vouchers.data[i].vouchers.sold) 
      soldCount++; 
    if (vouchers.data[i].vouchers.used) 
      usedCount++; 
  } 
   
  console.log("Total Sold", soldCount);
  console.log("Total Used", usedCount);

  let renderedVouchers = ''
  if(count>0){
    renderedVouchers = <VoucherDetails usedCount={usedCount} soldCount={soldCount} voucherCount={voucherCount} bundleType={bundleType}/>
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
    <div className="card-body">
      {
        loading==='pending'?
        loadingAnimation: 
        loading ==='rejected'?
          errorMsg: renderedVouchers
      }
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