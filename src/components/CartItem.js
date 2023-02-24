import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice"; 
const CartItem = ({ name, quantity, total, price, id, product }) => {
  const dispatch = useDispatch();
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
        {/*<input type="text" value={quantity} onChange={}/>*/}
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