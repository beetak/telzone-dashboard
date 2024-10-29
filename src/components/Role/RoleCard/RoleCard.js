import React, { useState } from 'react';
import { Button, ButtonGroup, Dropdown, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { updateRole } from '../../../store/entities-slice';

export default function RoleCard (props) {
  const [id, setId] = useState('')
  const [role, setRole] = useState('')
  const [active, setActive] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [failed, setFailed] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState(false)


  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const dispatch = useDispatch()

  const handleUpdate = async (e) => {
    e.preventDefault();      
    setLoadingStatus(true);    
    try {
      const response = await dispatch(
        updateRole(
          {
            active,
            id,
            role
          }
        )
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
        closeModal()
      }, 2000);
    }
  };
    
  let loadingAnimation = 
  <div className='text-center' style={anime}>
      <h5 style={{ color: '#155bb5' }}>
        {loadingStatus && !success  && !failed? 
          "Updating Category, Please wait" :
          loadingStatus && success  && !failed ? 
            "Update Successful" :
            loadingStatus && !success  && failed ? "Update Failed" : ""}
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

  const {data} = props 
  return (
    <>
      <td hidden>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{data.id}</h6>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{data.role}</h6>
          </div>
        </div>
      </td>
      <td className="align-middle text-center">
        <a className="btn btn-link text-dark px-3 mb-0" onClick={() => {

          let categoryStatus = ''
          if(data.active === true){
            categoryStatus = 'Active'
          }
          else {
            categoryStatus = 'Deactivated'
          }
          setRole(data.role)
          setId(data.id)
          openModal() //opens the modal
        }}><i className="material-icons text-sm me-2">edit</i>Edit</a>
      </td>

      <Modal show={isOpen} onHide={closeModal} style={{marginTop: 100}}>
        <Modal.Header>
          <Modal.Title>
            User Role Update Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Role Type</InputGroup.Text>
            <FormControl
              aria-label="Username"
              aria-describedby="basic-addon1"
              defaultValue = {role}
              name = "role"
              onChange = {(e)=>setRole(e.target.value)}
            />
          </InputGroup>
          <br/>
          <Dropdown as={ButtonGroup}>
            <Button variant="info">{active?"Active":"Inactive"}</Button>
            <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
            <Dropdown.Menu>
            <Dropdown.Item 
              onClick={
                () => {
                  setActive(true)
                }
              }
              >Activate
              </Dropdown.Item>
              <Dropdown.Item 
              onClick={
                () => {
                  setActive(false)
                }
              }
              >Deactivate
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown><br/>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          {loadingAnimation}
        </Modal.Footer>
      </Modal>
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
