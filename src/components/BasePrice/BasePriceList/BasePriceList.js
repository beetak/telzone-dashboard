import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getBasePrice, 
  getLoadingStatus 
} from '../../../store/basePrice-slice';
import BasePriceCard from '../BasePriceCard/BasePriceCard';
import BeatLoader from 'react-spinners/BeatLoader'

const BasePriceList = () => {
  
  const prices = useSelector(getBasePrice)
  const loading = useSelector(getLoadingStatus)

  const dispatch  = useDispatch()
  // useEffect(() => {
  //   
  // }, [dispatch]);

  let renderedPrice = ''

  var count = Object.keys(prices).length
  if(count>0){
    renderedPrice = (
      prices.map((price, index)=>(
        <tr key={index}>
          <BasePriceCard data={price}/>
        </tr>
      ))
    )
  }
  else{
    renderedPrice = 
    <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No Bank Rate Found</h5></td>
    </tr>
  }

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
  return (
    <div>
      <table className="table align-items-center mb-0">
        <thead>
          <tr>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Rate</th>
          </tr>
        </thead>
        <tbody>
        {
          loading==='pending'?
          loadingAnimation: 
          loading ==='rejected'?
            errorMsg:  renderedPrice
        }
        </tbody>
      </table>
    </div>
  );
}

export default BasePriceList;

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