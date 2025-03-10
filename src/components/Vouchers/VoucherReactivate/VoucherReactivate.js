
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCategory } from '../../../store/category-slice';
import { getReactivate, reactivateVoucher } from '../../../store/batch-slice';

const VoucherReactivate = () => {
    const dateUsed = new Date()

    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    )

    const[empty, setEmpty] = useState('')
    const[voucherId, setVoucherId] = useState('')
    const[macAddress, setMacAddress] = useState('')
    const[used, setUsed] = useState(false)

    const loading = useSelector(getReactivate)

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(voucherId==='' || macAddress==='' || dateUsed===''){
            setEmpty("Please fill in all the fields")
        }
        else{
            dispatch(reactivateVoucher({ 
                dateUsed,
                macAddress,
                used,
                voucherId
            })
            );
            setVoucherId('')
            setMacAddress('')
        }
    };

    const successTimer = () =>{
      setTimeout(() => {
          <p style={{color: '#E91E63'}}>Success</p>
      }, 9000);
    }
    
  return (
    <>
      <div className="row">
        <div className="col-12">
          <h6 className='pt-2 text-info'>Voucher Activation</h6>
          <div className="" style={{paddingRight:40, paddingLeft:40}}>
              <div className='text-align-center'>
                {
                  loading === 'idle'? '': 
                    loading === 'pending'?  <p>Loading...</p>:
                      loading === 'success'? <p>Successful</p>:
                        loading === 'failed'? <p>Failed</p>: ''
                }
              </div>
              <form >
                <div style={{color: 'red', marginBottom: '10px'}}>{empty}</div>
                <div className='row'>
                  <div className='col-5'>
                    <label className="form-label mb-0 ">Voucher Code</label>
                    <div className="input-group input-group-dynamic mb-2">
                        <input type="text" name="voucherId" value={voucherId} onChange={(e)=>setVoucherId(e.target.value)} className="form-control mb-0" />
                    </div>
                  </div>
                  <div className='col-5'>
                    <label className="form-label mb-0">Mac Address</label>
                    <div className="input-group input-group-dynamic mb-4">
                        <input type="text" name="macAddress" value={macAddress} onChange={(e)=>setMacAddress(e.target.value)} className="form-control mb-0" />
                    </div>
                  </div>
                  <div className='col-2'>
                    <button onClick={handleSubmit} className="btn btn-info my-4">Activate</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  );
}

export default VoucherReactivate;

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem"
}