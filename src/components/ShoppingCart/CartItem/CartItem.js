import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncBasePrice, getBasePrice } from "../../../store/basePrice-slice";
import { cartActions, getBtnState } from "../../../store/cart-slice";
import { getPaymentMethod } from "../../../store/toggle-slice";

const CartItem = ({ name, quantity, total, price, id, product }) => {

  const [rateStatus, setRateStatus]  = useState('')
  const [rateId, setRateId] = useState('')
  const [rate, setRate] = useState(1)


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
        setRate(prices[0].price)
        setRateId(prices[0].id)
      }
  }, [dispatch]);


  const [qty, setQty] = useState('')
  // const cartData = useSelector(itemsList)
  const incrementCartItem = () => {
    dispatch(
      cartActions.addToCart({
        name,
        id,
        price,
      })
    );
  };
  const changeQty = () => {
    dispatch(
      cartActions.changeCart({
        name,
        id,
        price
      })
    );
  };
  const decrementCartItems = () => {
    dispatch(cartActions.removeFromCart(id));
  };
  return (
    <>
      <td>{name}</td>
      <td style={{textAlign: 'center'}}>${(Math.round(price * 100) / 100).toFixed(2)}</td>
      <td>
        <button onClick={decrementCartItems} style={CartActionsStyles}>
          -
        </button>
        <label style={CartLabel}>{quantity}</label>
        {/*<input 
          style={{
            'width': '80px',
            'border-radius': '1rem',
            'background-color': 'hsl(0, 0%, 100%)',
            'border':' 4px solid hsl(0, 0%, 90%)'
          }} 
          type="text" 
          placeholder={quantity} 
        onChange={() => {(e)=>setQty(e.target.value); changeQty;}}/>*/}
        <button onClick={incrementCartItem} style={CartActionsStyles}>
          +
        </button>
      </td>
      <td style={{textAlign: 'right'}}> ${(Math.round(total * 100) / 100).toFixed(2)}</td>
    </>
                
  );
};

export default CartItem;

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