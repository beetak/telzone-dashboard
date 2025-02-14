import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { batchActions } from '../../../store/batch-slice';
import BundleDropdown from '../../Bundles/BundleDropdown/BundleDropdown';
import { fetchAsyncBundles, getAllBundles } from '../../../store/bundle-slice';
import { closeSale, postBulkSMS, postSale } from '../../../store/cart-slice';
import Api from '../../Api/Api';
import SessionsDropdown from '../../Session/SessionsDropdown/SessionsDropdown';

const userID = localStorage.getItem("userId")
const regionId = localStorage.getItem("regionId")
const townId = localStorage.getItem("townId")
const shopId = localStorage.getItem("shopId")
const firstname = localStorage.getItem("firstname")

const BulkVoucherPost = () => {

  const [empty, setEmpty] = useState('')
  const [bundleState, setBundleState] = useState('Product')
  const [sessionState, setSessionState] = useState('Session')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [bundleId, setBundleId] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [bundlePrice, setBundlePrice] = useState('')
  const [sessions, setSessions] = useState([])


  const dispatch = useDispatch()
  const active = true

  useEffect(() => {
    dispatch(fetchAsyncBundles(active))

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    const fetchSessions = async () => {
      try {
        const response = await Api.get(`/session/active`, { headers });
        console.log("resp", response);
        
        if (response.data && response.data.code === 'SUCCESS') {
          setSessions(response.data.data); 
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };
    
    fetchSessions();
  }, [dispatch, active]);
  

  const getBundle = (id, name, price) => {
    setBundleId(id)
    setBundleState(name)
    setBundlePrice(price)
  }

  const getSession = (id, name, price) => {
    setSessionId(id)
    setSessionState(name)
  }

  const bundleData = useSelector(getAllBundles)
  let renderedBundle = ''
  renderedBundle = bundleData ? (
    bundleData.map((bundle, index) => (
      <tr key={index}>
        <BundleDropdown data={bundle} setBundle={getBundle} />
      </tr>
    ))
  ) : (<div><h1>Error</h1></div>)

  let renderedSessions = ''
  renderedSessions = sessions ? (
    sessions.map((session, index) => (
      <tr key={index}>
        <SessionsDropdown data={session} setSession={getSession} />
      </tr>
    ))
  ) : (<div><h1>Error</h1></div>)

  const makeSale = async (e) => {
    e.preventDefault();
    dispatch(batchActions.postStatus(true));
    const date = new Date()

    const unitPrice = (Math.round(bundlePrice * 10000 / (115)) / 100).toFixed(2)
    const totalPrice = (Math.round(unitPrice * 200)/100).toFixed(2)
    const totalVat = (Math.round((bundlePrice - unitPrice)*200)/100).toFixed(2)
    const netTotal = (Math.round((parseFloat(totalVat) + parseFloat(totalPrice))*100)/100).toFixed(2)

    if(phoneNumber && bundleId){
      dispatch(postSale({
        adminPortalUserId: userID,
        bundleId,
        businessPartnerId: firstname==='FOC'? 112: 100,
        currencyId: 1,
        order: {
          amount: firstname==='FOC'? 0 : netTotal,
          dateCreated: date,
          discount: firstname==='FOC'? netTotal :0,
          id:'',
          payingAccountNumber: "TelOne",
          quantity: 2,
          vat: firstname==='FOC'? 0 : totalVat,
          status: false,
          timeCreated: date
        },
        regionId,
        shopId,
        townId
        
      })).then(response => {
        if (response.payload && response.payload.code === "SUCCESS") {  
          // Execute postVoucherSaleByBundleId
          handleSubmit(response.payload.data.order.id);
        } else {
          // Request was not successful
          setTimeout(() => {
            setBundleState('Product');
            dispatch(batchActions.successStatus(false));
            dispatch(batchActions.failStatus(false));
            dispatch(batchActions.postStatus(false));
          }, 5000);
        }
      }).catch(error => {
        // Handle any errors that occurred during postSale dispatch
        setTimeout(() => {
          setBundleState('Product');
          dispatch(batchActions.successStatus(false));
          dispatch(batchActions.failStatus(false));
          dispatch(batchActions.postStatus(false));
        }, 3000);
      })
    }
    else{
      setEmpty("Please fill in all fields")
      setTimeout(()=>{
        setEmpty("")
      }, 3000)
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber.startsWith('0')) {
      // Replace leading 0 with +263
      return `+263${phoneNumber.slice(1)}`;
    } else if (phoneNumber.startsWith('263')) {
      // Prepend + if it starts with 263
      return `+${phoneNumber}`;
    } else if (phoneNumber.startsWith('+263')) {
      // Leave it as is
      return phoneNumber;
    } else {
      // Optionally handle other cases, e.g., return null or an error message
      return null; // or return phoneNumber to keep it unchanged
    }
  };

  const handleSubmit = (orderId) => {
    try {
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
      dispatch(postBulkSMS({
        phoneNumber: formattedPhoneNumber,
        bundleId, 
        orderId,
        sessionId
      }))
      .then((response) => {
        console.log("My response: ", response.payload)
        if (response.payload && response.payload.success) {
          if(response.payload.data.code==="FAILED"){
            console.log("Student already has vouchers")
            dispatch(batchActions.successMessage({status: false, message: `Student with phone number ${phoneNumber} already has vouchers`}));
          }
          else if(response.payload.data.code==="SUCCESS"){
            console.log(`Two(2) Vouchers sent to student with phone number ${phoneNumber}`)
            dispatch(batchActions.successMessage({status: true, message: `Two(2) Vouchers sent to student with phone number ${phoneNumber}`}));
            dispatch(closeSale(
              {
                orderId,
                status: true
              }
            ))
          }
          dispatch(batchActions.postStatus(false));
          dispatch(batchActions.successStatus(true));
          setBundleId('');
        } else {
          // Code to undo batch
          console.log("Batch failed");
          dispatch(batchActions.failStatus(true));
          dispatch(batchActions.postStatus(false));
          // Clear the loading state after 5 seconds
        }
      })
      .finally(() => {
        setTimeout(() => {
          // setLoadingSuccess(false);
          setBundleState('Product');
          dispatch(batchActions.successStatus(false));
          dispatch(batchActions.failStatus(false));
          dispatch(batchActions.postStatus(false));
        }, 2000);
      });
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
            <div className="p-4">
              <form >
                <div style={{ color: 'red', marginBottom: '10px' }}>{empty}</div>
                <label className="form-label" style={{ padding: 0 }}>Phone Number</label>
                <div className="input-group input-group-dynamic" style={{ marginBottom: '10px' }}>
                  <input 
                    type="text" 
                    name="phoneNumber" 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    value={phoneNumber} 
                    className="form-control" 
                    placeholder="Phone Number"
                  />
                </div>

                {/* Bundle dropdown */}
                <div className="dropdown">
                  <button
                    className="btn bg-gradient-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {bundleState}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {renderedBundle}
                  </ul>
                </div>
                
                {/* Session dropdown */}
                <div className="dropdown">
                  <button
                    className="btn bg-gradient-primary dropdown-toggle"
                    type="button"
                    id="sessionDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {sessionState}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="sessionDropDown">
                    {renderedSessions}
                  </ul>
                </div>
                <button onClick={makeSale} className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
      </div>
    </>
  );
}

export default BulkVoucherPost;

// const Style2 = {
//   paddingTop: "1rem",
//   paddinBottom: "0.5rem"
// }