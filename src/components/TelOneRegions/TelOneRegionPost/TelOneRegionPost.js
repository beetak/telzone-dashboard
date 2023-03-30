import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBusinessRoles } from '../../../store/business-role-slice';
import { postAsyncBusiness } from '../../../store/business-slice';
import { postRegion } from '../../../store/entities-slice';
import BusinessRoleDropdown from '../../BusinessRole/BusinessRoleDropdown/BusinessRoleDropdown';

export default function TelOneRegionPost(){

  const dateCreated = new Date()

  const[empty, setEmpty] = useState('')
  const[name, setName] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name===''){
      setEmpty("Please fill in all the fields")
    }
    else{
      dispatch(postRegion({ 
        region: {
          dateCreated,
          name
        }
        })
      );
      setName('')
      setEmpty('')
    } 
  };
    
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="px-4">
            <form >
              <div style={{color: 'red', marginBottom: '10px'}}>{empty}</div>
              <label className="form-label" style={{padding: 0}}>Region Name</label>
              <div className="input-group input-group-dynamic">
                  <input type="text" name="name" onChange={(e)=>setName(e.target.value)} className="form-control" />
              </div>
              <button onClick={handleSubmit} className="btn btn-primary my-4">Submit</button>
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