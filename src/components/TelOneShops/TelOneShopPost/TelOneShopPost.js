import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTowns, postShop } from '../../../store/entities-slice';
import TelOneTownDropdown from '../../TelOneTowns/TelOneTownDropdown/TelOneTownDropdown';
import { BeatLoader } from 'react-spinners';

export default function TelOneShopPost(){

  const dateCreated = new Date()

  const [empty, setEmpty] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [townId, setTownId] = useState('')
  const [town, setTown] = useState('Town')
  const [success, setSuccess] = useState(false)
  const [failed, setFailed] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState(false)

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name==='' || phoneNumber === '' || address === '' || townId === ''){
      setEmpty("Please fill in all the fields")
    }
    else{
      setLoadingStatus(true);    
          try {
              const response = await dispatch(
                postShop({ 
                  shop: {
                    address,
                    dateCreated,
                    name,
                    phoneNumber
                  },
                  townId
                })
              );
      
              if (response.payload) {
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
                  setAddress('')
                  setPhoneNumber('')
                  setTown('')
                  setEmpty('')
              }, 2000);
        }
    }
  }

  let loadingAnimation = 
  <div className='text-center' style={anime}>
      <h5 style={{ color: '#155bb5' }}>
        {loadingStatus && !success  && !failed? 
          "Creating Shop, Please wait" :
          loadingStatus && success  && !failed ? 
            "Shop Creation Successful" :
            loadingStatus && !success  && failed ? "Shop Creation Failed" : ""}
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

  const getTown =(id, name)=>{
    setTownId(id)
    setTown(name)
  }
  
  const townData = useSelector(getAllTowns)

  let renderedTowns = townData ? (
    townData.map((role, index)=>(
      <tr key={index}>
        <TelOneTownDropdown data={role} setTown={getTown}/>
      </tr>
    ))
  ):(<div><h1>Error</h1></div>)
    
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className=" my-4">
            <div className="px-4">
              <form >
                <div style={{color: 'red', marginBottom: '10px'}}>{empty}</div>
                <label className="form-label" style={{padding: 0}}>Shop Name</label>
                <div className="input-group input-group-dynamic">
                    <input type="text" name="name" onChange={(e)=>{setName(e.target.value);setEmpty('')}} value={name} className="form-control" />
                </div>
                <label className="form-label" style={{padding: 0}}>Address</label>
                <div className="input-group input-group-dynamic">
                    <input type="text" name="address" onChange={(e)=>{setAddress(e.target.value);setEmpty('')}} value={address} className="form-control" />
                </div>
                <label className="form-label" style={{padding: 0}}>Phone Number</label>
                <div className="input-group input-group-dynamic mb-4">
                    <input type="text" name="phoneNumber" onChange={(e)=>{setPhoneNumber(e.target.value);setEmpty('')}} value={phoneNumber} className="form-control" />
                </div>
                {/* Towns dropdown */}
                <div className="dropdown">
                    <button 
                        className="btn bg-gradient-primary dropdown-toggle" 
                        type="button" 
                        id="dropdownMenuButton" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                        >
                        {town}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      {renderedTowns}
                    </ul>
                </div>
                {loadingAnimation}
                <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
              </form>
            </div>
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