import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useState} from 'react'
import { Link } from 'react-router-dom';

const userRole = localStorage.getItem('role')

const BatchVoucherCard = (props) => {

  const [active, setActive] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [firstName, setFirstName] = useState('')
  const [userId, setUserId] = useState('')
  const [surname, setSurname] = useState('')
  const [activeState, setActiveState] = useState('')

  const dispatch = useDispatch()
  const {data} = props 
  
  return (
    <>
      <td className="align-middle">
        <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{data.vouchers.encryptedVoucherCode}</p>
      </td>
      <td className="align-middle text-center">

        {data.vouchers.isBlocked? (
          <p className="text-uppercase text-xxs font-weight-bolder opacity-7 ps-2">active</p>
        ) : (
          <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">inactive</p>
        )}
          
      </td>
      <td>
        <p className="text-uppercase text-xxs font-weight-bolder opacity-7 ps-2">{data.bundles.name}</p>
      </td>
      <td>
        <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{data.user.firstname} {data.user.surname}</p>
      </td>
      
        {
          userRole==='Super Admin'? (
            <td className="align-middle text-center">
          <a className={data.active === true ?"btn btn-link text-danger px-3 mb-0":"btn btn-link text-success px-3 mb-0"} onClick={() => {
            let currentStatus = ''
            if(data.active === true){
              currentStatus = 'Active'
            }
            else {
              currentStatus = 'Deactivated'
            }

            this.setState({ // set values to state individually
              active: data.active?false:true,
              batchName: data.batchName,
              batchId: data.id,
              id: data.id,
              current: data.active
            })
            // this.openUpdateModal() //opens the modal

            }}><i className={data.active?"material-icons text-sm me-2":"material-icons text-sm me-2"}>edit</i>
            {
              data.active ?"Disapprove Batch":"Approve Batch"
            }
          </a>
          
      </td>
          ):('')
        }
      
      
    </>
  );
}

export default BatchVoucherCard;

const tdWidth = {
  maxWidth: "180px",
  maxHeight: "150px",
  overflow: "hidden",
}