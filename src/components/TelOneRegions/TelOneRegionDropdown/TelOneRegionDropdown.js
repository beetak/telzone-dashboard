import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/cart-slice';

export default function TelOneRegionDropdown(props){
  const dispatch = useDispatch()
  const {data} = props 
  return (
    <>

    <a  className="dropdown-item" 
        onClick={
            () => {
                props.setRegion(data.id, data.name)
            }
        }>
        {data.name}
    </a>
    </>
  );
}

