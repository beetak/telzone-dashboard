import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useState} from 'react'
import { getVBActive, getVBState, getVBSuspended, updateAsyncVoucher } from '../../../store/batch-slice';
import { Button, Modal } from 'react-bootstrap';

const userRole = localStorage.getItem('role')

const VoucherCard = (props) => {

  const [approved, setApproved] = useState('')
  const [isBlocked, setIsBlocked] = useState('')
  const [approvedBy, setApprovedBy] = useState('')
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [id, setId] = useState('')
  const [current, setCurrent] = useState('')
  const [bundleName, setBundleName] = useState('')
  const [used, setUsed] = useState('')
  const [firstname, setFirstname] = useState('')
  const [surname, setSurname] = useState('')
  const [encryptedVoucherCode, setEncryptedVoucher] = useState('')
  const [voucherCode, setVoucherCode] = useState('')
  const [voucherId, setVoucherId] = useState('')

  const openUpdateModal = () => setIsUpdateOpen(true);

  const closeUpdateModal = () => setIsUpdateOpen(false);

  const batchActive = useSelector(getVBActive)
  const batchSuspended = useSelector(getVBSuspended)

  const dispatch = useDispatch()

  const handleUpdate = () => {
    dispatch(updateAsyncVoucher(
      {
        approved,
        approvedBy,
        id,
        isBlocked,
        encryptedVoucherCode,
        firstname,
        surname,
        used,
        bundleName,
        voucherCode,
        voucherId
      }
    ))

    closeUpdateModal()
  }

  useEffect(() => {
    setVoucherId(index)
  }, []);

  
  
    

  const {data, index} = props 
  
  return (
    <>
      <td className="" style={tdWidth}>
        <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{data.vouchers.encryptedVoucherCode}</p>
      </td>
      <td className="align-middle text-center">
        <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{data.bundles.name}</p>
      </td>
      <td className="align-middle text-center">
        <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{data.user.firstname} {data.user.surname}</p>
      </td>
      <td className="align-middle text-center">

        {batchActive && !batchSuspended ? (
          <span class="badge badge-sm bg-gradient-success">Active</span>
        ) : (
          batchActive && batchSuspended ?
          <span class="badge badge-sm bg-gradient-secondary">Suspended</span>
          : (!batchActive && !batchSuspended ?  <span class="badge badge-sm bg-gradient-danger">Inactive</span>:'not')
        )}
        
      </td>
      <td className="align-middle text-center">
        {!data.vouchers.sold && !data.vouchers.used? (
          <span class="badge badge-sm bg-gradient-success">Available</span>
        ) : (
          data.vouchers.sold && !data.vouchers.used?
          <span class="badge badge-sm bg-gradient-info">sold</span>:(
            data.vouchers.sold && data.vouchers.used?
            <span class="badge badge-sm bg-gradient-secondary">used</span>:''
          )
        )}
      </td>     

      {/* Activate / Deactivate Modal */}

      <Modal show={isUpdateOpen} onHide={closeUpdateModal} style={{marginTop: 200}}>
        <Modal.Body>
          <label>Are you sure you want to {current?"Block":"Unblock"} the voucher&#63;</label>              
          <p>{"updateStatus"}</p>
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

export default VoucherCard;

const tdWidth = {
  maxWidth: "180px",
  maxHeight: "150px",
  overflow: "hidden",
}