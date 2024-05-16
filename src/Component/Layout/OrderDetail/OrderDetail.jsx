import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getOrderDetail } from "../../../actions/orderAction";
import { toast } from "react-toastify";
import Loder from "../Loader/Loder";
import MetaData from "../MetaData";
import "./orderDetal.css";
const OrderDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { orderDetail, error, loading } = useSelector(
    (state) => state.orderDetails
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    dispatch(getOrderDetail( id ));
  }, [dispatch, id, error]);
  return (
    <>
      {loading !== false ? (
        <Loder />
      ) : (
        <>
          <MetaData title="Order Details" />
          <div className="_order-details-page">
            <div className="_order-details-container">
              <h1>Order #{orderDetail && orderDetail._id}</h1>
              <h3>Shipping Info</h3>
              <div className="_order-detail-container-box">
                <div>
                  <p>Name:</p>
                  <span>{orderDetail.userOrdered.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {orderDetail.shippingInfo &&
                      orderDetail.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {orderDetail.shippingInfo &&
                      `${orderDetail.shippingInfo.address}, ${orderDetail.shippingInfo.city}, ${orderDetail.shippingInfo.state}, ${orderDetail.shippingInfo.pincode}, ${orderDetail.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <h3>Payment</h3>
              <div className="_order-detail-container-box">
                <div>
                  <p
                    className={
                      orderDetail.paymentInfo &&
                      orderDetail.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {orderDetail.paymentInfo &&
                    orderDetail.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>
                    {orderDetail.totalPrice && orderDetail.totalPrice}
                  </span>
                </div>
              </div>

              <h3>Order Status</h3>
              <div className="_order-detail-container-box">
                <div>
                  <p
                    className={
                      orderDetail.orderStatus &&
                      orderDetail.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {orderDetail.orderStatus && orderDetail.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="_order-details-cartitems">
              <h3>Order Items:</h3>
              <div className="_order-details-cartItems-container">
                {orderDetail.orderItems &&
                  orderDetail.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/products/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quant} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quant}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <h3>Order Total:</h3>
            <p>Total Price: {orderDetail.itemsPrice}</p>
            <p>Taxes Applied: {orderDetail.taxPrice}</p>
            {orderDetail.shippingPrice > 0 ? (
              <p>Total Shipping Cost: {orderDetail.shippingPrice}</p>
            ) : (
              ""
            )}
            <p>Total Cost: {orderDetail.totalPrice}</p>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetail;
