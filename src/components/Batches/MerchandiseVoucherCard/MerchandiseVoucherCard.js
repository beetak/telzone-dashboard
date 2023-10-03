import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useState} from 'react'
import { fetchAsyncVouchersByBatch, updateBatch } from '../../../store/batch-slice';
import { Button, Modal } from 'react-bootstrap';

const userRole = localStorage.getItem('role')

const MerchandiseVoucherCard = ({index, id, name, status, suspended, firstname, lastname, bundleName, dateCreated}) => {

  const [active, setActive] = useState('')
  const [batchName, setBatchName] = useState('')
  const [suspendedState, setSuspendedState] = useState('')
  // const [id, setId] = useState('')
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updateStatus, setUpdateStatus] = useState('')
  const [current, setCurrent] = useState('')
  const [batchId, setBatchId] = useState('')
  const [batchStatus, setBatchStatus] = useState('')

  const dispatch = useDispatch()

  const openUpdateModal = () => setIsUpdateOpen(true);

  const closeUpdateModal = () => setIsUpdateOpen(false);

  const handleUpdate = () => {
    dispatch(updateBatch(
      {
        active,
        batchName,
        id,
        suspended: suspendedState,
        batchId
      }
    ))
    
    closeUpdateModal()
  }

  useEffect(()=>{
    setBatchId(index)
  },[])
  
  return (
    <>
      <td className="align-middle">
        <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{id}</p>
      </td>
      <td className="align-middle text-center">
        {status && !suspended ? (
          <span class="badge badge-sm bg-gradient-success">Active</span>
        ) : (
          status && suspended ?
          <span class="badge badge-sm bg-gradient-secondary">Suspended</span>
          : (!status && !suspended ?  <span class="badge badge-sm bg-gradient-danger">Inactive</span>:'not')
        )}
      </td>
      <td>
        <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{firstname} {lastname}</p>
      </td>
      <td>
        <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{bundleName} </p>
      </td>
      <td>
        <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{dateCreated} </p>
      </td>
      <td className="align-middle text-center">
        {
          userRole==='Super Admin'? (
            status && !suspended ? (
              <a className="btn btn-link text-danger px-3 mb-0" onClick={() => {
                let currentStatus = ''
                if(status === true){
                  currentStatus = 'Active'
                }
                else {
                  currentStatus = 'Inactive'
                }
    
                setActive(true)
                setSuspendedState(true)
    
                openUpdateModal() //opens the modal
    
                }}><i className="material-icons text-sm me-2">edit</i>
                Suspend
              </a>
            ) : (
              status && suspended ?
                <a className={"btn btn-link text-success px-3 mb-0"} onClick={() => {
                  let currentStatus = ''
                  if(status === true){
                    currentStatus = 'Active'
                  }
                  else {
                    currentStatus = 'Inactive'
                  }
      
                  setActive(true)
                  setSuspendedState(false)
      
                  openUpdateModal() //opens the modal
      
                  }}><i className="material-icons text-sm me-2">edit</i>
                  Reactivate
                </a>
              : (!status && !suspended ?  
                <a className="btn btn-link text-info px-3 mb-0" onClick={() => {
                  let currentStatus = ''
                  if(status === true){
                    currentStatus = 'Active'
                  }
                  else {
                    currentStatus = 'Inactive'
                  }
      
                  setActive(true)
                  setSuspendedState(false)
      
                  openUpdateModal() //opens the modal
      
                  }}><i className="material-icons text-sm me-2">edit</i>
                 Activate
                </a>:'')
            )
          ):('')
        }
        <a  className="btn btn-link text-info px-3 mb-0"
          onClick={
            ()=>dispatch(fetchAsyncVouchersByBatch({id, status, suspended}))
          }
        >
          <i className="material-icons text-sm me-2">visibility</i>View Vouchers
        </a>
      </td>
      
      {/* Activate / Deactivate Modal */}

      <Modal show={isUpdateOpen} onHide={closeUpdateModal} style={{marginTop: 200}}>
        <Modal.Body>
          <label>Are you sure you want to take this action&#63;</label>  
          <br/>
          <Button variant="info" onClick={handleUpdate} className="me-2">
            Proceed
          </Button>
          <Button variant="secondary" onClick={closeUpdateModal}>
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MerchandiseVoucherCard;

const tdWidth = {
  maxWidth: "180px",
  maxHeight: "150px",
  overflow: "hidden",
}