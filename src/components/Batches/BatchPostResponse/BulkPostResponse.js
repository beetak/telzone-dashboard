import React from 'react';
import { useSelector } from 'react-redux';
import { getPostFail, getPostLoading, getPostSuccess, getPostSuccessFailed, getPostSuccessMessage } from '../../../store/batch-slice';
import BeatLoader from 'react-spinners/BeatLoader'
import TickAnimation from '../../TickAnimation/TickAnimation';
import FailedAnimation from '../../FailedAnimation/FailedAnimation';

const BulkPostResponse = () => {

  const postSuccess = useSelector(getPostSuccess)
  const postFailure = useSelector(getPostFail)
  const postLoading = useSelector(getPostLoading)
  const postMessage = useSelector(getPostSuccessMessage)

  let loadingBatchAnimation = 
    <div className='text-center' style={anime}>
        <h5 style={{color: '#055bb5', overflow: 'hidden'}}>{
          postLoading&&!postFailure&&!postSuccess?"Proccessing Request":postFailure?<FailedAnimation message="Posting Request Failed"/>:postSuccess&&!postMessage.status?<FailedAnimation message={postMessage.message}/>:<TickAnimation message={postMessage.message}/>}</h5>
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
    
  return (
    <>
      <div className="card-body px-0 pb-2" style={Style1}>
        <div className="table-responsive p-0">
            <h3 className="mb-0 ">TelOne</h3>
            <p className="text-sm ">Bulk SMS Voucher Dispatch</p>
            <div className="">
              {
                postLoading || postSuccess || postFailure?
                  loadingBatchAnimation:''
              }
            </div>
            <hr className="dark horizontal" />
            <div className="">
              <p className="mb-0 text-sm" style={Style1}>Use the form to create Bulk SMS vouchers of vouchers</p>
            </div>
        </div>
      </div>
    </>
  );
}

export default BulkPostResponse;

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
  height: '10vh',
}