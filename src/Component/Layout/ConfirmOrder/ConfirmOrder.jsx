import React, { useEffect, useRef, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../MetaData";
// import { createOrder } from "../../../actions/orderAction";
import { toast } from "react-toastify";
import {
  paymentInitator,
  clearError,
  reset,
} from "../../../actions/paymentAction";
import PopUpLoader from "../Loader/PopUpLoader";
const ConfirmOrder = () => {
  const { shippingInfo, cartItem } = useSelector((state) => state.cart);
  // const { error } = useSelector((state) => state.newOrder);
  const { user } = useSelector((state) => state.user);
  const {
    loading,
    order,
    error: paymentError,
  } = useSelector((state) => state.paymentReducer);
  // const navigate = useNavigate();
  const subtotal = cartItem.reduce(
    (acc, item) => acc + item.quant * item.price,
    0
  );
  const [paymentMeth, setPaymentMeth] = useState("");
  const dispatch = useDispatch();
  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;
  const paymentButton = useRef();
  const totalPrice = subtotal + tax + shippingCharges;
  // const orders = {
  //   shippingInfo: {
  //     address: shippingInfo.address,
  //     state: shippingInfo.state,
  //     city: shippingInfo.city,
  //     country: shippingInfo.country,
  //     pincode: shippingInfo.pinCode,
  //     phoneNo: shippingInfo.phoneNo,
  //   },
  //   orderItems: cartItem,
  //   itemsPrice: subtotal,
  //   taxPrice: tax,
  //   shippingPrice: shippingCharges,
  //   totalPrice,
  // };
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  const proceedToPayment = async () => {
    if (paymentMeth === "" || paymentMeth === undefined) {
      toast.error("Select The Payment Method");
      return;
    }
    if (paymentMeth === "OnlinePayment") {
      dispatch(paymentInitator(totalPrice));
    }
  };
  useEffect(() => {
    if (paymentError) {
      toast.error(paymentError.message);
      dispatch(clearError());
    }
    if (
      loading === false &&
      order &&
      order.id &&
      paymentMeth === "OnlinePayment"
    ) {
      var options = {
        key: "rzp_test_HsZJNRzgXeI1ap",
        amount: order.amount,
        currency: "INR",
        name: "Teific",
        description: "Test Transaction",
        image:
          "https://i.ibb.co/YtRn0G0/Teific-Technology-Private-limited-1.png",
        order_id: order.id,
        callback_url: "http://localhost:4000/VC1/paymentVerification",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();

      dispatch(reset());
    }
  }, [dispatch, loading, paymentError, order, paymentMeth]);
  const handlePaymentWay = (e) => {
    if (e.target.value === "OnlinePayment") {
      setPaymentMeth("OnlinePayment");
    }
    if (e.target.value === "COD") {
      setPaymentMeth("COD");
    }
  };
  useEffect(() => {}, [paymentMeth]);
  return (
    <>
      <MetaData title="Confirm Your order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <h2>Shipping Info</h2>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <h2>Your Cart Items:</h2>
            <div className="confirmCartItemsContainer">
              {cartItem &&
                cartItem.map((item) => (
                  <div key={item.product}>
                    <div>
                      <img src={item.image} alt="Product" />
                      <Link to={`/products/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                    </div>
                    <span>
                      {item.quant} x ₹{item.price} ={" "}
                      <b>₹{item.price * item.quant}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <h2>Order Summery</h2>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <div className="_payment-method">
              <div>
                <input
                  type="radio"
                  id="payment"
                  name="method_payment"
                  value="OnlinePayment"
                  onChange={handlePaymentWay}
                />
                <label for="html">Net Banking, UPI, Card etc.</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="payment"
                  name="method_payment"
                  value="COD"
                  onChange={handlePaymentWay}
                />
                <label for="html">Cash On Delivery</label>
              </div>
            </div>

            <button onClick={proceedToPayment} ref={paymentButton}>
              {loading ? <PopUpLoader /> : <span>Proceed To Payment</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
