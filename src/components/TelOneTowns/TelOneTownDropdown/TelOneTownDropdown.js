import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/cart-slice';
import { entityActions } from '../../../store/entities-slice';

export default function TelOneTownDropdown(props){
  const dispatch = useDispatch()
  const {data} = props 
  return (
    <>

    <a  className="dropdown-item" 
        onClick={
            () => {
                props.setTown(data.id, data.name)
            }
        }>
        {data.name==='No Town'? 'All Towns': data.name}
    </a>
    </>
  );
}

