import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  
          fetchAsyncCategory, 
          getAllCategories, 
          getLoadingStatus 
        } from '../../../store/category-slice';
import { getToggleStatus } from '../../../store/toggle-slice';
import CategoryCard from '../CatetgoryCard/CategoryCard';
import BeatLoader from "react-spinners/BeatLoader";

const CategoryList = () => {

  const dispatch = useDispatch()
  const active = useSelector(getToggleStatus)
  useEffect(() => {
    dispatch(fetchAsyncCategory(active))
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

  const categories = useSelector(getAllCategories)

  var count = Object.keys(categories).length
  console.log(count)
  let renderedCategory = ''
  if(count>0){
    renderedCategory = (
      categories.map((category, index)=>(
        <tr key={index}>
          <CategoryCard data={category} index={index}/>
        </tr>
      ))
    )
  }
  else{
    renderedCategory = <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No Categories Found</h5></td>
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
            <th hidden className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">id</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">category Name</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">category Description</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            loading==='pending'?
            loadingAnimation: 
            loading ==='rejected'?
              errorMsg: renderedCategory
          }
        </tbody>
      </table>
    </div>
  );
}

export default CategoryList;

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