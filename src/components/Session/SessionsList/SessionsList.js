import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getLoadingStatus } from '../../../store/category-slice';
import BeatLoader from "react-spinners/BeatLoader";
import SessionCard from '../SessionCard/SessionCard';
import Api from '../../Api/Api';

const SessionsList = () => {
  const [sessions, setSessions] = useState([]); // Correctly initialize state
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {    
    fetchSessions();
  }, []);

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  const fetchSessions = async () => {
    try {
      const response = await Api.get(`/session/active`, { headers });
      console.log("resp", response);
      
      if (response.data && response.data.code === 'SUCCESS') {
        setSessions(response.data.data); 
        setSuccess(true);
      } else {
        setFailed(true);
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setFailed(true);
    }
  };

  const loading = useSelector(getLoadingStatus);

  let loadingAnimation = (
    <tr className='' style={anime}>
      <td colSpan={6}>
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
  );

  let renderedCategory; // Declare variable to hold rendered categories
  if (sessions.length > 0) { // Use length to check for non-empty array
    renderedCategory = sessions.map((category, index) => (
      <tr key={index}>
        <SessionCard data={category} index={index} getSession={fetchSessions}/>
      </tr>
    ));
  } else {
    renderedCategory = (
      <tr>
        <td colSpan={7} className='text-center'>
          <h5 style={{ color: '#0C55AA' }}>No Sessions Found</h5>
        </td>
      </tr>
    );
  }

  let errorMsg = (
    <tr>
      <td colSpan={7} className='text-center'>
        <h5 style={{ color: '#E91E63' }}>Oops, something went wrong. Please refresh the page.</h5>
      </td>
    </tr>
  );

  return (
    <div>
      <table className="table align-items-center mb-0">
        <thead>
          <tr>
            <th hidden className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">id</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Session ID</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            loading === 'pending' ? loadingAnimation :
            loading === 'rejected' ? errorMsg :
            renderedCategory
          }
        </tbody>
      </table>
    </div>
  );
};

export default SessionsList;

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
};