import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { getAllClients, getLoadingStatus } from '../../../store/clients-slice';
import { getAllNetworkClients } from '../../../store/report-slice';
import CustomerCard from '../CustomerCard/CustomerCard';
import { BeatLoader } from 'react-spinners';

const userRole = localStorage.getItem('role')

const CustomerList = () => {
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
    

  const clients = useSelector(getAllClients)

  var count = Object.keys(clients).length

  let renderedClients = ''
  if(count>0){
    renderedClients =(
      clients.map((client, index)=>(
        <tr key={index}>
          <CustomerCard data={client}/>
        </tr>
      ))
    )
  }
  else{
    renderedClients = <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No Customers Found</h5></td>
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
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">First Name</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Last Name</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Phone Number</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Email</th>
          </tr>
        </thead>
        <tbody>
        {
          loading==='pending'?
          loadingAnimation: 
          loading ==='rejected'?
            errorMsg:  renderedClients
        }
          
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;

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
