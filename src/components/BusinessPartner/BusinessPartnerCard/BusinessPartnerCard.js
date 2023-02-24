import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup'
import { FormControl } from "react-bootstrap";
import { updateBusinessPartner } from '../../../store/business-slice';
const userRole = localStorage.getItem('role')

const userId =''

const BusinessPartnerCard = (props) => {
  
  const dispatch = useDispatch()

  const {data, index} = props 
  const [isOpen, setIsOpen] = useState(false)
  const [businessPartnerName, setBusinessPartnerName] = useState('')
  const [businessPartnerEmail, setBusinessPartnerEmail] = useState('')
  const [businessPartnerAddress, setBusinessPartnerAddress] = useState('')
  const [id, setId] = useState('')
  const [partnerId, setPartnerId] = useState('')
  const [businessPartnerPhone, setBusinessPartnerPhone] = useState('')
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updateStatus, setUpdateStatus] = useState('')
  const [current, setCurrent] = useState('')
  const [active, setActive] = useState('')

  const openModal = () => (setIsOpen(true));

  const closeModal = () => (setIsOpen(false));

  const openUpdateModal = () => (setIsUpdateOpen(true));

  const closeUpdateModal = () => (setIsUpdateOpen(false));

  const handleUpdate = () => {
    dispatch(updateBusinessPartner(
      {
        id,
        active,
        businessAddress: businessPartnerAddress,
        email: businessPartnerEmail,
        name: businessPartnerName,
        phoneNumber: businessPartnerPhone,
        partnerId
      }
    ))
    closeModal()
    closeUpdateModal()
  }

  useEffect(()=>{
    setPartnerId(index)
  },[])
  
  return (
    <>
    <td>
    <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{data.name}</p>
  </td> 
  <td style={tdWidth}>
    <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{data.businessAddress}</p>
  </td> 
  <td>
    <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{data.email}</p>
  </td>
  <td>
    <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{data.phoneNumber}</p>
  </td> 
  {
    userRole==='Admin'? (
      <td>
        <a className="btn btn-link text-dark px-3 mb-0" onClick={() => {
          let currentStatus = ''
          if(data.active === true){
            currentStatus = 'Active'
          }
          else {
            currentStatus = 'Deactivated'
          }
          
          setBusinessPartnerName(data.name)
          setBusinessPartnerAddress(data.businessAddress)
          setBusinessPartnerEmail(data.email)
          setBusinessPartnerPhone(data.phoneNumber)
          setId(data.id)
          setActive(data.active)

          openModal() //opens the modal

          }}><i className="material-icons text-sm me-2">edit</i>Edit
        </a>
      </td>  
    ):("")
  } 
  {
    userRole==='Super Admin'? (
      <td className="align-middle text-center">
        <a className="btn btn-link text-dark px-3 mb-0" onClick={() => {
          let currentStatus = ''
          if(data.active === true){
            currentStatus = 'Active'
          }
          else {
            currentStatus = 'Deactivated'
          }
         
          setBusinessPartnerName(data.name)
          setBusinessPartnerAddress(data.businessAddress)
          setBusinessPartnerEmail(data.email)
          setBusinessPartnerPhone(data.phoneNumber)
          setId(data.id)
          setCurrent(data.active)
          setActive(data.active?false:true)
         
          openUpdateModal() //opens the modal

          }}><i className="material-icons text-sm me-2">edit</i>{
            data.active === true ?"Deactivate":"Activate"
          }
        </a>
      </td>  
    ):("")
  }       
    {/* Update Modal */}

    <Modal show={isOpen} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>
          Bundle Update
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Business Partner Name</InputGroup.Text>
          <FormControl
            // value={currencyName}
            aria-label="Username"
            aria-describedby="basic-addon1"
            defaultValue = {businessPartnerName}
            name = "businessPartnerName"
            onChange = {(e)=>setBusinessPartnerName(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">Business Address</InputGroup.Text>
          <FormControl
            // value={currencySymbol}
            aria-label="Username"
            aria-describedby="basic-addon2"
            defaultValue = {businessPartnerAddress}
            name = "businessPartnerAddress"
            onChange = {(e)=>setBusinessPartnerAddress(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">Email</InputGroup.Text>
          <FormControl
            // value={currencySymbol}
            aria-label="Username"
            aria-describedby="basic-addon2"
            defaultValue = {businessPartnerEmail}
            name = "businessPartnerEmail"
            onChange = {(e)=>setBusinessPartnerEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">Phone Number</InputGroup.Text>
          <FormControl
            // value={currencySymbol}
            aria-label="Username"
            aria-describedby="basic-addon2"
            defaultValue = {businessPartnerPhone}
            name = "businessPartnerPhone"
            onChange = {(e)=>setBusinessPartnerPhone(e.target.value)}
          />
        </InputGroup>
        
        <p>{updateStatus}</p>
        <Button variant="primary" onClick={handleUpdate}>Update</Button>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>


    {/* Activate/ Deactivate Modal */}

    <Modal show={isUpdateOpen} onHide={closeUpdateModal} style={{marginTop: 200}}>
      <Modal.Body>
        <label>Are you sure you want to {current?"Deactivate":"Activate"} {businessPartnerName}&#63;</label>
        <div className='pt-2 col-sm-6 mx-auto'>
          <Button variant="info" onClick={handleUpdate} className="me-2">
            Proceed
          </Button>
          <Button variant="secondary" onClick={closeUpdateModal}>
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
    </>
  );
}

export default BusinessPartnerCard;

const tdWidth = {
  maxWidth: "180px",
  maxHeight: "150px",
  overflow: "hidden",
}