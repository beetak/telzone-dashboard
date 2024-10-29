
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchAsyncBasePrice, 
    getBasePrice, 
    getLoadingStatus, 
    postAsyncBasePrice, 
    updateBasePrice 
} from '../../../store/basePrice-slice';
import BeatLoader from 'react-spinners/BeatLoader'

const BasePricePost = () => {

    const prices = useSelector(getBasePrice)
    const loading =  useSelector(getLoadingStatus)

    const dispatch  = useDispatch()

    useEffect(() => {
        dispatch(fetchAsyncBasePrice())
    }, [dispatch]);

    const [id, setId] = useState(1)
    const [price, setPrice] = useState('')
    const [priceStatus, setPriceStatus] = useState()
    const [empty, setEmpty] = useState('')
    const [success, setSuccess] = useState(false)
    const [failed, setFailed] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(false)

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(price===''){
          setEmpty("Please fill in all the exchange rate")
      }
      else{
          setLoadingStatus(true);    
          try {
              const response = await dispatch(
                postAsyncBasePrice({ 
                  price
                })
              );
      
              if (response.payload) {
                  console.log(response)
                  if (response.payload.code === 'SUCCESS') {
                      setSuccess(true);
                  } else {
                      setFailed(true);
                  }
              } else {
                  setFailed(true);
              }
              } catch (error) {
                  setFailed(true);
              } finally {
              setTimeout(() => {
                  setSuccess(false);
                  setLoadingStatus(false);
                  setFailed(false);
                  setPrice('')
              }, 2000);
          }
      }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();      
    setLoadingStatus(true);    
    try {
      const response = await dispatch(
        updateBasePrice({ 
          id,
          price
        })
      );
  
      if (response.payload) {
        console.log(response)
        if (response.payload.data.code === 'SUCCESS') {
          setSuccess(true);
        } else {
          setFailed(true);
        }
      } else {
        setFailed(true);
      }
    } catch (error) {
        setFailed(true);
    } finally {
      setTimeout(() => {
        setSuccess(false);
        setLoadingStatus(false);
        setFailed(false);
      }, 2000);
    }
  };
    
  let loadingAnimation = 
  <div className='text-center' style={anime}>
      <h5 style={{ color: '#155bb5' }}>
        {loadingStatus && !success  && !failed? 
          "Creating Exchange Rate, Please wait" :
          loadingStatus && success  && !failed ? 
            "Exchange Rate Creation Successful" :
            loadingStatus && !success  && failed ? "Exchange Creation Failed" : ""}
      </h5>
      {
        loadingStatus ? 
        <BeatLoader
          color={'#055bb5'}
          loading={loadingStatus}
          cssOverride={override}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />: ""
      }      
  </div>

    console.log('prices: ', prices)

    let count = ''
    useEffect(() => {
        count = Object.keys(prices).length
        if(count<=0){
            setPriceStatus(false)    
        }
        else{
            setPriceStatus(true)
            setPrice(prices[0].price)
            setId(prices[0].id)
        }
    }, [prices]);
  
    let errorMsg =  
      <tr>
        <td colspan={7} className='text-center'><h5 style={{color: '#E91E63'}}>Oops something went wrong. Please refresh page</h5></td>
      </tr>
    
    return (
    <>
        <div className="row">
            <div className="col-12">
                <div className="p-4">
                    <form >
                        <div style={{color: 'red', marginBottom: '10px'}}>{empty}</div>
                        <label className="form-label">Bank Rate</label>
                        <div className="input-group input-group-dynamic mb-4">
                            <input type="text" name="price" value={price} placeholder={price} onChange={(e)=>setPrice(e.target.value)} className="form-control" />
                        </div>
                        {loadingAnimation}
                        {
                            priceStatus? 
                            (
                                <button onClick={handleUpdate} className="btn btn-primary">Update</button>
                            ): 
                            (
                                <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                            )
                        }
                        <div style={{textAlign: 'centre'}}>
                            <h6>{priceStatus?'Update Interbank Rate Here':'Interbank Rate Not Found. Create new Rate'}</h6>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  );
}

export default BasePricePost;

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
  }

