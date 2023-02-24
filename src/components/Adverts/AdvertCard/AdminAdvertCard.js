import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import { FormControl, Form, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { updateAdvert } from '../../../store/adverts-slice';

const AdminAdvertCard = (props) => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [id, setId] = useState('')
  const [advertId, setAdvertId] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState('false')
  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
    let img = event.target.files[0];
    setImage(URL.createObjectURL(img));
    }
  };
  const dispatch = useDispatch()
  const handleUpdate = () => {
    dispatch(updateAdvert(
      {
        id,
        active,
        title,
        image,
        description,
        advertId
      }
    ))
    closeModal()
  }

  useEffect(()=>{
    setAdvertId(index)
  },[])

  const openModal = () => (setIsOpen(true));

  const closeModal = () => (setIsOpen(false));
  const {data, index} = props 

  return (
    <>
      <td>
        <div class="d-flex px-2 py-1">
          <div>
            <img src={data.image} class="avatar avatar-xxl me-3 border-radius-lg" alt={data.title}/>
          </div>
        </div>
      </td>
      <td className="">
        <div class="d-flex flex-column justify-content-center">
          <h6 class="mb-0 text-sm">{data.title}</h6>
          <p class="text-xs text-secondary mb-0">{data.description}</p>
        </div>
      </td>
      <td className="align-middle">
        <a className="btn btn-link text-dark px-3 mb-0" onClick={() => {
          let currentStatus = ''
          if(data.active === true){
            currentStatus = 'Active'
          }
          else {
            currentStatus = 'Deactivated'
          }
          setActive(data.active)
          setTitle(data.title)
          setImage(data.image)
          setDescription(data.description)
          setId(data.id)

          openModal() //opens the modal

          }}><i className="material-icons text-sm me-2">edit</i>Edit
        </a>
      </td>

      {/* <Button variant="primary" onClick={this.openModal}>Launch demo modal</Button> */}
      <Modal show={isOpen} onHide={closeModal}>
        <Modal.Header closeButton>            
          <Modal.Title>Advert Update</Modal.Title>   
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
            <FormControl
              // value={this.state.currencyName}
              aria-label="AdvertTitle"
              aria-describedby="basic-addon1"
              defaultValue = {title}
              name = "title"
              onChange = {(e)=>setTitle(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon2">Description</InputGroup.Text>
            <FormControl
              // value={this.state.currencySymbol}
              aria-label="Username"
              aria-describedby="basic-addon2"
              defaultValue = {description}
              name = "description"
              onChange = {(e)=>setDescription(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon2">Image</InputGroup.Text>
            <Form.Control 
              aria-label="Username"
              aria-describedby="basic-addon2"
              name = "image"
              onChange = {onImageChange}
              type="file"
              size="lg"
            />
          </InputGroup>
          <p>{'this.state.updateStatus'}</p>
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

export default AdminAdvertCard;
