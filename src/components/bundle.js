import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/cart-slice';

const Bundle = ({name, id, imgUrl, price, currency, product}) => {
    
    const dispatch  = useDispatch()
    const addToCart = () => {
        dispatch(
            cartActions.addToCart({
                name,
                id,
                price,
            })
        )
    }
    return (
        <>
            <td>
                <div className="d-flex px-2">
                    <div>
                    <img src={imgUrl} className="avatar avatar-sm rounded-circle me-2" alt={name} />
                    </div>
                    <div className="my-auto">
                    <h6 className="mb-0 text-sm">{name}</h6>
                    </div>
                </div>
                </td>
                <td className="align-middle text-center">
                <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{price} {currency}</p>                        
                </td>
                <td className="align-middle text-center">
                <a  className="mb-0"
                    style={{cursor: 'pointer'}}
                    onClick={addToCart}>
                    <span className="text-success text-sm font-weight-bolder">+ Add To Cart</span>
                </a>
            </td>
        </>
        
    )
}

export default Bundle

const Style1={
    textAlign:"center"
  }
  
  const Style2 ={
    width: "90%"
  }
  
  const tdWidth = {
    maxWidth: "150px",
    maxHeight: "150px",
    overflow: "hidden",
  }