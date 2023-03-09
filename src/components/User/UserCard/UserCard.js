import {useState, useEffect} from 'react';
import { Button, ButtonGroup, Dropdown, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoles } from '../../../store/role-slice';
import { updateUser } from '../../../store/user-slice';
import RoleDropdown from '../../Role/RoleDropdown/RoleDropdown';

const UserCard = (props) => {
  const [emailAddress, setEmailAddress] = useState('')
  const [firstname, setFirstname] = useState('')
  const [surname, setSurname] = useState('')
  const [role, setRole] = useState('')
  const [active, setActive] = useState('')
  const [password, setPassword] = useState('')
  const [id, setId] = useState('')
  const [roleId, setRoleId] = useState('')
  const [activeState, setActiveState] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [current, setCurrent] = useState('')
  const [userId, setUserId] = useState('')

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const dispatch = useDispatch()

  const handleUpdate = () => {
    dispatch(updateUser(
      {
        active,
        emailAddress,
        id,
        firstname,
        surname,
        password,
        userId
      }
    ))
    closeModal()
  }

  useEffect(() => {
    setUserId(index)
  }, []);
  const {data, index} = props 

  const getRole =(id, role)=>{
    setRoleId(id)
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
      <td className="align-middle">
        <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{data.firstname} {data.surname}</p>
      </td>
      
      <td>
        <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{data.emailAddress}</p>
      </td>
      <td>
        <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{data.role.role}</p>
      </td>

      <td class="text-sm">
        {
          data.active? <span class="badge badge-sm bg-gradient-success">Active</span> : <span class="badge badge-sm bg-gradient-secondary">Inactive</span>
        }
      </td>
      <td className="align-middle">
        <a className="btn btn-link text-dark px-3 mb-0" onClick={() => {

            setEmailAddress(data.emailAddress)
            setFirstname(data.firstname)
            setId(data.id)
            setSurname(data.surname)
            setRole(data.role.role)
            setPassword(data.password)
            setActive(data.active)
            setActiveState(data.active?'Deactivate':'Activate')

          openModal() //opens the modal

          }}><i className="material-icons text-sm me-2">edit</i>Edit
        </a>
      </td>

    {/* Update Modal */}

    <Modal show={isOpen} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>
          User Record Update
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">First Name</InputGroup.Text>
          <FormControl
            // value={roleName}
            aria-label="Username"
            aria-describedby="basic-addon1"
            defaultValue = {firstname}
            name = "firstname"
            onChange = {(e)=>setFirstname(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">Surname</InputGroup.Text>
          <FormControl
            // value={roleSymbol}
            aria-label="Username"
            aria-describedby="basic-addon2"
            defaultValue = {surname}
            name = "surname"
            onChange = {(e)=>setSurname(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">Email Address</InputGroup.Text>
          <FormControl
            // value={roleSymbol}
            aria-label="Username"
            aria-describedby="basic-addon2"
            defaultValue = {emailAddress}
            name = "emailAddress"
            onChange = {(e)=>setEmailAddress(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">Password</InputGroup.Text>
          <FormControl
            // value={roleSymbol}
            aria-label="Password"
            aria-describedby="basic-addon2"
            name = "password"
            onChange = {(e)=>setPassword(e.target.value)}
          />
        </InputGroup>


        {/* role Dropdown */}
        
        <Dropdown as={ButtonGroup}>
          <Button variant="info">{role}</Button>
          <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
          <Dropdown.Menu>
            {renderedRoles}
          </Dropdown.Menu>
        </Dropdown>
        <br/>


        {/* Active State Dropdown */}

        <Dropdown as={ButtonGroup}>
          <Button variant="info">{activeState}</Button>
          <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
          <Dropdown.Menu>
            <Dropdown.Item 
              onClick={
                () => {
                  setActive(false)
                  setActiveState('Inactive')
                }
              }
            >{'Deactivate'}
            </Dropdown.Item>
            <Dropdown.Item 
              onClick={
                  () => {
                    setActive(true)
                    setActiveState('Active')
                  }
                }
              >{'Activate'}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <br/>
        <Button variant="primary" onClick={handleUpdate}>Update</Button>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default UserCard;
