import React from 'react';
import { useSelector } from 'react-redux';
import { getAllBatches, getLoadingStatus } from '../../../store/batch-slice';
import BeatLoader from "react-spinners/BeatLoader";
import MerchandiseVoucherCard from '../MerchandiseVoucherCard/MerchandiseVoucherCard';

const MerchandiseVoucherList = () => {
  const batches = useSelector(getAllBatches)
  const loading = useSelector(getLoadingStatus)

  var count = Object.keys(batches).length
  let renderedBatches = ''
  if(count>0){
    renderedBatches = (
      batches.map((batch, index)=>(
        <tr key={index}>
          <MerchandiseVoucherCard 
            index={index}
            id={batch.id}
            name={batch.batchName}
            status={batch.active}
            suspended={batch.suspended}
            firstname={batch.user.firstname}
            lastname={batch.user.surname}
            bundleName ={batch.bundles.name}
            dateCreated={batch.dateCreated}/>
        </tr>
      ))
    )
  }
  else{
    renderedBatches = <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>Batches Of Vouchers Not Found</h5></td>
    </tr>
  }
  
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

  let errorMsg =  
    <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#E91E63'}}>Opps something went wrong. Please refresh page</h5></td>
    </tr>
    

  return (
    <div>
      <table className="table align-items-center mb-0">
        <thead>
          <tr>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{width: "5%"}}>Voucher Name</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{width: "5%"}}>Voucher Code</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">SSID</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Duration</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{width: "5%"}}>Status</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center" style={{width: "5%"}}>Action</th>
          </tr>
        </thead>
        <tbody>

          {
            loading==='pending'?
            loadingAnimation: 
            loading ==='rejected'?
              errorMsg: renderedBatches
          }
          
        </tbody>
      </table>
    </div>
  );
}

export default MerchandiseVoucherList;

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