import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import { Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup'
import { FormControl } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown'
import { ButtonGroup, Form } from "react-bootstrap";
import { fetchAsyncUsageReports, getClientUsage } from '../../../store/report-slice';

const TotalSalesCard = (props) => {

  const [activeStatus, setActiveStatus] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updateStatus, setUpdateStatus] = useState('')
  const [current, setCurrent] = useState('')
  
  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const openUpdateModal = () => setIsUpdateOpen(true);

  const closeUpdateModal = () => setIsUpdateOpen(false);
  
  const dispatch = useDispatch()

  const usage = useSelector(getClientUsage)

  const {data, index} = props 

  return (
    <>
      <td>
        <div className="d-flex px-2 py-1">
          <div className="d-flex flex-column justify-content-center">
            <h6 className="mb-0 text-sm">{data.id}</h6>
          </div>
        </div>
      </td>
      <td>
        <p className="text-xs font-weight-bold mb-0">{data.quantity}</p>
      </td>
      <td>
        <p className="text-xs font-weight-bold mb-0">{data.amount}</p>
      </td>
      <td>
        <p className="text-xs font-weight-bold mb-0">{data.payingAccountNumber}</p>
      </td>
      <td>
        <p className="text-xs font-weight-bold mb-0">{data.businessPartner.name}</p>
      </td>
      <td>
        <p className="text-xs font-weight-bold mb-0">{data.businessPartner.email}</p>
      </td>
      <td>
        <p className="text-xs font-weight-bold mb-0">{data.businessPartner.businessAddress}</p>
      </td>


      {/* Activate / Deactivate Modal */}

      <Modal show={isUpdateOpen} onHide={closeUpdateModal} style={{marginTop: 200}}>
        <Modal.Body>            
          <p>{updateStatus}</p>
          {usage.map((client, index)=>(
          <div  key={index}>
            <label className='pb-4 text-dark'><strong>Client ID:</strong> {client.clientId}</label>  
              <ul className="list-group">
                <li className="list-group-item border-0 ps-0 pt-0 text-sm"><strong className="text-dark">Mac Address:</strong> &nbsp; {client.clientMac}</li>
                <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">IP Address:</strong> &nbsp; {client.clientId  }</li>
                <li>
                  <div>Data usage</div>
                  <table className="table align-items-center justify-content-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Date</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Received</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Sent</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody style={{height: '50px', overflow: 'scroll'}}>
                      {client.usageHistory.map((usage, index)=>(
                        <tr key={index}>
                          <td>
                            <p className="text-sm font-weight-bold mb-0">{usage.ts}</p>
                          </td>
                          <td>
                            <span className="text-xs font-weight-bold">{usage.received}</span>
                          </td>
                          <td>
                            <span className="text-xs font-weight-bold">{usage.sent}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                </li>
              </ul>
          </div>
          ))}
          <Button variant="info" className="me-2">
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


export default TotalSalesCard;
