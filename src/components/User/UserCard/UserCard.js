import {useState, useEffect} from 'react';
import { Button, ButtonGroup, Col, Container, Dropdown, Form, FormControl, InputGroup, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoles } from '../../../store/role-slice';
import { updateUser } from '../../../store/user-slice';
import RoleDropdown from '../../Role/RoleDropdown/RoleDropdown';
import { getAllRegions, getAllShops, getAllTowns } from '../../../store/entities-slice';
import TelOneTownDropdown from '../../TelOneTowns/TelOneTownDropdown/TelOneTownDropdown';
import TelOneRegionDropdown from '../../TelOneRegions/TelOneRegionDropdown/TelOneRegionDropdown';
import TelOneShopDropdown from '../../TelOneShops/TelOneShopDropdown/TelOneShopDropdown';

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
  const [userId, setUserId] = useState('')
  const [shopId, setShopId] = useState('')
  const [regionId, setRegionId] = useState('')
  const [region, setRegion] = useState('Select Region')
  const [shopName, setShopName] = useState('Select Shop')
  const [townId, setTownId] = useState('')
  const [town, setTown] = useState('Select Town')

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
      <td className="align-middle">
        <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{data.firstname} {data.surname}</p>
      </td>
      
      <td>
        <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{data.emailAddress}</p>
      </td>
      <td>
        <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{data.roleId.role === "Sales Admin"? "Sales Agent":data.roleId.role}</p>
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
            setRole(data.roleId.role)
            setRegion(data.regionId.name)
            setTown(data.townId.name)
            setShopName(data.shopId.name)
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
            placeholder="***********"
          />
        </InputGroup>

          <Row>
            <Col>
              {/* role Dropdown */}
              <Form.Label>User Role</Form.Label><br/>
              <Dropdown as={ButtonGroup}>
                <Button variant="info">{role}</Button>
                <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  {renderedRoles}
                </Dropdown.Menu>
              </Dropdown>
              <br/>
            </Col>
            <Col>
              {/* regions Dropdown */}
              <Form.Label>Region</Form.Label><br/>
              <Dropdown as={ButtonGroup}>
                <Button variant="info">{region}</Button>
                <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  {renderedRegions}
                </Dropdown.Menu>
              </Dropdown>
              <br/>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* town Dropdown */} 
              <Form.Label>Town</Form.Label><br/>
              <Dropdown as={ButtonGroup}>
                <Button variant="info">{town}</Button>
                <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  {renderedTown}
                </Dropdown.Menu>
              </Dropdown>
              <br/>
            </Col>
            <Col>
              {/* shop Dropdown */}
              <Form.Label>Shops</Form.Label><br/>
              <Dropdown as={ButtonGroup}>
                <Button variant="info">{shopName}</Button>
                <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  {renderedShops}
                </Dropdown.Menu>
              </Dropdown>
              <br/>
            </Col>
          </Row>


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
