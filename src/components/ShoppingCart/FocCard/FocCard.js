import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getBtnState } from '../../../store/cart-slice';
import { focActions } from '../../../store/foc-slice';

const FocCard = (props) => {

    const btnState = useSelector(getBtnState)

    const {data} = props
    let name = data.name
    let id = data.id
    let price = data.price
    
    const dispatch  = useDispatch()
    const addToCart = () => {
      dispatch(
        focActions.addToFocCart({
          name,
          id,
          price
        })
      )
    }

    const changeDate = (dateTime) => {
      const unixTimestamp = dateTime;
      const dateString = new Date(unixTimestamp);
      const formattedDate = dateString.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      return formattedDate
    }
    return (
        <>
              <td>
                <h6 className="mb-0 text-sm">{data.bundlesId.name}</h6>
              </td>
              <td className="align-middle text-center">
                <h6 className="mb-0 text-sm">{data.quantity}</h6>                       
              </td>
              <td className="align-middle text-end">
                <h6 className="mb-0 text-sm">{data.businessPartnerId.name}</h6>                       
              </td>
              <td className="align-middle text-end">
                <h6 className="mb-0 text-sm">{data.requestCreator.firstname} {data.requestCreator.surname}</h6>                       
              </td>
              <td className="align-middle text-end">
                <h6 className="mb-0 text-sm">{changeDate(data.requestDate)}</h6>                       
              </td>
              <td className="align-middle text-end">
                <h6 className="mb-0 text-sm">{data.currentUser.firstname} {data.currentUser.surname}</h6>                       
              </td>
              <td className="align-middle text-end">
                <h6 className="mb-0 text-sm">{changeDate(data.lastModified)}</h6>                       
              </td>
              <td className="align-middle text-center">
                {data.approved?<span class="badge badge-sm bg-gradient-success">Approved</span>:<span class="badge badge-sm bg-gradient-secondary">Rejected</span>}                       
              </td>
              <td className="align-middle text-center">
                <a className="mb-0 m-2 cursor-pointer"
                  style={data.approved?disable:enable}
                  onClick={()=>alert("jh")}>
                  <span className={data.approved?`text-success text-sm font-weight-bolder text-decoration-line-through`:`text-success text-sm font-weight-bolder`}>Approve</span>
                </a>
                <a className={`mb-0 m-2 cursor-pointer`}
                  style={data.approved?disable:enable}
                  onClick={()=>alert("jh")}>
                  <span className={`text-danger text-sm font-weight-bolder`}>Reject</span>
                </a>
            </td>
        </>
        
    )
}

export default FocCard

const disable = {
  pointerEvents: 'none',
  cursor: 'default'
}
const enable = {
  cursor: 'pointer'
}


const disabled = {
  textDecoration: 'line-through'
}
