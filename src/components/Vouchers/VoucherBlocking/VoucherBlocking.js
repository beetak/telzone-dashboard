
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { blockVoucher, getBlockingStatus, getReactivate} from '../../../store/batch-slice';
import { BeatLoader } from 'react-spinners';

const VoucherBlocking = () => {
  const dateUsed = new Date()

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  )

  const[empty, setEmpty] = useState('')
  const[voucherPin, setVoucherPin] = useState('')
  const[loadingStatus, setLoadingStatus] = useState(false)
  const[loadingSuccess, setLoadingSuccess] = useState(false)
  const[loadingFailed, setLoadingFailed] = useState(false)

  const loading = useSelector(getBlockingStatus)

  const dispatch = useDispatch()

    let loadingAnimation = 
    <div className='text-center' style={anime}>
        <h5 style={{color: '#055bb5'}}> 
          {
            loadingStatus && !loadingSuccess? 
              "Updating Voucher":
              loadingStatus && loadingSuccess? 
                "Successful":
                loadingStatus && loadingFailed? 
                  "Blocking Failed":""
          }
        </h5>
        <BeatLoader
          color={'#055bb5'}
          loading={loading}
          cssOverride={override}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
    </div>

  let errorMsg =  
    <tr>
    <td colspan={7} className='text-center'><h5 style={{color: '#E91E63'}}>Opps something went wrong. Please refresh page</h5></td>
    </tr>

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(voucherPin===''){
        setEmpty("Please fill in the Voucher Code")
    }
    else{
      setLoadingStatus(true)
      dispatch(blockVoucher({     
        isBlocked: true,
        voucherCode: voucherPin
      }))
      .then((response)=>{
        console.log('the response ',response)
        if (response.payload && response.payload.success === true) {
          setLoadingSuccess(true);
        } else {
          setLoadingFailed(true);
        }
      }).finally(() => {
        // Clear the loading state after 5 seconds
        setTimeout(() => {
          setLoadingStatus(false);
          setLoadingSuccess(false);
          setLoadingFailed(false);
        }, 5000);
      });
      setVoucherPin('')
    }
  };
    
  return (
    <>
      <div className="row">
        <div className="col-12">
          <h6 className='px-5 text-info'>Voucher Blocking</h6>
          <div className="" style={{paddingRight:40, paddingLeft:40}}>
              {
                loadingStatus?
                  loadingAnimation:''
              }
              <form >
                <div className='row'>
                  <div className='col-12 mb-4'>
                    <label className="form-label mb-0 ">Voucher Code</label>
                    <div className="input-group input-group-dynamic mb-2">
                        <input type="text" name="voucherPin" value={voucherPin} onChange={(e)=>setVoucherPin(e.target.value)} className="form-control mb-0" />
                        <button onClick={handleSubmit} className="btn btn-info">Block Voucher</button>                    
                      </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  );
}

export default VoucherBlocking;

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem"
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