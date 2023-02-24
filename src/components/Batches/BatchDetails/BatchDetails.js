import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAsyncVouchersByBatch, getSelectedBatch } from '../../../store/batch-slice';
import BatchVoucherCard from '../BatchVoucherCard/BatchVoucherCard';

const userRole = localStorage.getItem('role')

const BatchDetails = () => {

  const dispatch = useDispatch()
  const data = useSelector(getSelectedBatch)

  let renderedVouchers = ''
  renderedVouchers = data ? (
    data.map((voucher, index)=>(
      <tr key={index}>
        <BatchVoucherCard data={voucher}/>
      </tr>
    ))
  ):(<div><h1>err</h1></div>)

  return (
    <div>
      <table className="table align-items-center mb-0">
        <thead>
          <tr>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{width: "5%"}}>Voucher Code</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{width: "5%"}}>Status</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{width: "5%"}}>Product Type</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Created By</th>
            {
              userRole==='Super Admin'? (
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center" style={{width: "5%"}}>Action</th>
              ):("")
            }
          </tr>
        </thead>
        <tbody>
          {renderedVouchers}
        </tbody>
      </table>
    </div>
  );
}

export default BatchDetails;
