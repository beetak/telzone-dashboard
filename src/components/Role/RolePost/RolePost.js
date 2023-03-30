
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { postRole } from '../../../store/entities-slice';

export default function RolePost(){

  const[empty, setEmpty] = useState('')
  const[role, setRole] = useState('')


    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(role === ''){
        setEmpty('Please fill in the role')
      }
      else{
        dispatch(postRole({ 
          role: {
            role
          }})
        );
        setRole('')
      }
    };
    
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="px-4">
              <form >
                <div style={{color: 'red', marginBottom: '10px'}}>{empty}</div>
                  <label className="form-label">Role Name</label>
                  <div className="input-group input-group-dynamic">
                      <input type="text" name="role" value={role} onChange={(e)=>setRole(e.target.value)} className="form-control" />
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