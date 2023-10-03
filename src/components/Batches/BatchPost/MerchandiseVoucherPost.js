import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { batchActions, getBatchStatus, getCreatedBatch, getVCodes, postBatch, postMerchandiseVoucher, postVoucher } from '../../../store/batch-slice';
import { getAllBundles } from '../../../store/bundle-slice';
import voucher_codes from 'voucher-code-generator'
import { BeatLoader } from 'react-spinners';
import GroupPolicyCard from '../../GroupPolicy/GroupPolicyCard/GroupPolicyCard';
import { fetchAsyncGroupPolicy, fetchAsyncSSID, getAllPolicies, getAllSSIDs } from '../../../store/policy-slice';
import { Dropdown } from 'react-bootstrap';

const userID = localStorage.getItem('userId')
const shopId = localStorage.getItem('shopId')

var CryptoJS = require("crypto-js");
const MerchandiseVoucherPost = () => {

  const dateCreated = new Date()

  const [voucherList, setVoucherList] = useState([])
  const [currentState, setCurrentState] = useState('Bundle')
  const [empty, setEmpty] = useState('')
  const [bundleID, setBundleID] = useState('')
  const [bundleName, setBundleName] = useState('')
  const [voucherName, setVoucherName] = useState('')
  const [postVouchers, setPostVouchers] = useState("")
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [loadingSuccess, setLoadingSuccess] = useState(false)
  const [duration, setDuration] = useState('')
  const [durationLength, setDurationLength] = useState('')
  const [description, setDescription] = useState('')
  const [ssid, setSSID] = useState('')
  const [ssidState, setSSIDState] = useState('SSID')
  const [time, setTime] = useState('Bundle Life Span')
  const [groupPolicyId, setGroupPolicyId] = useState('')
  const [groupPolicyState, setGroupPolicyState] = useState('Policy Type')
  const [groupPolicyActioned, setGroupPolicyActioned] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAsyncSSID())
    dispatch(fetchAsyncGroupPolicy())
  }, [dispatch]);

  
  const response = useSelector(getBatchStatus)
  const batch = useSelector(getCreatedBatch)
  const storedVCodes = useSelector(getVCodes)

  const handleSubmit = async (vcode) => {
    // setLoadingStatus(true);
    dispatch(batchActions.postStatus(true)
    )
    dispatch(postMerchandiseVoucher({ 
      voucherUniversal: {
        active: true,
        duration,
        groupPolicyId,
        ssid,
        voucherCode: vcode,
        voucherName
      }
    })).then((response)=>{
      console.log("batch resp: ", response)
      if(response.payload && response.payload.success){
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

  const generateMerchandiseVoucher = () => {
      let vcode = voucher_codes.generate({
        length: 16,
        count: 1,
        charset: '0123456789',
        pattern: '################'
      })
      console.log("the vcode",vcode)
      // vcode.forEach((item)=>(
      //   dispatch(batchActions.vcodeCreation(item))
      // ))
      handleSubmit(vcode[0])
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

  const getPolicy = (id, name) => {
    setGroupPolicyId(id)
    setGroupPolicyActioned(name)
    setGroupPolicyState(name)
  }

  const groupPolicyData = useSelector(getAllPolicies)
  let renderedGroupPolicy = ''
  renderedGroupPolicy = groupPolicyData ? (
    groupPolicyData.map((policy, index) => (
      <tr key={index}>
        <GroupPolicyCard data={policy} setPolicy={getPolicy} />
      </tr>
    ))
  ) : (<div><h1>Error</h1></div>)

  const ssidData = useSelector(getAllSSIDs)
  console.log("ssid. ", ssidData)

  let renderedSSID = groupPolicyData ? (
   ssidData.map((item, index) => (
      <tr key={index}>
        <Dropdown.Item 
          onClick={
              () => {
                  setSSID(item.name)
                  setSSIDState(item.name)
              }
          }
          >{item.name}
        </Dropdown.Item>
      </tr>
    ))
  ) : (<div><h1>Error</h1></div>)

  return (
    <div className="p-4">
        <form>
            <div style={{color: 'red', marginBottom: '10px'}}>{empty}</div>
            <div className="input-group input-group-dynamic">
              <input type="text" name="voucherName" onChange={(e) => setVoucherName(e.target.value)} value={voucherName} className="form-control" style={{ padding: 0 }} />
            </div>
            <label className="form-label" style={{ padding: 0 }}>Voucher Name</label>
            <div className="input-group input-group-dynamic mb-0">
              <input type="text" name="description" value={durationLength} onChange={(e)=>setDurationLength(e.target.value)} className="form-control" style={{lineHeight: 1}}/>
            </div>
            <label className="form-label" style={{ padding: 0 }}>Duration</label>
            <div className="dropdown">
              <button 
                className="btn bg-gradient-primary dropdown-toggle" 
                type="button" 
                id="dropdownMenuButton" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
                >
                {time}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <a  className="dropdown-item" 
                    onClick={(e)=>{
                      e.preventDefault()
                      setDuration(60*durationLength)
                      setTime(60*durationLength)
                    }}>
                    Minutes
                  </a>
                </li>
                <li>
                  <a  className="dropdown-item" 
                    onClick={(e)=>{
                      e.preventDefault()
                      setDuration(3600*durationLength)
                      setTime(3600*durationLength)
                    }}>
                    Hours
                  </a>
                </li>
                <li>
                  <a  className="dropdown-item" 
                    onClick={(e)=>{
                      e.preventDefault()
                      setDuration(86400*durationLength)
                      setTime(86400*durationLength)
                    }}>
                    Days
                  </a>
                </li>
                <li>
                  <a  className="dropdown-item" 
                    onClick={(e)=>{
                      e.preventDefault()
                      setDuration(604800*durationLength)
                      setTime(604800*durationLength)
                    }}>
                    Weeks
                  </a>
                </li>
                <li>
                  <a  className="dropdown-item" 
                    onClick={(e)=>{
                      e.preventDefault()
                      setDuration(2592000*durationLength)
                      setTime(2592000*durationLength)
                    }}>
                    Months
                  </a>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <button 
                className="btn bg-gradient-primary dropdown-toggle" 
                type="button" 
                id="dropdownMenuButton" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
                >
                {groupPolicyState}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {renderedGroupPolicy}
              </ul>
            </div>
            <div className="dropdown">
              <button 
                className="btn bg-gradient-primary dropdown-toggle" 
                type="button" 
                id="dropdownMenuButton" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
                >
                {ssidState}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {renderedSSID}
              </ul>
            </div>
            <div>
              <button onClick={generateMerchandiseVoucher} disabled={groupPolicyId?false:true} type='button' className="btn btn-primary">Generate Voucher</button>
            </div>
        </form>
    </div>
  );
}

export default MerchandiseVoucherPost;

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