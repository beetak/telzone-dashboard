import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncBasePrice, getBasePrice } from "../../../store/basePrice-slice";
import { cartActions, getBtnState } from "../../../store/cart-slice";
import { getPaymentMethod } from "../../../store/toggle-slice";
import { focActions } from "../../../store/foc-slice";

const FocItem = ({ name, quantity, total, discount, price, id, product, rate, vat }) => {

  const [rateStatus, setRateStatus]  = useState('')
  const [rateId, setRateId] = useState('')


  const dispatch = useDispatch();

  const prices  = useSelector(getBasePrice)

  const paymentValue = useSelector(getPaymentMethod)

  let priceCount = ''
  useEffect(() => {
    dispatch(fetchAsyncBasePrice())
      priceCount = Object.keys(prices).length
      if(priceCount<=0){
        setRateStatus(false)    
      }
      else{
        setRateStatus(true)
        setRateId(prices[0].id)
      }
  }, [dispatch, rate]);


  const [qty, setQty] = useState('')
  // const cartData = useSelector(itemsList)
  const incrementCartItem = () => {
    dispatch(
      focActions.addToFocCart({
        name,
        id,
        price,
      })
    );
  };
  const changeQty = () => {
    dispatch(
      focActions.changeFocCart({
        name,
        id,
        price
      })
    );
  };
  const decrementCartItems = () => {
    dispatch(focActions.removeFromFocCart(id));
  };

  const unitPrice = (Math.round((price - (price*discount/100)) * 10000 * rate / (vat+100)) / 100).toFixed(2)
  const totalPrice = (Math.round(unitPrice*quantity*100)/100).toFixed(2)
  return (
    <>
      <td>{name}</td>
      <td style={{textAlign: 'center'}}>${unitPrice}</td>
      <td>
        <button onClick={decrementCartItems} style={CartActionsStyles}>
          -
        </button>
        <label style={CartLabel}>{quantity}</label>
        <button onClick={incrementCartItem} style={CartActionsStyles}>
          +
        </button>
      </td>
      <td style={{textAlign: 'right'}}> ${totalPrice}</td>
    </>
                
  );
};

export default FocItem;

const CartActionsStyles = {
  color: 'white',
  fontSize: '20px',
  width: '50px',
  border: 'none',
  background: '#1151A2',
  borderRadius: '20px'
}
const CartLabel = {
  width: '40px',
  textAlign: 'center'
}