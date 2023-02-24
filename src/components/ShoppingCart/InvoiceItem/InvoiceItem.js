import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart-slice";

const InvoiceItem = ({ name, quantity, total, price, id, product }) => {

  
  const dispatch = useDispatch();
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
      <td>{quantity}</td>
      <td>{name}</td>
      <td style={{textAlign: 'right'}}>${(Math.round(price * 100) / 100).toFixed(2)}</td>
      <td style={{textAlign: 'right'}}> ${(Math.round(total * 100) / 100).toFixed(2)}</td>
    </>
                
  );
};

export default InvoiceItem;