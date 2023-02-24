import React from 'react';
import { useSelector } from 'react-redux';
import { getAllBatches, getLoadingStatus } from '../../../store/batch-slice';
import BatchCard from '../BatchCard/BatchCard';
import BeatLoader from "react-spinners/BeatLoader";

const BatchList = () => {
  const batches = useSelector(getAllBatches)
  const loading = useSelector(getLoadingStatus)

  

  var count = Object.keys(batches).length
  let renderedBatches = ''
  if(count>0){
    renderedBatches = (
      batches.map((batch, index)=>(
        <tr key={index}>
          <BatchCard 
            index={index}
            id={batch.id}
            name={batch.batchName}
            status={batch.active}
            suspended={batch.suspended}
            firstname={batch.user.firstname}
            lastname={batch.user.surname}/>
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
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{width: "5%"}}>Batch Number</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{width: "5%"}}>Status</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Created By</th>
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

export default BatchList;

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