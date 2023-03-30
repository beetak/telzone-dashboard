import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import BeatLoader from "react-spinners/BeatLoader";
import { getAllTowns, getLoadingTown } from '../../../store/entities-slice';
import TelOneTownCard from '../TelOneTownCard/TelOneTownCard';

const userRole = localStorage.getItem('role')

export default function TelOneTownList(){

  const loading = useSelector(getLoadingTown)

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

  const towns = useSelector(getAllTowns)

  var count = Object.keys(towns).length
  let renderedTown = ''
  if(count>0){
    renderedTown = (
      towns.map((town, index)=>(
        <tr key={index}>
          <TelOneTownCard data={town} index={index}/>
        </tr>
      ))
    )
  }
  else{
    renderedTown = <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No Towns Found</h5></td>
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
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{width: "5%"}}>Town Name</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Region</th>
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
              errorMsg:  renderedTown
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