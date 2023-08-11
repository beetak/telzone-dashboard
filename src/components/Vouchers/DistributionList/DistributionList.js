import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToggleStatus } from '../../../store/toggle-slice';
import { getLoadingStatus } from '../../../store/batch-slice';
import { fetchAsyncBundles, getAllBundles } from '../../../store/bundle-slice';
import { BeatLoader } from 'react-spinners';
import DistributionCard from '../DistributionCard/DistributionCard';

export default function DistributionList() {
    const dispatch = useDispatch()
    const active = useSelector(getToggleStatus)
    const loading = useSelector(getLoadingStatus)
  
    useEffect(() => {
      dispatch(fetchAsyncBundles(active))
    }, [dispatch, active]);
  
    const bundles = useSelector(getAllBundles)
  
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
    
    let renderedBundles = ''
  
    var count = Object.keys(bundles).length
    if(count>0){
      renderedBundles = (
        bundles.map((bundle, index)=>(
          <tr key={index}>
            <DistributionCard data={bundle} index={index}/>
          </tr>
        ))
      )
    }
    else{
      renderedBundles = 
      <tr>
        <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No Bundles Found</h5></td>
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
                Transaction
              </th>
              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                Product
              </th>
              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Quantity</th>
              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Current User</th>
              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Last Modified</th>
              <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Status</th>
            </tr>
          </thead>
          <tbody>
  
            {
              loading==='pending'?
              loadingAnimation: 
              loading ==='rejected'?
                errorMsg: renderedBundles
            }
      
          </tbody>
        </table>
      </div>
    );
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