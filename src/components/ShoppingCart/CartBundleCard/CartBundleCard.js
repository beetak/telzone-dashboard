import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { cartActions, getBtnState } from '../../../store/cart-slice';
import { focActions } from '../../../store/foc-slice';

const CartBundleCard = (props) => {

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
    return (
        <>
            <td>
                <div className="d-flex px-2">
                    <div>
                    <img src={data.image} className="avatar avatar-sm rounded-circle me-2" alt={data.name} />
                    </div>
                    <div className="my-auto">
                    <h6 className="mb-0 text-sm">{data.name}</h6>
                    </div>
                </div>
                </td>
                <td className="align-middle text-center">
                <h6 className="mb-0 text-sm">{data.price} {data.currency.symbol}</h6>                       
                </td>
                <td className="align-middle text-center">
                <a  className="mb-0"
                    style={btnState?disable:enable}
                    onClick={addToCart}>
                    <span className={btnState? `text-secondary text-sm font-weight-bolder`:`text-success text-sm font-weight-bolder`}>+ Add To Cart</span>
                </a>
            </td>
        </>
        
    )
}

export default CartBundleCard

const disable = {
  pointerEvents: 'none',
  cursor: 'default'
}
const enable = {
  cursor: 'pointer'
}
