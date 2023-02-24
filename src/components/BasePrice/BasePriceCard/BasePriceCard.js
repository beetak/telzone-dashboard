import React,{useState} from 'react';
import { useDispatch } from 'react-redux';

const BasePriceCard = (props) => {

  const dispatch = useDispatch()

  const {data} = props 
  return (
    <>
      <td>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{data.price}</h6>
          </div>
        </div>
      </td>
    </>
  );
}

export default BasePriceCard;
