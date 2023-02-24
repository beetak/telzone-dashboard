import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAsyncCurrency, 
  getAllCurrencies, 
  getLoadingStatus 
} from '../../../store/currency-slice';
import { getToggleStatus } from '../../../store/toggle-slice';
import CurrencyCard from '../CurrencyCard/CurrencyCard';
import BeatLoader from "react-spinners/BeatLoader";

const CurrencyList = () => {

  const dispatch = useDispatch()
  const active = useSelector(getToggleStatus)
  useEffect(() => {
    dispatch(fetchAsyncCurrency(active))
  }, [dispatch, active]);

  const loading = useSelector(getLoadingStatus)

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
  
  const currencies = useSelector(getAllCurrencies)

  var count = Object.keys(currencies).length
  let renderedCurrency = ''
  if(count>0){
    renderedCurrency = (
      currencies.map((currency, index)=>(
        <tr key={index}>
          <CurrencyCard data={currency} index={index}/>
        </tr>
      ))
    )
  }
  else{
    renderedCurrency = <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No Currency Found</h5></td>
    </tr>
  }

  let errorMsg =  
    <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#E91E63'}}>Opps something went wrong. Please refresh page</h5></td>
    </tr>

  return (
    <div>
      <table className="table align-items-center mb-0">
        <thead>
          <tr>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              Currency Name
            </th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              Currency Symbol
            </th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            loading==='pending'?
            loadingAnimation: 
            loading ==='rejected'?
              errorMsg: renderedCurrency
          }
        </tbody>
      </table>
    </div>
  );
}

export default CurrencyList;

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