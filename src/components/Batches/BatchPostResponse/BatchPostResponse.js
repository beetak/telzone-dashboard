import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBatchStatus, getCreatedBatch, getPostingStatus, getVoucherStatus, getVoucherType, postBatch } from '../../../store/batch-slice';
import { getAllBundles } from '../../../store/bundle-slice';
import voucher_codes from 'voucher-code-generator'
import BeatLoader from 'react-spinners/BeatLoader'

const BatchPostResponse = () => {

  const batchStatus = useSelector(getBatchStatus)

  const[length, setLength] =  ''
  const[count, setCount] = useState('')
  const[voucherList, setVoucherList] = useState([])
  const[batches, setBatches] = useState([])
  const[lastBatch, setLastBatch] = useState('')
  const[voucherCode, setVoucherCode] = useState('')
  const[loadingState, setLoadingState] = useState('')
  const[batchItem, setBatchItem] = useState('')
  const[groups, setGroups] = useState([])
  const[currentState, setCurrentState] = useState('Product')
  const[loadingBundle, setLoadingBundle] = useState('')
  const[empty, setEmpty] = useState('')
  const[batchId, setBatchId] = useState([])
  const[category, setCategory] = useState([])
  const[batchName, setBatchName] = useState("TelOnev1")
  const[showBatchId, setShowBatchId] = useState('')
  const[encryptedVoucher, setEncryptedVoucher] = useState('')
  const[bundleName, setBundleName] = useState('')
  const[bundleId, setBundleId] = useState('')

    const dispatch = useDispatch()

    const response = useSelector(getVoucherStatus)
    const batch = useSelector(getCreatedBatch)
    const productType = useSelector(getVoucherType)
    const postStatus = useSelector(getPostingStatus)

    let info
    let batchNumber
    let loadingAnimation = 
    <tr className='' style={anime}>
      <td colspan={6}>
        <BeatLoader
          color={'#055bb5'}
          loading={postStatus}
          cssOverride={override}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </td>
    </tr>

    let renderedResponse = 
    postStatus==='idle'? '':
    (postStatus==='pending'?
    loadingAnimation:
    (postStatus==='fulfilled' && response==='idle'?
      <p className="mb-0 text-sm">Click Submit to complete voucher generation </p>:
      (postStatus==='fulfulled' && response === 'pending'?
      loadingAnimation:
      (postStatus === 'fulfilled' && response === 'success'?
      loadingAnimation: '')
      )
    ))

    if(postStatus==='idle'){
      info = ""
      batchNumber = ""
    }
    if(postStatus ==='pending'){
      info = <p className="mb-0 text-sm">{'Voucher Creation Pending...'}</p>
      batchNumber = ""
    }
    if(postStatus ==='successful'){
      info = loadingAnimation
      batchNumber = <>
        <br/>
        <p className="mb-0 text-sm">Batch Number: {batch}</p>
      </>
    }
    else if(postStatus ==='rejected'){
      info = <p className="mb-0 text-sm">{productType} Voucher Creation Failed</p>
      batchNumber = <>
        <br/>
        <p className="mb-0 text-sm">Batch Number: {batch}</p>
      </>
    }

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
                {info}
                {batchNumber}
            </div>
            <hr className="dark horizontal" />
            <div className="">
              <p className="mb-0 text-sm" style={Style1}>Use the form to create batches of vouchers</p>
            </div>
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