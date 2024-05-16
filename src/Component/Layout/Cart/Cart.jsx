import React, { useEffect, useState } from "react";
import Loder from "../Loader/Loder";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import {
  cartItemRemove,
  cartItem as cartItems,
} from "../../../actions/cartAction";
import { Link } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.cart);

  const checkOutHandler = () => {
    navigate("/access?redirect=shipping");
  };
  //   const [item, cartItem]
  const increaseItem = (id, quantity, stock) => {
    const cartItemNo = quantity + 1;
    if (quantity >= stock) return;
    dispatch(cartItems({ id, cartItemNo }));
  };
  const decreaseItem = (id, quantity, stock) => {
    const cartItemNo = quantity - 1;
    if (quantity <= 1) return;
    dispatch(cartItems({ id, cartItemNo }));
  };

  const deleteCartItem = (id) => {
    dispatch(cartItemRemove({ id }));
  };

  function truncateString(str, maxLength) {
    // If string length is less than or equal to maxLength, return the original string
    if (str.length <= maxLength) {
      return str;
    }
  
    // Truncate the string to maxLength characters and add "..."
    return str.slice(0, maxLength) + "...";
  }
  const [innerWidth , setInnerWidth] = useState(window.innerWidth)
useEffect(() => {
  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, [setInnerWidth])

  return (
    <>
      {!cartItem ? (
        <Loder />
      ) : (
        <>
          {cartItem.length < 1 ? (
            <div>Oops feels so light </div>
          ) : (
            <>
              <div className="_cart-container">
                <div className="item-cart">
                  {cartItem.map((item) => (
                    <div className="_products-info" key={item.product}>
                      <div className="_product-img">
                        <img src={item.image} alt="" />
                      </div>
                      <div className="_product-title">
                        <Link to={`/products/${item.product}`}>
                          <p>{cartItem && innerWidth < 1000 ?  truncateString(item.name, 32) : truncateString(item.name, 60)}</p>
                        </Link>
                      <div>
                        <span>
                          <button onClick={() => deleteCartItem(item.product)}>
                            Remove
                          </button>
                        </span>
                        <div className="_product-qty">
                          <button
                            onClick={() => {
                              decreaseItem(
                                item.product,
                                item.quant,
                                item.stock
                              );
                            }}
                          >
                            -
                          </button>
                          <input type="text" readOnly value={item.quant} />
                          <button
                            onClick={() => {
                              increaseItem(
                                item.product,
                                item.quant,
                                item.stock
                              );
                            }}
                          >
                            +
                          </button>
                        </div>
                        </div>
                      </div>
                      <div className="_product-specs">
                        <div className="_product-price">
                          &#8377;
                          {Intl.NumberFormat("en-IN").format(
                            item.price * item.quant
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="_gross-total">
                  <p>Price Breakdown</p>
                  <hr />
                  <p className="_price-detail">
                    Price({cartItem.length}) - <span>&#8377;
                    {Intl.NumberFormat("en-IN").format(
                      `${cartItem.reduce(
                        (acc, item) => acc + item.quant * item.price,
                        0
                      )}`
                    )}</span>
                  </p>
      
                  <p className="_price-detail">
                    Shipping Charges - <span>&#8377;
                    {Intl.NumberFormat("en-IN").format(
                      `${
                        cartItem.reduce(
                          (acc, item) => acc + item.quant * item.price,
                          0
                        ) > 1000
                        ? 0
                        : 200
                      }`
                    )}</span>
                  </p>
                  
       
                  <p className="_price-detail">
                    Tax - <span>&#8377;
                    {Intl.NumberFormat("en-IN").format(
                      `${
                        cartItem.reduce(
                          (acc, item) => acc + item.quant * item.price,
                          0
                        ) * 0.18
                      }`
                    )}</span>
                  </p>
                    <hr />
                  <p className="_price-detail">
                    Total Cost - <span>&#8377;
                    {Intl.NumberFormat("en-IN").format(
                      `${
                        cartItem.reduce(
                          (acc, item) => acc + item.quant * item.price,
                          0
                        ) *
                        0.18 +
                        (cartItem.reduce(
                          (acc, item) => acc + item.quant * item.price,
                          0
                        ) > 1000
                        ? 0
                        : 200) +
                        cartItem.reduce(
                          (acc, item) => acc + item.quant * item.price,
                          0
                        )
                      }`
                    )}</span>
                  </p>
                    <div className="_checkout-button-cart">
                  <button onClick={checkOutHandler}>Checkout</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
