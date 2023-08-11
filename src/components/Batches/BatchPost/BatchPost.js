import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { batchActions, getBatchStatus, getCreatedBatch, getVCodes, postBatch, postVoucher } from '../../../store/batch-slice';
import { getAllBundles } from '../../../store/bundle-slice';
import voucher_codes from 'voucher-code-generator'
import { BeatLoader } from 'react-spinners';

const userID = localStorage.getItem('userId')
const shopId = localStorage.getItem('shopId')

var CryptoJS = require("crypto-js");
const BatchPost = () => {

  const dateCreated = new Date()

  const[voucherList, setVoucherList] = useState([])
  const[currentState, setCurrentState] = useState('Product')
  const[empty, setEmpty] = useState('')
  const[batchName, setBatchName] = useState("TelOnev1")
  const[bundleName, setBundleName] = useState('')
  const[bundleID, setBundleID] = useState('')
  const [postVouchers, setPostVouchers] = useState("")
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [loadingSuccess, setLoadingSuccess] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
  }, []);

  
  const response = useSelector(getBatchStatus)
  const batch = useSelector(getCreatedBatch)
  const storedVCodes = useSelector(getVCodes)

  const handleSubmit = async () => {
    // setLoadingStatus(true);
    dispatch(batchActions.postStatus(true)
    )
    dispatch(postBatch({ 
      batch: {
        dateCreated,
        id: 1
      },
      userID,
      bundleId: bundleID
    })).then((response)=>{
      console.log("batch resp: ", response)
      if(response.payload && response.payload.success){
        generateVoucher(response.payload.data.data.batch.id)
      }
      else{
        //code to undo batch
        console.log("batch failed")
        // Clear the loading state after 5 seconds
        setTimeout(() => {
          // setLoadingStatus(false);
          // dispatch(batchActions.postStatus({state: false}))
        }, 2000);
      }
    })
  }

  const handlePost = async (voucherCodes, batchID) =>{
    dispatch(batchActions.successStatus(true))
    voucherCodes.map((item, i)=>(
      // setLoadingSuccess(true),
      dispatch(
        postVoucher({
        batchID: batchID,
        bundleID,
        userID,
        orderId: 1,
        vouchers: {
          "approved": 0,
          "approvedBy": 0,
          "encryptedVoucherCode": CryptoJS.AES.encrypt(JSON.stringify(item), 'my-secret-key@123').toString(),
          "isBlocked": 0,
          "id":1,
          "serialNumber": 0,
          "macAddress": "string",
          "used": false,
          "sold": false,
          "voucherCode": item
        }
      })
    )))
    // setLoadingStatus(false);
    // setLoadingSuccess(true);
    dispatch(batchActions.postStatus(false))
    dispatch(batchActions.successStatus(true))
    setBundleID('')
    setTimeout(() => {
      // setLoadingSuccess(false);
      dispatch(batchActions.successStatus(false))
    }, 2000);
    setCurrentState('Product')
    setPostVouchers("50 Vouchers Have Been Saved. Refreshing Soon...")
  // alert("Done")
  // window.location = "/batch"
}
 

const generateVoucher = (batchID) => {
  console.log('before batch creation: ', response)
    let vcode = voucher_codes.generate({
      length: 16,
      count: 50,
      charset: '0123456789',
      pattern: '################'
    })
    console.log("the vcode",vcode)
    // vcode.forEach((item)=>(
    //   dispatch(batchActions.vcodeCreation(item))
    // ))
    handlePost(vcode, batchID)
}

let loadingBatchAnimation = 
<div className='text-center' style={anime}>
    <h5 style={{color: '#055bb5'}}>{
      loadingStatus?"Creating Vouchers. Please wait":loadingSuccess&&"Vouchers Successfully Created"}</h5>
    {
      loadingStatus&&
      <BeatLoader
        color={'#055bb5'}
        loading={loadingStatus}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    }
</div>
    
  const bundles = useSelector(getAllBundles)
  let renderedBundles = ''
  renderedBundles = bundles ? (
    bundles.map((bundle, index)=>(
      <li key={bundle.id}>
        <a  className="dropdown-item" 
            onClick={(e)=>{
                e.preventDefault()
                setBundleID(bundle.id)
                setBundleName(bundle.name)
                setCurrentState(bundle.name)
            }}>
            {bundle.name}
        </a>
      </li>
    ))
  ):(<div><h1>{bundles.Error}</h1></div>)

    
  return (
    <div className="p-4">
        <form>
            <div style={{color: 'red', marginBottom: '10px'}}>{empty}</div>
            <div className="dropdown">
                <button 
                    className="btn bg-gradient-primary dropdown-toggle" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    >
                    {currentState}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {renderedBundles}
                </ul>
            </div>
            <div>
              <button onClick={handleSubmit} disabled={bundleID?false:true} type='button' className="btn btn-primary">Generate Batch</button>
            </div>
        </form>
    </div>
  );
}

export default BatchPost;

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