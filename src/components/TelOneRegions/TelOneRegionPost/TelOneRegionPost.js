import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBusinessRoles } from '../../../store/business-role-slice';
import { postAsyncBusiness } from '../../../store/business-slice';
import { postRegion } from '../../../store/entities-slice';
import BusinessRoleDropdown from '../../BusinessRole/BusinessRoleDropdown/BusinessRoleDropdown';
import { BeatLoader } from 'react-spinners';

export default function TelOneRegionPost(){

  const dateCreated = new Date()

  const[empty, setEmpty] = useState('')
  const[name, setName] = useState('')
  const [success, setSuccess] = useState(false)
  const [failed, setFailed] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState(false)

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name===''){
      setEmpty("Please fill in all the fields")
    }
    else{
      setLoadingStatus(true);    
          try {
              const response = await dispatch(
                postRegion({ 
                  region: {
                    dateCreated,
                    name
                  }
                  })
              );
      
              if (response.payload) {
                  console.log(response)
                  if (response.payload.code === 'SUCCESS') {
                      setSuccess(true);
                  } else {
                      setFailed(true);
                  }
              } else {
                  setFailed(true);
              }
              } catch (error) {
                  setFailed(true);
              } finally {
              setTimeout(() => {
                  setSuccess(false);
                  setLoadingStatus(false);
                  setFailed(false);
                  setName('')
                  setEmpty('')
              }, 2000);
        }
    }
  }

  let loadingAnimation = 
  <div className='text-center' style={anime}>
      <h5 style={{ color: '#155bb5' }}>
        {loadingStatus && !success  && !failed? 
          "Creating Region, Please wait" :
          loadingStatus && success  && !failed ? 
            "Region Creation Successful" :
            loadingStatus && !success  && failed ? "Region Creation Failed" : ""}
      </h5>
      {
        loadingStatus ? 
        <BeatLoader
          color={'#055bb5'}
          loading={loadingStatus}
          cssOverride={override}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />: ""
      }      
  </div>
    
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="px-4">
            <form >
              <div style={{color: 'red', marginBottom: '10px'}}>{empty}</div>
              <label className="form-label" style={{padding: 0}}>Region Name</label>
              <div className="input-group input-group-dynamic">
                  <input type="text" name="name" onChange={(e)=>setName(e.target.value)} value={name} className="form-control" />
              </div>
              {loadingAnimation}
              <button onClick={handleSubmit} className="btn btn-primary my-4">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
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
}