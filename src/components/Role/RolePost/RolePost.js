
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { postRole } from '../../../store/entities-slice';
import { BeatLoader } from 'react-spinners';

export default function RolePost(){

  const [empty, setEmpty] = useState('')
  const [role, setRole] = useState('')
  const [success, setSuccess] = useState(false)
  const [failed, setFailed] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState(false)


    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(role === ''){
        setEmpty('Please fill in the role')
      }
      else{
        setLoadingStatus(true);    
            try {
                const response = await dispatch(
                  postRole({ 
                    role: {
                      role
                  }})
                );
        
                if (response.payload) {
                    console.log("my result",response)
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
                    setRole('')
                    setEmpty('')
                }, 2000);
          }
      }
    }
  
    let loadingAnimation = 
    <div className='text-center' style={anime}>
        <h5 style={{ color: '#155bb5' }}>
          {loadingStatus && !success  && !failed? 
            "Creating User Role, Please wait" :
            loadingStatus && success  && !failed ? 
              "User Role Creation Successful" :
              loadingStatus && !success  && failed ? "User Role Creation Failed" : ""}
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
                  <label className="form-label">Role Name</label>
                  <div className="input-group input-group-dynamic">
                      <input type="text" name="role" value={role} onChange={(e)=>{setRole(e.target.value);setEmpty('')}} className="form-control" />
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