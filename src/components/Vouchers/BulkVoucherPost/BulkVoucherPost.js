import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { batchActions, postBulkSMSVouchers } from '../../../store/batch-slice';
import BundleDropdown from '../../Bundles/BundleDropdown/BundleDropdown';
import { fetchAsyncBundles, getAllBundles } from '../../../store/bundle-slice';
import { postBulkSMS, postSale } from '../../../store/cart-slice';

const userID = localStorage.getItem("userId")
const regionId = localStorage.getItem("regionId")
const townId = localStorage.getItem("townId")
const shopId = localStorage.getItem("shopId")

const BulkVoucherPost = () => {

  const [empty, setEmpty] = useState('')
  const [bundleState, setBundleState] = useState('Product')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [bundleId, setBundleId] = useState('')
  const [bundlePrice, setBundlePrice] = useState('')
  const [message, setMessage] = useState('')


  const dispatch = useDispatch()
  const active = true

  useEffect(() => {
    dispatch(fetchAsyncBundles(active))
  }, [dispatch]);

  const getBundle = (id, name, price) => {
    setBundleId(id)
    setBundleState(name)
    setBundlePrice(price)
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

  const makeSale = async (e) => {
    e.preventDefault();
    dispatch(batchActions.postStatus(true));
    const t = new Date()
    const timeCreated = t.toLocaleTimeString('en-US', { hour12: false });
    const date = new Date()
    const today = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

    const unitPrice = (Math.round(bundlePrice * 10000 / (115)) / 100).toFixed(2)
    const totalPrice = (Math.round(unitPrice * 200)/100).toFixed(2)
    const totalVat = (Math.round((bundlePrice - unitPrice)*200)/100).toFixed(2)
    const netTotal = (Math.round((parseFloat(totalVat) + parseFloat(totalPrice))*100)/100).toFixed(2)

    if(phoneNumber && bundleId){
      dispatch(postSale({
        adminPortalUserId: userID,
        bundleId,
        businessPartnerId: 100,
        currencyId: 1,
        order: {
          amount: netTotal,
          dateCreated: date,
          discount: 0,
          id:'',
          payingAccountNumber: "TelOne",
          quantity: 2,
          vat: totalVat,
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

  const handleSubmit = (orderId) => {
    try {
      dispatch(postBulkSMS({
        phoneNumber, 
        bundleId, 
        orderId
      }))
      .then((response) => {
        console.log("My response: ", response.payload)
        if (response.payload && response.payload.success) {
          if(response.payload.data.message==="Student already has a voucher code."){
            console.log("Student already has vouchers")
            dispatch(batchActions.successMessage({status: false, message: `Student with phone number ${phoneNumber} already has vouchers`}));
          }
          else if(response.payload.data.message==="Vouchers attached to TcflStudent."){
            console.log(`Two(2) Vouchers sent to student with phone number ${phoneNumber}`)
            dispatch(batchActions.successMessage({status: true, message: `Two(2) Vouchers sent to student with phone number ${phoneNumber}`}));
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
                  <input type="text" name="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} className="form-control" style={{ padding: 0 }} />
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
                <button onClick={makeSale} className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
      </div>
    </>
  );
}

export default BulkVoucherPost;

const Style2 = {
  paddingTop: "1rem",
  paddinBottom: "0.5rem"
}