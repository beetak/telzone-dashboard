import React from 'react';
import { useSelector } from 'react-redux';
import { getAllCategories } from '../../../store/category-slice';
import CategoryCard from '../CatetgoryCard/CategoryCard';

export default function BusinessRoleList ()  {
  
  const categories = useSelector(getAllCategories)
  let renderedCategory = ''
  renderedCategory = categories ? (
    categories.map((category, index)=>(
      <tr key={index}>
        <CategoryCard data={category}/>
      </tr>
    ))
  ):(<div><h1>Error</h1></div>)
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
          {renderedCategory}
        </tbody>
      </table>
    </div>
  );
}
