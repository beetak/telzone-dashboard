import React,{useState, useEffect} from 'react';
import { Button, ButtonGroup, Dropdown, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateCategory } from '../../../store/category-slice';

const NetworkCard = (props) => {

  const {data} = props 

  return (
    <>
      <td>
        <div className="d-flex px-2 py-1">
          <div className="d-flex flex-column justify-content-center">
            <h6 className="mb-0 text-sm">{data.organizationId}</h6>
          </div>
        </div>
      </td>
      <td>
        <p className="text-xs font-weight-bold mb-0">{data.id}</p>
      </td>
      <td>
        <p className="text-xs font-weight-bold mb-0">{data.name}</p>
      </td>
      <td>
        <p className="text-xs font-weight-bold mb-0">{data.timeZone}</p>
      </td>
    </>
  );
}

export default NetworkCard;
