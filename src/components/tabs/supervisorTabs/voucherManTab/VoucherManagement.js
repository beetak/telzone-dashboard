import React from 'react';
import { getToggleStatus, toggleActions } from '../../../../store/toggle-slice';
import { useDispatch, useSelector } from 'react-redux';
import VoucherDistribution from '../../../Vouchers/VoucherDistribution/VoucherDistribution';

export default function VoucherManagement() {
    
      const toggleStatus  = useSelector(getToggleStatus)
      const dispatch = useDispatch()
    
      const changeStatus = () => {
        console.log(toggleStatus)
        dispatch(
            toggleActions.changeState({
              status: !toggleStatus
            })
        )
      }
    
      return(
            <div className="container-fluid">
                <div className="row">
                    {/*<SummarySalesShopAgent/>*/}
                    <VoucherDistribution/>
                </div>
            </div>
        )
    }
    