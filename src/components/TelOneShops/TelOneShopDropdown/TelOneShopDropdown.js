import React from 'react';
import { useDispatch } from 'react-redux';

export default function TelOneShopDropdown (props) {
  const dispatch = useDispatch()
  const {data} = props 
  return (
    <>

    <a  className="dropdown-item" 
        onClick={
            () => {
                props.setShop(data.id, data.name)
            }
        }>
        {data.name}
    </a>
    </>
  );
}

