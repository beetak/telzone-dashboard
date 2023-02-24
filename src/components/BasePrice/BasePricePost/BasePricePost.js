
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
    // useEffect(() => {
    //     dispatch(fetchAsyncBasePrice())
    // }, [dispatch]);

    const[id, setId] = useState(1)
    const[price, setPrice] = useState('')
    const[priceStatus, setPriceStatus] = useState()

    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(postAsyncBasePrice({ 
          price
        })
      );
      setPrice('')
    };

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

    let loadingAnimation = 
    <tr className='' style={anime}>
      <td colspan={6}>
        <BeatLoader
          color={'#055bb5'}
          loading={loading}
          cssOverride={override}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </td>
    </tr>
  
    let errorMsg =  
      <tr>
        <td colspan={7} className='text-center'><h5 style={{color: '#E91E63'}}>Oops something went wrong. Please refresh page</h5></td>
      </tr>

    const handleUpdate = async (e) => {
        e.preventDefault();
        dispatch(updateBasePrice({ 
            id,
            price
          })
        );
      };
    
    return (
    <>
        <div className="row">
            <div className="col-12">
                <div className="p-4">
                    <form >
                        <label className="form-label">Bank Rate</label>
                        <div className="input-group input-group-dynamic mb-4">
                            <input type="text" name="price" value={price} placeholder={price} onChange={(e)=>setPrice(e.target.value)} className="form-control" />
                        </div>
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
    height: '10vh'
  }