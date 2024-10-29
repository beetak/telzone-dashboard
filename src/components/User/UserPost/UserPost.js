import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRegions, getAllShops, getAllTowns } from '../../../store/entities-slice';
import { getAllRoles } from '../../../store/role-slice';
import { postAsyncUser } from '../../../store/user-slice';
import RoleDropdown from '../../Role/RoleDropdown/RoleDropdown';
import TelOneRegionDropdown from '../../TelOneRegions/TelOneRegionDropdown/TelOneRegionDropdown';
import TelOneShopDropdown from '../../TelOneShops/TelOneShopDropdown/TelOneShopDropdown';
import TelOneTownDropdown from '../../TelOneTowns/TelOneTownDropdown/TelOneTownDropdown';
import { BeatLoader } from 'react-spinners';

const UserPost = () => {

    const [email_address, setEmailAddress] = useState('')
    const [firstname, setFirstname] = useState('')
    const [surname, setSurname] = useState('')
    const [role, setRole] = useState('Role')
    const [townId, setTownId] = useState('')
    const [password, setPassword] = useState('')
    const [roleId, setRoleId] = useState('')
    const [town, setTown] = useState('Select Town')
    const [success, setSuccess] = useState(false)
    const [failed, setFailed] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [shopId, setShopId] = useState('')
    const [regionId, setRegionId] = useState('')
    const [region, setRegion] = useState('Select Region')
    const [shopName, setShopName] = useState('Select Shop')


    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
      e.preventDefault();      
      setLoadingStatus(true);    
      try {
        const response = await dispatch(
          postAsyncUser({ 
            adminPortalUsersDTO: {
              email_address,
              firstname,
              surname,
              password
            },
            regionId,
            roleId,
            shopId,
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
          setEmailAddress('')
          setFirstname('')
          setSurname('')
          setPassword('')
        }, 2000);
      }
    };
    
    let loadingAnimation = 
    <div className='text-center' style={anime}>
      <h5 style={{ color: '#155bb5' }}>
        {loadingStatus && !success  && !failed? 
          "Creating User Record, Please wait" :
          loadingStatus && success  && !failed ? 
            "User Creation Successful" :
            loadingStatus && !success  && failed ? "User Creation Failed" : ""}
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

    //role data
    const roleData = useSelector(getAllRoles)
    const getRole =(id, role)=>{
      setRoleId(id)
      setRole(role)
    }
    let renderedRoles = ''
    renderedRoles = roleData ? (
      roleData.map((role, index)=>(
        <tr key={index}>
          <RoleDropdown data={role} setRole={getRole}/>
        </tr>
      ))
    ):(<div><h1>Error</h1></div>)
  
    //town data
    const townData = useSelector(getAllTowns)
    const getTown =(id, name)=>{
      setTownId(id)
      setTown(name)
    }
    let renderedTown = ''
    renderedTown = townData ? (
      townData.map((role, index)=>(
        <tr key={index}>
          <TelOneTownDropdown data={role} setTown={getTown}/>
        </tr>
      ))
    ):(<div><h1>Error</h1></div>)

    //region data
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

    //shop data
    const shopData = useSelector(getAllShops)
    const getShop =(id, name)=>{
      setShopId(id)
      setShopName(name)
    }
    let renderedShops = ''
    renderedShops = shopData ? (
      shopData.map((shop, index)=>(
        <tr key={index}>
          <TelOneShopDropdown data={shop} setShop={getShop}/>
        </tr>
      ))
    ):(<div><h1>Error</h1></div>)
    
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="p-4">
              <form >
                <label className="form-label" style={{marginBottom: '0px'}}>First Name</label>
                <div className="input-group input-group-dynamic mb-4">
                    {/*<label className="form-label">length</label>*/}
                    <input type="text" name="firstname" onChange={(e)=>setFirstname(e.target.value)} className="form-control" style={{padding: 0}}/>
                </div>
                <label className="form-label" style={{marginBottom: '0px'}}>Surname</label>
                <div className="input-group input-group-dynamic mb-4">
                    {/*<label className="form-label">Count</label>*/}
                    <input type="text" name="surname" onChange={(e)=>setSurname(e.target.value)} className="form-control"  style={{padding: 0}}/>
                </div>
                <label className="form-label" style={{marginBottom: '0px'}}>Email Address</label>
                <div className="input-group input-group-dynamic mb-4">
                    {/*<label className="form-label">length</label>*/}
                    <input type="text" name="email" onChange={(e)=>setEmailAddress(e.target.value)} className="form-control" style={{padding: 0}}/>
                </div>
                <label className="form-label" style={{marginBottom: '0px'}}>Password</label>
                <div className="input-group input-group-dynamic mb-4">
                    {/*<label className="form-label">length</label>*/}
                    <input type="text" name="password" onChange={(e)=>setPassword(e.target.value)} className="form-control" style={{padding: 0}}/>
                </div>
                {/* Role dropdown */}
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
                {/* Shop dropdown */}
                <div className="dropdown">
                    <button 
                        className="btn bg-gradient-primary dropdown-toggle" 
                        type="button" 
                        id="dropdownMenuButton" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                        >
                        {shopName}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      {renderedShops}
                    </ul>
                </div>
                {/* Town dropdown */}
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
                      {renderedTown}
                    </ul>
                </div>
                {/* Region dropdown */}
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
                      {renderedRegions}
                    </ul>
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

export default UserPost;

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