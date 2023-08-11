import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToggleStatus, toggleActions } from '../../../../store/toggle-slice';
import VoucherVerification from '../../../Vouchers/VoucherVerification/VoucherVerification';

export default function VoucherVerificationTab() {
    
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
                <VoucherVerification/>
            </div>
        </div>
    )
}
    
