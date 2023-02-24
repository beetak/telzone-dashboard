import {useState, useEffect} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateAdvert } from '../../../store/adverts-slice';

const userRole = localStorage.getItem('role')

const SuperAdminAdvertCard = (props) => {
  
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [id, setId] = useState('')
  const [advertId, setAdvertId] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [current, setCurrent] = useState('')
  const [active, setActive] = useState('false')
  const openModal = () => (setIsOpen(true));
  const closeModal = () => (setIsOpen(false));
 
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

  const {data, index} = props
  
  return (
    <>
      
      {/*<div className="col-xl-3 col-md-6 mb-xl-0 mb-4" key={index}>*/}
        <div className="card card-blog card-plain">
          <div className="card-header p-0 mt-n4 mx-3">
            <a className="d-block shadow-xl border-radius-xl">
              <img src={data.image} alt={data.title} className="img-fluid shadow border-radius-xl" />
            </a>
          </div>
          <div className="card-body p-3">
            <p className="mb-0 text-sm">{data.title}</p>
            <a href="javascript:;">
              <h5>
                {data.active? "Running" : "Not Running"}
              </h5>
            </a>
            <p className="mb-4 text-sm" style={{height: 50}}>
              {data.description}
            </p>
            <div className="d-flex align-items-center justify-content-between">
              <button 
                type="button" 
                className="btn btn-outline-secondary btn-sm mb-0"
                onClick={() => {
                  let currentStatus = ''
                  if(data.active === true){
                    currentStatus = 'Active'
                  }
                  else {
                    currentStatus = 'Deactivated'
                  }
      
                  setActive(data.active?false:true)
                  setTitle(data.title)
                  setImage(data.image)
                  setId(data.id)
                  setCurrent(data.active)
                  setDescription(data.description)
      
                  openModal()
                 }}>
                {
                  data.active ?"Deactivate Advert":"Activate Advert"
                }
                </button>
              <div className="avatar-group mt-2">
              </div>
            </div>
          </div>
        </div>
        
        {/* Activate / Deactivate Modal */}

        <Modal show={isOpen} onHide={closeModal} style={{marginTop: 200}}>
          <Modal.Body>
            <label>Are you sure you want to {current?"Deactivate":"Activate"} the <bold>{title}</bold> bundle&#63;</label>              
            {/*<p>{'updateStatus'}</p>*/}
            <br/>
            <Button variant="info" onClick={handleUpdate} className="me-2">
              Proceed
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </Modal.Body>
        </Modal>
    </>
  );
}

export default SuperAdminAdvertCard;
