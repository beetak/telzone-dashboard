import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { batchActions, postBulkSMSVouchers } from '../../../store/batch-slice';
import BundleDropdown from '../../Bundles/BundleDropdown/BundleDropdown';
import { fetchAsyncBundles, getAllBundles } from '../../../store/bundle-slice';
import { postSale } from '../../../store/cart-slice';

const userID = localStorage.getItem("userID")

const BulkVoucherPost = () => {

  const [empty, setEmpty] = useState('')
  const [bundleState, setBundleState] = useState('Product')
  const [description, setDescription] = useState('')
  const [attachment, setAttachment] = useState('')
  const [bundleActioned, setBundleActioned] = useState('')
  const [bundleId, setBundleId] = useState('')
  const [bundlePrice, setBundlePrice] = useState('')
  const [selectedFile, setSelectedFile] = useState('')


  const dispatch = useDispatch()
  const active = true

  useEffect(() => {
    dispatch(fetchAsyncBundles(active))
  }, [dispatch]);

  const onFileChange = event => {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      setAttachment(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target.result;
        console.log(contents); // Display the contents of the CSV file
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("selected file: ", attachment)
    if (attachment === '') {
      setEmpty("Please fill in all the fields");
    } else {
      try {
        const formData = new FormData();
        formData.append('files', attachment); // Append the selected file to the formData
  
        dispatch(postBulkSMSVouchers(formData))
          .then((response) => {
            if (response.payload && response.payload.success) {
              dispatch(batchActions.postStatus(false));
              dispatch(batchActions.successStatus(true));
              setBundleID('');
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
        // }
      } catch (error) {
        // Error occurred during file upload
        // Handle the error
        console.log('Error uploading file:', error);
      }
  
      setDescription('');
      setBundleState('Product Type');
      setAttachment('');
    }
  };

  const getBundle = (id, name) => {
    setBundleId(id)
    setBundleActioned(name)
    setBundleState(name)
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

  const makeSale = () => {
    const t = new Date()
    const timeCreated = t.toLocaleTimeString('en-US', { hour12: false });
    const date = new Date()
    const today = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

    if (currencyId === '') {
      setEmpty("Please select currency");
    } else {
      setLoadingStatus(true)

      dispatch(postSale({
        adminPortalUserId: userID,
        bundleId,
        businessPartnerId: 100,
        currencyId: 1,
        order: {
          amount: netTotal,
          dateCreated: today,
          discount: 0,
          id:'',
          payingAccountNumber: "TelOne",
          quantity: 2,
          vat: totalVat,
          status: false,
          timeCreated
        },
        regionId,
        shopId,
        townId
      })).then(response => {
        if (response.payload && response.payload.code === "SUCCESS") {  
          // Execute postVoucherSaleByBundleId
          saleByBundle(postBundleId, totalQty, response.payload.data.order.id, printSize);
        } else {
          // Request was not successful
          setLoadingFailed(true)
          setError("Please check your network")
          setTimeout(() => {
            setLoadingStatus(false);
            setLoadingSuccess(false);
            setBusinessPartnerName(`Client's Name`)
            setCurrencyState('Currency')
            dispatch(cartActions.deleteFromCart())
          }, 5000);
        }
      }).catch(error => {
        // Handle any errors that occurred during postSale dispatch
        setLoadingFailed(true)
        setError("Error posting")
        setTimeout(() => {
          setLoadingStatus(false);
          setLoadingSuccess(false);
          setBusinessPartnerName(`Client's Name`)
          setCurrencyState('Currency')
          dispatch(cartActions.deleteFromCart())
        }, 3000);
      })
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
                  <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} value={description} className="form-control" style={{ padding: 0 }} />
                </div>

                {/* Category dropdown */}
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
                <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
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