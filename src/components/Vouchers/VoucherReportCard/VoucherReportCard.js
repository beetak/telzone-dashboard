import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { cartActions, getBtnState } from '../../../store/cart-slice';
import { focActions } from '../../../store/foc-slice';

const VoucherReportCard = (props) => {

    const btnState = useSelector(getBtnState)

    const {data, page} = props
    console.log("page ", page)
    let name = data.name
    let id = data.id
    let price = data.price
    
    const dispatch  = useDispatch()
    const addToCart = () => {
      page==='sales' ?
      dispatch(
        cartActions.addToCart({
          name,
          id,
          price
        })
      ):
      dispatch(
        focActions.addToFocCart({
          name,
          id,
          price
        })
      )
    }

    const convertDate = (dateCreated) => {
      const dateString = new Date(dateCreated);
      const day = dateString.toLocaleDateString('en-GB', { day: 'numeric' });
      const month = dateString.toLocaleDateString('en-GB', { month: 'long' });
      const year = dateString.toLocaleDateString('en-GB', { year: 'numeric' });
      const hours = dateString.getHours().toString().padStart(2, '0');
      const minutes = dateString.getMinutes().toString().padStart(2, '0');
      
      return `${day} ${month} ${year} \t\t ${hours}:${minutes}`;
    };

    const TimeDisplay = (dateCreated) => {
      const formattedTime = new Date(dateCreated).toUTCString();
    
      return formattedTime
    };

    return (
        <>
            <td>
                <div className="d-flex px-2">
                    <div className="my-auto">
                    <h6 className="mb-0 text-sm">{data.vouchers.voucherCode}</h6>
                    </div>
                </div>
            </td>
            <td className="align-middle ">
              <h6 className="mb-0 text-sm">{data.bundles.name}</h6>                       
            </td>
            <td className="align-middle">
              <h6 className="mb-0 text-sm">{convertDate(data.order.dateCreated)}</h6>                       
            </td>
            <td className="align-middle">
              <h6 className="mb-0 text-sm">{data.order.adminPortalUsers.firstname}</h6>                       
            </td>
            <td className="align-middle">
              <h6 className="mb-0 text-sm">{data.vouchers.used?"Used":"Not Used"}</h6> 
            </td>
        </>
        
    )
}

export default VoucherReportCard

const disable = {
  pointerEvents: 'none',
  cursor: 'default'
}
const enable = {
  cursor: 'pointer'
}
