import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoles } from '../../../store/role-slice';
import { postAsyncUser } from '../../../store/user-slice';
import RoleDropdown from '../../Role/RoleDropdown/RoleDropdown';

const UserPost = () => {

    const [email_address, setEmailAddress] = useState('')
    const [firstname, setFirstname] = useState('')
    const [surname, setSurname] = useState('')
    const [role, setRole] = useState('Role')
    const [active, setActive] = useState('')
    const [password, setPassword] = useState('')
    const [id, setId] = useState('')
    const [roleID, setRoleID] = useState('')
    const [activeState, setActiveState] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [current, setCurrent] = useState('')


    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(postAsyncUser({ 
        adminPortalUsersDTO: {
          email_address,
          firstname,
          surname,
          password
        },
        roleID
       })
      );
      setEmailAddress('')
      setFirstname('')
      setSurname('')
      setPassword('')
    };

    const getRole =(id, role)=>{
      setRoleID(id)
      setRole(role)
    }
  
    const roleData = useSelector(getAllRoles)
  
    let renderedRoles = ''
    renderedRoles = roleData ? (
      roleData.map((role, index)=>(
        <tr key={index}>
          <RoleDropdown data={role} setRole={getRole}/>
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
                  <button onClick={handleSubmit} className="btn btn-primary my-4">Submit</button>
              </form>
            </div>
          </div>
        </div>
    </>
  );
}

export default UserPost;

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem"
}