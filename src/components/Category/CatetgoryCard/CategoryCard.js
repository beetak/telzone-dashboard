import React,{useState, useEffect} from 'react';
import { Button, ButtonGroup, Dropdown, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateCategory } from '../../../store/category-slice';

const CategoryCard = (props) => {
  const [active, setActive] = useState('')
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [activeState, setActiveState] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [actioned, setActioned] = useState('Duration')
  const [categoryId, setCategoryId] = useState('')
  const[duration, setDuration] = useState('')
  const[durationLength, setDurationLength] = useState('')
  const[description, setDescription] = useState('')
  const[time, setTime] = useState('Bundle Life Span')


  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const dispatch = useDispatch()

  const handleUpdate = () => {
    dispatch(updateCategory(
      {
        active,
        id,
        name,
        duration,
        description,
        categoryId
      }
    ))
    closeModal()
  }
  const {data, index} = props 
  useEffect(() => {
    setCategoryId(index)
  }, []);
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
            <h6 className="mb-0 text-sm">{data.name}</h6>
          </div>
        </div>
      </td>
      <td>
        <p clasName="text-xs font-weight-bold mb-0 w-10">{data.description}</p>
      </td>
      <td className="align-middle text-center">
        {/*<a className="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i className="material-icons text-sm me-2">delete</i>Delete</a>*/}
        <a className="btn btn-link text-dark px-3 mb-0" onClick={() => {

          let categoryStatus = ''
          if(data.active === true){
            categoryStatus = 'Active'
          }
          else {
            categoryStatus = 'Deactivated'
          }

          setName(data.name)
          setDescription(data.description)
          setDuration(data.duration)
          setId(data.id)
          setActive(data.active)
          setActiveState(data.active)

          openModal() //opens the modal

        }}><i className="material-icons text-sm me-2">edit</i>Edit</a>
      </td>
      {/* Update Modal */}

      <Modal show={isOpen} onHide={closeModal} style={{marginTop: 100}}>
        <Modal.Header>
          <Modal.Title>
            Bundle Category Update
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Category Name</InputGroup.Text>
            <FormControl
              // value={currencyName}
              aria-label="Username"
              aria-describedby="basic-addon1"
              defaultValue = {name}
              name = "name"
              onChange = {(e)=>setName(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon2">Category Description</InputGroup.Text>
            <FormControl
              // value={currencySymbol}
              aria-label="Username"
              aria-describedby="basic-addon2"
              defaultValue = {description}
              name = "description"
              onChange = {(e)=>setDescription(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon2">Duration</InputGroup.Text>
            <FormControl
              // value={currencySymbol}
              aria-label="Username"
              aria-describedby="basic-addon2"
              placeholder = {duration + " Seconds"}
              name = "description"
              onChange = {(e)=>setDurationLength(e.target.value)}
              className='customCont'
            />
          </InputGroup>

          <Dropdown as={ButtonGroup}>
            <Button variant="info">{actioned}</Button>
            <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
            <Dropdown.Menu>
            <Dropdown.Item 
              onClick={
                () => {
                  setDuration(60*durationLength)
                  setActioned(60*durationLength)
                  setTime(60*durationLength)
                }
              }
              >Minutes
              </Dropdown.Item>
              <Dropdown.Item 
              onClick={
                () => {
                  setDuration(3600*durationLength)
                  setActioned(3600*durationLength)
                  setTime(3600*durationLength)
                }}
              >
              Hours
              </Dropdown.Item>
              <Dropdown.Item
              onClick={
                () => {
                  setDuration(86400*durationLength)
                  setActioned(86400*durationLength)
                  setTime(86400*durationLength)
                }
              }
              >Days
              </Dropdown.Item>
              <Dropdown.Item
              onClick={
                () => {
                  setDuration(604800*durationLength)
                  setActioned(604800*durationLength)
                  setTime(604800*durationLength)
                }
              }
              >Weeks
              </Dropdown.Item>
              <Dropdown.Item
              onClick={
                () => {
                  setDuration(2592000*durationLength)
                  setActioned(2592000*durationLength)
                  setTime(2592000*durationLength)
                }
              }
              >Months
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <br/>
          <Dropdown as={ButtonGroup}>
            <Button variant="info">{active?"Active":"Inactive"}</Button>
            <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
            <Dropdown.Menu>
            <Dropdown.Item 
              onClick={
                () => {
                  setActiveState("Active")
                  setActive(true)
                }
              }
              >Activate
              </Dropdown.Item>
              <Dropdown.Item 
              onClick={
                () => {
                  setActiveState('Inactive')
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
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CategoryCard;

const customCont = {
  '.customFormControl::placeholder': {
    color: 'rgba(0, 0, 0, 0.9)'
  }
}
