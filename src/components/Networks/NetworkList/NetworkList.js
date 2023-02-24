import React from 'react';
import { useSelector } from 'react-redux';
import { getAllNetworks } from '../../../store/report-slice';
import NetworkCard from '../NetworkCard/NetworkCard';
import BeatLoader from "react-spinners/BeatLoader";
import { getLoadingStatus } from '../../../store/bundle-slice';

const NetworkList = () => {
  
  const networks = useSelector(getAllNetworks)
  let renderedNetworks = ''
  renderedNetworks = networks ? (
    networks.map((network, index)=>(
      <tr key={index}>
        <NetworkCard data={network} index={index}/>
      </tr>
    ))
  ):(<div><h1>Error</h1></div>)

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
  return (
    <div>
      <table className="table align-items-center mb-0">
        <thead>
          <tr>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Organisational ID</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Network ID</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Name</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Time Zone</th>
          </tr>
        </thead>
        <tbody>
          {loading==='pending'?
            loadingAnimation: renderedNetworks
          }
        </tbody>
      </table>
    </div>
  );
}

export default NetworkList;

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