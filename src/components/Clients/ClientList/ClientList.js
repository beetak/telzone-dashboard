import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { getAllNetworkClients } from '../../../store/report-slice';
import ClientCard from '../ClientCard/ClientCard';
import BeatLoader from 'react-spinners/BeatLoader'
import { getLoadingStatus } from '../../../store/clients-slice';

const userRole = localStorage.getItem('role')

const ClientList = () => {

  const clients = useSelector(getAllNetworkClients)
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
  
  var count = Object.keys(clients).length
  let renderedClients = ''
  if(count>0){
    renderedClients = (
      clients.map((client, index)=>(
        <tr key={index}>
          <ClientCard data={client}/>
        </tr>
      ))
    )
  }
  else{
    renderedClients = <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No Clients Found</h5></td>
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
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Mac Address</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">OS Type</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Status</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Connection Type</th>
            {/*<th colSpan={2} className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Action</th>*/}
          </tr>
        </thead>
        <tbody>
          {
            loading==='pending'?
            loadingAnimation: 
            loading ==='rejected'?
              errorMsg: renderedClients
          }
        </tbody>
      </table>
    </div>
  );
}

export default ClientList;

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
