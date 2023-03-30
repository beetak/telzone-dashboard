import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import BeatLoader from "react-spinners/BeatLoader";
import { getAllRegions, getLoadingRegion } from '../../../store/entities-slice';
import TelOneRegionCard from '../TelOneRegionCard/TelOneRegionCard';

const userRole = localStorage.getItem('role')

export default function TelOneRegionList(){

  const loading = useSelector(getLoadingRegion)

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

  const regions = useSelector(getAllRegions)

  var count = Object.keys(regions).length
  let renderedRegions = ''
  if(count>0){
    renderedRegions = (
      regions.map((partner, index)=>(
        <tr key={index}>
          <TelOneRegionCard data={partner} index={index}/>
        </tr>
      ))
    )
  }
  else{
    renderedRegions = <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No Regions Found</h5></td>
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
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Region Name</th>
            {/*
              userRole==='Super Admin' || 'Admin' ? (
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ">Action</th>  
              ):("")
              */} 
          </tr>
        </thead>
        <tbody>
          {
            loading==='pending'?
            loadingAnimation: 
            loading ==='rejected'?
              errorMsg:  renderedRegions
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