import React from 'react';
import { useSelector } from 'react-redux';
import { getLoadingStatus } from '../../../store/bundle-slice';
import { getAllOrganisations } from '../../../store/report-slice';
import OrganisationCard from '../OrganisationCard/OrganisationCard';
import { BeatLoader } from 'react-spinners/BeatLoader';

const OrganisationsList = () => {
  
  const organisations = useSelector(getAllOrganisations)
  let renderedOrganisations = ''
  renderedOrganisations = organisations ? (
    organisations.map((organisation, index)=>(
      <tr key={index}>
        <OrganisationCard data={organisation} index={index}/>
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
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Organisational Name</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Organisation ID</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Url</th>
          </tr>
        </thead>
        <tbody>
          {
            loading==='pending'?
              loadingAnimation: renderedOrganisations
          }
        </tbody>
      </table>
    </div>
  );
}

export default OrganisationsList;

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