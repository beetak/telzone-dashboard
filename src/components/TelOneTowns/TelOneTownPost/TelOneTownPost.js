import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRegions, postTown } from '../../../store/entities-slice';
import TelOneRegionDropdown from '../../TelOneRegions/TelOneRegionDropdown/TelOneRegionDropdown';

export default function TelOneTownPost(){

  const dateCreated = new Date()

  const[empty, setEmpty] = useState('')
  const[name, setName] = useState('')
  const[region, setRegion] = useState('Region')
  const[regionId, setRegionId] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name==='' || regionId===''){
      setEmpty("Please fill in all the fields")
    }
    else{
      dispatch(postTown({ 
          regionId,
          town: {
            dateCreated,
            name
          }
        })
      );
      setName('')
      setEmpty('')
    }
  };

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
                  <input type="text" name="name" onChange={(e)=>setName(e.target.value)} className="form-control" />
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
              <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}


const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem"
}