import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncBasePrice,
  getBasePrice,
} from "../../../store/basePrice-slice";
import { cartActions } from "../../../store/cart-slice";
import { getPaymentMethod } from "../../../store/toggle-slice";

const CartItem = ({
  name,
  quantity,
  total,
  discount,
  price,
  id,
  product,
  rate,
  vat,
}) => {
  const [rateStatus, setRateStatus] = useState("");
  const [rateId, setRateId] = useState("");
  const [qty, setQty] = useState(quantity);

  const dispatch = useDispatch();

  const prices = useSelector(getBasePrice);

  const paymentValue = useSelector(getPaymentMethod);

  let priceCount = "";
  useEffect(() => {
    dispatch(fetchAsyncBasePrice());
    priceCount = Object.keys(prices).length;
    if (priceCount <= 0) {
      setRateStatus(false);
    } else {
      setRateStatus(true);
      setRateId(prices[0].id);
    }
  }, [dispatch, rate]);

  const incrementCartItem = () => {
    const updatedQty = qty + 1;
    setQty(updatedQty);
    dispatch(
      cartActions.changeCart({
        name,
        id,
        price,
        quantity: updatedQty,
      })
    );
  };

  const decrementCartItems = () => {
    if (qty > 1) {
      const updatedQty = qty - 1;
      setQty(updatedQty);
      dispatch(
        cartActions.changeCart({
          name,
          id,
          price,
          quantity: updatedQty,
        })
      );
    } else {
      dispatch(cartActions.removeFromCart(id));
    }
  };

  const changeQty = (e) => {
    const updatedQty = parseInt(e.target.value);
    if (!isNaN(updatedQty) && updatedQty >= 0) {
      setQty(updatedQty);
      dispatch(
        cartActions.changeCart({
          name,
          id,
          price,
          quantity: updatedQty,
        })
      );
    }
  };

  const unitPrice = (
    Math.round(
      ((price - (price * discount) / 100) * 10000 * rate) / (vat + 100)
    ) / 100
  ).toFixed(2);

  const totalPrice = (Math.round(unitPrice * qty * 100) / 100).toFixed(2);

  return (
    <>
      <td>{name}</td>
      <td style={{ textAlign: "center" }}>${unitPrice}</td>
      <td>
        <button onClick={decrementCartItems} style={CartActionsStyles}>
          -
        </button>
        <input
          type="number"
          value={qty}
          onChange={changeQty}
          style={CartInputStyles}
        />
        <button onClick={incrementCartItem} style={CartActionsStyles}>
          +
        </button>
      </td>
      <td style={{ textAlign: "right" }}> ${totalPrice}</td>
    </>
  );
};

export default CartItem;

const CartActionsStyles = {
  color: "white",
  fontSize: "20px",
  width: "50px",
  border: "none",
  background: "#1151A2",
  borderRadius: "20px",
};

const CartInputStyles = {
  width: "40px",
  textAlign: "center",
};