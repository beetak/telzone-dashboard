import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useState} from 'react'
import { fetchAsyncVouchersByBatch, updateBatch } from '../../../store/batch-slice';
import { Button, Modal } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';

const userRole = localStorage.getItem('role')

const BatchCard = ({index, id, name, status, suspended, firstname, lastname, bundleName, dateCreated}) => {

  const [active, setActive] = useState('')
  const [batchName, setBatchName] = useState('')
  const [suspendedState, setSuspendedState] = useState('')
  // const [id, setId] = useState('')
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [batchId, setBatchId] = useState('')
  const [success, setSuccess] = useState(false)
  const [failed, setFailed] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState(false)

  const dispatch = useDispatch()

  const openUpdateModal = () => setIsUpdateOpen(true);

  const closeUpdateModal = () => setIsUpdateOpen(false);

  const handleUpdate = async (e) => {
    e.preventDefault();      
    setLoadingStatus(true);    
    try {
      const response = await dispatch(
        updateBatch(
          {
            active,
            batchName,
            id,
            suspended: suspendedState,
            batchId
          }
        )
      );
  
      if (response.payload) {
        console.log(response)
        if (response.payload.data.code === 'SUCCESS') {
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
        closeUpdateModal()
      }, 2000);
    }
  };
  
  let loadingAnimation = 
  <div className='text-center' style={anime}>
    <h5 style={{ color: '#155bb5' }}>
      {loadingStatus && !success  && !failed? 
        (status && !suspended? "Suspending Batch": status && suspended ? "Reactivating Batch": !status && !suspended? "Activating Batch":"") :
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

  useEffect(()=>{
    setBatchId(index)
  },[])

  const convertDate = (dateCreated) => {
    const dateString = new Date(dateCreated);
    return dateString.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  
  return (
    <>
      <td className="align-middle">
        <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{++index}</p>
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
        <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{convertDate(dateCreated)} </p>
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
          {
            loadingStatus?loadingAnimation:
            <>
              <Button variant="info" onClick={handleUpdate} className="me-2">
                Proceed
              </Button>
              <Button variant="secondary" onClick={closeUpdateModal}>
                Cancel
              </Button>
            </>
          }
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BatchCard;

const tdWidth = {
  maxWidth: "180px",
  maxHeight: "150px",
  overflow: "hidden",
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