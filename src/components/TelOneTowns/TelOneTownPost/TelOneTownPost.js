import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRegions, postTown } from '../../../store/entities-slice';
import TelOneRegionDropdown from '../../TelOneRegions/TelOneRegionDropdown/TelOneRegionDropdown';
import { BeatLoader } from 'react-spinners';

export default function TelOneTownPost(){

  const dateCreated = new Date()

  const [empty, setEmpty] = useState('')
  const [name, setName] = useState('')
  const [region, setRegion] = useState('Region')
  const [regionId, setRegionId] = useState('')
  const [success, setSuccess] = useState(false)
  const [failed, setFailed] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState(false)

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name==='' || regionId===''){
      setEmpty("Please fill in all the fields")
    }
    else{
      setLoadingStatus(true);    
          try {
              const response = await dispatch(
                postTown({ 
                  regionId,
                  town: {
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
                  setRegion('')
                  setEmpty('')
              }, 2000);
        }
    }
  }

  let loadingAnimation = 
  <div className='text-center' style={anime}>
      <h5 style={{ color: '#155bb5' }}>
        {loadingStatus && !success  && !failed? 
          "Creating Town, Please wait" :
          loadingStatus && success  && !failed ? 
            "Town Creation Successful" :
            loadingStatus && !success  && failed ? "Town Creation Failed" : ""}
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

  const regionData = useSelector(getAllRegions)

  const getRegion =(id, name)=>{
    setRegionId(id)
    setRegion(name)
  }

  let renderedRegions = ''
  renderedRegions = regionData ? (
    regionData.map((region, index)=>(
      <tr key={index}>
        <TelOneRegionDropdown data={region} setRegion={getRegion}/>
      </tr>
    ))
  ):(<div><h1>Error</h1></div>)
    
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="px-4">
            <form >
              <div style={{color: 'red', marginBottom: '10px'}}>{empty}</div>
              <label className="form-label" style={{padding: 0}}>Town Name</label>
              <div className="input-group input-group-dynamic">
                  <input type="text" name="name" onChange={(e)=>setName(e.target.value)} value={name} className="form-control" />
              </div>
              {/* Currency dropdown */}
              <div className="dropdown mt-3">
                  <button 
                      className="btn bg-gradient-primary dropdown-toggle" 
                      type="button" 
                      id="dropdownMenuButton" 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false"
                      >
                      {region}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {renderedRegions}
                  </ul>
              </div>
              {loadingAnimation}
              <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
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