import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncBasePrice, getBasePrice } from "../../../store/basePrice-slice";
import { cartActions, getBtnState } from "../../../store/cart-slice";
import { getPaymentMethod } from "../../../store/toggle-slice";

const CartItem = ({ name, quantity, total, discount, price, id, product, rate, vat }) => {

  const [ rateStatus, setRateStatus ]  = useState('')
  const [ rateId, setRateId ] = useState('')
  const [ inputQuantity, setInputQuantity ] = useState(quantity);

  const priceInt = price * 100; // Convert price to integer (e.g., cents)
  const discountInt = discount * 100; // Convert discount to integer
  const rateInt = rate * 100; // Convert rate to integer
  const vatInt = vat + 100; // Convert VAT to integer (e.g., 110 for 10% VAT)

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
      cartActions.addToCart({
        name,
        id,
        price,
      })
    );
  };
  const changeQty = (event) => {
    dispatch(
      cartActions.changeCart({
        name,
        id,
        price,
        quantity: event.target.value
      })
    );
  };
  const decrementCartItems = () => {
    dispatch(cartActions.removeFromCart(id));
  };

  const handleInputChange = event => {
    setInputQuantity(event.target.value);
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
        {/*<label style={CartLabel}>{quantity}</label>*/}
        <input
          type="text"
          min="1"
          value={quantity}
          onBlur={handleInputChange}
          onInput={changeQty}
          style={CartInput}
        />
        <button onClick={incrementCartItem} style={CartActionsStyles}>
          +
        </button>
      </td>
      <td style={{textAlign: 'right'}}> ${totalPrice}</td>
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
const CartInput = {
  width: '80px',
  textAlign: 'center',
  margin: '0 8px',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  borderBottom: '2px solid #1151A2',
  outline: 'none'
}