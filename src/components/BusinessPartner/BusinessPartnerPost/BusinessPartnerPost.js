import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBusinessRoles } from '../../../store/business-role-slice';
import { postAsyncBusiness } from '../../../store/business-slice';
import { getAllRegions } from '../../../store/entities-slice';
import BusinessRoleDropdown from '../../BusinessRole/BusinessRoleDropdown/BusinessRoleDropdown';
import TelOneRegionDropdown from '../../TelOneRegions/TelOneRegionDropdown/TelOneRegionDropdown';

const BusinessPartnerPost = () => {

  const[empty, setEmpty] = useState('')
  const[name, setName] = useState('')
  const[active, setActive] = useState('true')
  const [email, setEmail] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dis, setDiscount] = useState('')
  const [vat, setVat] = useState('')
  const [role, setRole] = useState('Dealership Type')
  const [roleID, setRoleID] = useState('')
  const [region, setRegion] = useState('Select Region')
  const [regionId, setRegionId] = useState('')


  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(businessAddress === '' || email === '' || name === '' || phoneNumber === '' || roleID === '' || regionId === ''){
      setEmpty("Please complete all fields")
    }
    else{
      dispatch(postAsyncBusiness({ 
        businessPartner: {
          active,
          businessAddress,
          email,
          name,
          phoneNumber
        },
        businessPartnerRolesID:roleID,
        regionId
        })
      );
      setBusinessAddress('')
      setEmail('')
      setPhoneNumber('')
      setName('')
      setEmpty('')
    }
  };

  const roleData = useSelector(getAllBusinessRoles)

  console.log("roles: ", roleData)

  const getRole =(id, name, discount, vat)=>{
    setRoleID(id)
    setRole(name)
    setDiscount(discount)
    setVat(vat)
  }

  let renderedRoles = ''
  renderedRoles = roleData ? (
    roleData.map((role, index)=>(
      <tr key={index}>
        <BusinessRoleDropdown data={role} setBusinessRole={getRole}/>
      </tr>
    ))
  ):(<div><h1>Error</h1></div>)

  const regionData = useSelector(getAllRegions)

  const getRegion =(id, name)=>{
    setRegionId(id)
    setRegion(name)
  }

  let renderedRegion = ''
  renderedRegion = regionData ? (
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
          <div className=" my-4">
            <div className="px-4">
              <form >
                <div style={{color: 'red', marginBottom: '10px'}}>{empty}</div>
                <label className="form-label" style={{padding: 0}}>Partner's Name</label>
                <div className="input-group input-group-dynamic">
                    <input type="text" name="name" onChange={(e)=>setName(e.target.value)} className="form-control" />
                </div>
                <label className="form-label" style={{padding: 0}}>Business Address</label>
                <div className="input-group input-group-dynamic">
                    <input type="text" name="address" onChange={(e)=>setBusinessAddress(e.target.value)} className="form-control" />
                </div>
                <label className="form-label" style={{padding: 0}}>Email Address</label>
                <div className="input-group input-group-dynamic">
                    <input type="text" name="email" onChange={(e)=>setEmail(e.target.value)} className="form-control" />
                </div>
                <label className="form-label" style={{padding: 0}}>Phone Number</label>
                <div className="input-group input-group-dynamic mb-4">
                    <input type="text" name="phone" onChange={(e)=>setPhoneNumber(e.target.value)} className="form-control" />
                </div>
                {/* Currency dropdown */}
                <div className="dropdown">
                    <button 
                        className="btn bg-gradient-primary dropdown-toggle" 
                        type="button" 
                        id="dropdownMenuButton" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                        >
                        {role}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      {renderedRoles}
                    </ul>
                </div>
                {/* Currency dropdown */}
                <div className="dropdown">
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
                      {renderedRegion}
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

export default BusinessPartnerPost;

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem"
}