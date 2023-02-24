import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoles } from '../../../store/role-slice';
import { postUser } from '../../../store/users-slice'; 

const VoucherPost = () => {

    const [email_address, setEmail] = useState('');
    const [roleID, setRoleID] = useState('');
    const [firstname, setFirstname] = useState('')
    const [password, setPassword] = useState('')
    const [surname, setSurname] = useState('')
    const [userID, setUserID] = useState('')
    const [userRole, setUserRole] = useState('Role')

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(postUser({ 
        adminPortalUsersDTO: {
          email_address,
          firstname,
          password,
          surname
        },
        roleID
       }));
    };
    
    const roles = useSelector(getAllRoles)
    let renderedRoles = ''
    renderedRoles = roles.code === 'SUCCESS' ? (
      roles.data.map((user, index)=>(
        <li key={user.id}>
          <a  className="dropdown-item" 
              onClick={(e)=>{
                  e.preventDefault()
                  setRoleID(user.id)
                  setUserRole(user.role)
              }}>
              {user.role}
          </a>
        </li>
      ))
    ):(<div><h1>{roles.Error}</h1></div>)
    
  return (
    <div className="p-4">
        <form>
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
                <input type="text" name="email_address" onChange={(e)=>setEmail(e.target.value)} className="form-control" style={{padding: 0}}/>
            </div>
            <label className="form-label" style={{marginBottom: '0px'}}>Password</label>
            <div className="input-group input-group-dynamic mb-4">
                {/*<label className="form-label">length</label>*/}
                <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} className="form-control" style={{padding: 0}}/>
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
                    {userRole}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {renderedRoles}
                </ul>
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">Create</button>
        </form>
    </div>
  );
}

export default VoucherPost;

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem"
}