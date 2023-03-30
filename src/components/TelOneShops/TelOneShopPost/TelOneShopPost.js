import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBusinessRoles } from '../../../store/business-role-slice';
import { postAsyncBusiness } from '../../../store/business-slice';
import { getAllRegions, getAllTowns, postShop } from '../../../store/entities-slice';
import BusinessRoleDropdown from '../../BusinessRole/BusinessRoleDropdown/BusinessRoleDropdown';
import TelOneRegionDropdown from '../../TelOneRegions/TelOneRegionDropdown/TelOneRegionDropdown';
import TelOneTownDropdown from '../../TelOneTowns/TelOneTownDropdown/TelOneTownDropdown';
import TelOneShopDropdown from '../TelOneShopDropdown/TelOneShopDropdown';

export default function TelOneShopPost(){

  const dateCreated = new Date()

  const[empty, setEmpty] = useState('')
  const[name, setName] = useState('')
  const[active, setActive] = useState('true')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dis, setDiscount] = useState('')
  const [vat, setVat] = useState('')
  const [townId, setTownId] = useState('')
  const [town, setTown] = useState('Town')
  const [region, setRegion] = useState('Region')
  const [roleID, setRoleID] = useState('')


  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name==='' || phoneNumber === '' || address === '' || townId === ''){
      setEmpty("Please fill in all the fields")
    }
    else{
      dispatch(postShop({ 
        shop: {
          address,
          dateCreated,
          name,
          phoneNumber
        },
        townId
        })
      );
      setName('')
      setEmpty('')
    }
  };

  const roleData = useSelector(getAllBusinessRoles)

  console.log("roles: ", roleData)

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
                    <input type="text" name="name" onChange={(e)=>setName(e.target.value)} className="form-control" />
                </div>
                <label className="form-label" style={{padding: 0}}>Address</label>
                <div className="input-group input-group-dynamic">
                    <input type="text" name="address" onChange={(e)=>setAddress(e.target.value)} className="form-control" />
                </div>
                <label className="form-label" style={{padding: 0}}>Phone Number</label>
                <div className="input-group input-group-dynamic mb-4">
                    <input type="text" name="phone" onChange={(e)=>setPhoneNumber(e.target.value)} className="form-control" />
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
                <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
              </form>
            </div>
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