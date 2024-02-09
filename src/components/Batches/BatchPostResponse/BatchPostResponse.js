import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBatchStatus, getCreatedBatch, getPostFail, getPostLoading, getPostSuccess, getPostingStatus, getVoucherStatus, getVoucherType, postBatch } from '../../../store/batch-slice';
import { getAllBundles } from '../../../store/bundle-slice';
import voucher_codes from 'voucher-code-generator'
import BeatLoader from 'react-spinners/BeatLoader'
import VoucherReactivate from '../../Vouchers/VoucherReactivate/VoucherReactivate';
import TickAnimation from '../../TickAnimation/TickAnimation';
import FailedAnimation from '../../FailedAnimation/FailedAnimation';

const BatchPostResponse = () => {

  const batchStatus = useSelector(getBatchStatus)

  const[count, setCount] = useState('')
  const[batches, setBatches] = useState([])

    const postSuccess = useSelector(getPostSuccess)
    const postFailure = useSelector(getPostFail)
    const postLoading = useSelector(getPostLoading)

    let info
    let batchNumber

  let renderedBatches = ''
  if(count>0){
    renderedBatches = (
      batches.map((batch, index)=>(
        <tr key={index}>
        </tr>
      ))
    )
  }
  else{
    renderedBatches = <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>Batches Of Vouchers Not Found</h5></td>
    </tr>
  }

  let loadingBatchAnimation = 
    <div className='text-center' style={anime}>
        <h5 style={{color: '#055bb5', overflow: 'hidden'}}>{
          postLoading&&!postFailure&&!postSuccess?"Generating Vouchers. Please wait a moment":postFailure?<FailedAnimation/>:postSuccess&&<TickAnimation/>}</h5>
        {
          postLoading&&
          <BeatLoader
            color={'#055bb5'}
            loading={postLoading}
            cssOverride={override}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }
    </div>


  let errorMsg =  
    <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#E91E63'}}>Opps something went wrong. Please refresh page</h5></td>
    </tr>
    
  return (
    <>
      <div className="card-body px-0 pb-2" style={Style1}>
        <div className="table-responsive p-0">
            <h3 className="mb-0 ">TelOne</h3>
            <p className="text-sm ">Voucher Creation</p>
            <div className="">
                {
                  postLoading || postSuccess || postFailure?
                    loadingBatchAnimation:''
                }
                {info}
                {batchNumber}
            </div>
            <hr className="dark horizontal" />
            <div className="">
              <p className="mb-0 text-sm" style={Style1}>Use the form to create batches of vouchers</p>
            </div>
        </div>
        <div className="table-responsive p-0" style={{overflow: 'hidden'}}>
          <VoucherReactivate/>
        </div>
      </div>
    </>
  );
}

export default BatchPostResponse;

const Style1={
  textAlign:"center"
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