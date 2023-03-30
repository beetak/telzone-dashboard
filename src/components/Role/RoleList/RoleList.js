import React from 'react';
import { useSelector } from 'react-redux';
import { getAllBusinessRoles } from '../../../store/business-role-slice';
import { getAllCategories } from '../../../store/category-slice';
import { getAllRoles, getLoadingRole } from '../../../store/entities-slice';
import RoleCard from '../RoleCard/RoleCard';
import BeatLoader from "react-spinners/BeatLoader";

export default function RoleList(){

  const loading = useSelector(getLoadingRole)

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
  
  const roles = useSelector(getAllRoles)

  var count = Object.keys(roles).length
  let renderedRoles = ''
  if(count>0){
    renderedRoles = (
      roles.map((role, index)=>(
        <tr key={index}>
          <RoleCard data={role}/>
        </tr>
      ))
    )
  }
  else{
    renderedRoles = <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No Roles Found</h5></td>
    </tr>
  }

  let errorMsg =  
    <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#E91E63'}}>Oops something went wrong. Please refresh page</h5></td>
    </tr>

  return (
    <div>
      <table className="table align-items-center mb-0">
        <thead>
          <tr>
            <th hidden className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">id</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Role Name</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            loading==='pending'?
            loadingAnimation: 
            loading ==='rejected'?
              errorMsg:  renderedRoles
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