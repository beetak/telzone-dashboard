import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/cart-slice';

const BusinessPartnerDropdown = (props) => {
  const dispatch = useDispatch()
  const {data} = props 
  return (
    <>

    <a  className="dropdown-item" 
        onClick={
            () => {
                props.setBusinessPartner(data.id, data.name, data.email, data.businessPartnerRoles.discount, data.businessPartnerRoles.vat)
                dispatch(cartActions.setClient(
                  {
                    addBtn: false,
                    level: 2,
                    vat: data.businessPartnerRoles.vat,
                    discount: data.businessPartnerRoles.discount
                  })
                )
            }
        }>
        {data.name}
    </a>
    </>
  );
}

export default BusinessPartnerDropdown;
