import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Button from "@mui/material/Button";
import "./updateOrder.css";
import {
  clearError as clearOrderError,
  getOrderDetail,
  reset,
  updateOrder,
} from "../../../actions/orderAction";
import { toast } from "react-toastify";
import Loder from "../Loader/Loder";

const ProcessOrder = () => {
  const {
    orderDetail: order,
    error,
    loading,
  } = useSelector((state) => state.orderDetails);
  const {
    error: updateError,
    isUpdated,

  } = useSelector((state) => state.updateOrder);
  const { id } = useParams();
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const orderStatus = new FormData();

    orderStatus.set("orderStatus", status);

    dispatch(updateOrder({ id, orderStatus }));
  };

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearOrderError());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearOrderError());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch(reset());
    }

    dispatch(getOrderDetail(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  return (
    <>
      {loading === true ? (
        <Loder />
      ) : (
        <>
          <MetaData title="Update Order" />
          <div className="newProductContainer _order-container">
            <div
              className="confirmOrderPage"
              style={{
                display:
                  loading === false && order.orderStatus === "Delivered"
                    ? "block"
                    : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{loading === false && order.userOrdered.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {loading === false && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {loading === false &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          loading === false &&
                          order.paymentIn.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {loading === false &&
                        order.paymentIn.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <p>
                        Total Item Price :- &#8377;
                        {Intl.NumberFormat("en-IN").format(
                          loading === false && order.itemsPrice
                        )}
                      </p>
                      <p>
                        Total Taxes :- &#8377;
                        {Intl.NumberFormat("en-IN").format(
                          loading === false && order.taxPrice
                        )}
                      </p>
                      <p>
                         Shipping Charges :- &#8377;
                        {Intl.NumberFormat("en-IN").format(
                          loading === false && order.shippingPrice
                        )}
                      </p>
                      <p>
                        Total :- &#8377;
                        {Intl.NumberFormat("en-IN").format(
                          loading === false && order.totalPrice
                        )}
                      </p>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          loading === false && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {loading === false && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {loading === false &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quant} X &#8377;
                            {Intl.NumberFormat("en-IN").format(
                              item.price
                            )} ={" "}
                            <b>
                              &#8377;
                              {Intl.NumberFormat("en-IN").format(
                                item.price * item.quant
                              )}
                            </b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display:
                    loading === false && order.orderStatus === "Delivered"
                      ? "none"
                      : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {loading === false &&
                        order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}

                      {loading === false && order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProcessOrder;
