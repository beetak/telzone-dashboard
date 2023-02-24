import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { getAllBusinessPartners, getLoadingStatus } from '../../../store/business-slice';
import BusinessPartnerCard from '../BusinessPartnerCard/BusinessPartnerCard';
import BeatLoader from "react-spinners/BeatLoader";

const userRole = localStorage.getItem('role')

const BusinessPartnerList = () => {

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

  const businessPartners = useSelector(getAllBusinessPartners)

  var count = Object.keys(businessPartners).length
  let renderedBusinessPartner = ''
  if(count>0){
    renderedBusinessPartner = (
      businessPartners.map((partner, index)=>(
        <tr key={index}>
          <BusinessPartnerCard data={partner} index={index}/>
        </tr>
      ))
    )
  }
  else{
    renderedBusinessPartner = <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No Business Partners Found</h5></td>
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
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{width: "5%"}}>Partner's Name</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Bus Address</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Email</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Phone Number</th>
            {
              userRole==='Super Admin' || 'Admin' ? (
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ">Action</th>  
              ):("")
            } 
          </tr>
        </thead>
        <tbody>
          {
            loading==='pending'?
            loadingAnimation: 
            loading ==='rejected'?
              errorMsg:  renderedBusinessPartner
          }
        </tbody>
      </table>
    </div>
  );
}

export default BusinessPartnerList;

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