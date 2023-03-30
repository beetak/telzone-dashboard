import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import BeatLoader from "react-spinners/BeatLoader";
import { getAllShops, getLoadingShop } from '../../../store/entities-slice';
import TelOneShopCard from '../TelOneShopCard/TelOnerShopCard';

const userRole = localStorage.getItem('role')

export default function TelOneShopList() {

  const loading = useSelector(getLoadingShop)

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

  const shops = useSelector(getAllShops)

  var count = Object.keys(shops).length
  let renderedShops = ''
  if(count>0){
    renderedShops = (
      shops.map((shop, index)=>(
        <tr key={index}>
          <TelOneShopCard data={shop} index={index}/>
        </tr>
      ))
    )
  }
  else{
    renderedShops = <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No Shop Found</h5></td>
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
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{width: "5%"}}>Shop Name</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Address</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Town</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Phone Number</th>
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
              errorMsg:  renderedShops
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