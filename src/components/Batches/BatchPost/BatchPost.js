import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { batchActions, getBatchStatus, getCreatedBatch, getVCodes, postBatch, postVoucher } from '../../../store/batch-slice';
import { getAllBundles } from '../../../store/bundle-slice';
import voucher_codes from 'voucher-code-generator'

const userID = localStorage.getItem('userId')

var CryptoJS = require("crypto-js");
const BatchPost = () => {

  const[voucherList, setVoucherList] = useState([])
  const[currentState, setCurrentState] = useState('Product')
  const[empty, setEmpty] = useState('')
  const[batchName, setBatchName] = useState("TelOnev1")
  const[bundleName, setBundleName] = useState('')
  const[bundleID, setBundleID] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
  }, []);

  
  const response = useSelector(getBatchStatus)
  const batch = useSelector(getCreatedBatch)
  const storedVCodes = useSelector(getVCodes)

  // const handleSubmit = async () => {
  //   if(response==='idle'){
  //     dispatch(postBatch({ 
  //       batch: {
  //         batchName ,
  //         id: 1
  //       }
  //     }), ()=>console.log(response))
  //   }
  //   else if(response==='pending'){
  //     alert("Generating Vouchers")
  //   } 
  //   else if(response==='success'){
  //     return response
  //   }
  // }

  const createVouchers = () => {
    handleSubmit()
    generateVoucher()
  }

  const handleSubmit = async () => {
    dispatch(postBatch({ 
      batch: {
        batchName ,
        id: 1
      },
      userID
    }))
  }

  const handlePost = async () =>{
    console.log('stored vouchers: ', storedVCodes)
    Object.values(storedVCodes).map((item, i)=>(
      dispatch(postVoucher({
        batchID: batch,
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
          "used": false,
          "sold": false,
          "voucherCode": item
        }
      })
    )) 
  )
  setCurrentState('Product')
}
 

const generateVoucher = () => {
  console.log('before batch creation: ', response)
    let vcode = voucher_codes.generate({
      length: 16,
      count: 3000,
      charset: '0123456789',
      pattern: '################'
    })
    console.log("the vcode",vcode)
    vcode.forEach((item)=>(
      dispatch(batchActions.vcodeCreation(item))
    ))
}
    
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
              {response==="idle"?
                <button onClick={createVouchers} disabled={bundleID?false:true} type='button' className="btn btn-primary">Generate Batch</button>
              :
                response==="success"?
                <button onClick={handlePost} type='button' style={{right: '10', position: 'absolute'}} className="btn btn-primary">Submit</button>:<button disabled={true} type='button' className="btn btn-primary">Retry</button>
              }
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