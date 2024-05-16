import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Sidebar from "../Admin/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Loder from "../Loader/Loder";
import MetaData from "../MetaData";
import {
  deleteOrder,
  getAllOrders,
  clearError,
  reset,
} from "../../../actions/orderAction";
import "./allorder.css";
import PopUpLoader from "../Loader/PopUpLoader";
const AllORders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, orders } = useSelector((state) => state.allOrders);

  const {
    loading: deleteLoader,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.deleteOrder);
  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (deleteError) {
      toast.error(deleteError.message);
      dispatch(clearError());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      dispatch(reset());
    }
    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  const [isOpen, setIsOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [togglePricecontroller, setTogglePrice] = useState(false);
  const [indexEle, setIndex] = useState(0);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const deltaX = currentX - startX;
    if (deltaX > 70) {
      // Adjust threshold as needed
      setIsOpen(true);
    } else if (deltaX < -60) {
      // Adjust threshold as needed
      setIsOpen(false);
    }
  };

  const togglePrice = (i) => {
    setTogglePrice((prev) => !prev);
    setIndex(i);
  };
  
  const deleteOrderCall = (id, i) => {
    setIndex(i);
    dispatch(deleteOrder(id));
  };
  return (
    <>
      {loading !== false ? (
        <Loder />
      ) : (
        <>
          <MetaData title="All Products" />

          <div
            className="_all-products-admin"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Sidebar isShown={isOpen} />
            <div className="_admin-products-list">
              {loading === false &&
                orders.map((item, index) => (
                  <div className="_admin-panel-product " key={"o" + index}>
                    <div className="_admin-panel-product-id">
                      OrderID:{item._id}
                    </div>
                    <div className="_admin-panel-product-details order-panel">
                      <div className="_ap-order-image">
                        <img src={item.orderItems[0].image} alt="" />
                      </div>

                      <div className="_ap-order-detail">
                        <Link to={`/admin/orders/edit/${item._id}`}>
                          {item.orderItems.length === 1 ? (
                            <p>{item.orderItems[0].name}</p>
                          ) : (
                            <p>
                              {item.orderItems[0].name}
                              <span> +{item.orderItems.length - 1}more</span>
                            </p>
                          )}
                        </Link> 
                        <p className="orderBy">
                          Orderd By :- {item.userOrdered.name}
                        </p>
                        <p className="orderBy">
                          Phone No :- {item.userOrdered.mobileNumber}
                        </p>
                        <p className="orderBy">
                          {" "}
                          Email :- {item.userOrdered.email}
                        </p>

                        <span></span>
                        <p
                          className="orderBy"
                          style={
                            item.orderStatus === "Delivered"
                              ? { color: "green" }
                              : { color: "red" }
                          }
                        >
                          Status:{item.orderStatus}
                        </p>
                        <p className="orderBy">
                          Payment Method:{item.paymentMethod}
                        </p>
                        <div>
                          <Link to={`/admin/orders/edit/${item._id}`}>
                            <Button className="ap-order-button">
                              <EditIcon />
                            </Button>
                          </Link>
                          <Button
                          sx={{backgroundColor:"#D8F5F6"}}
                            className="ap-order-button"
                            onClick={() => deleteOrderCall(item._id, index)}
                            disabled={deleteLoader}
                          >
                            {(deleteLoader && indexEle === index) ? <PopUpLoader /> : "" }
                            <DeleteIcon color="error" sx={(deleteLoader && indexEle === index)? { display: 'none' } : { display: 'block' }} />
                          </Button>
                        </div>
                      </div>
                      <div className="_total-price">
                        <div
                          className={
                            togglePricecontroller && index === indexEle
                              ? "_breakdown-price _togglePrice"
                              : "_breakdown-price"
                          }
                        >
                          <p>
                            <label htmlFor="ItemPrice"> Item Price :-</label>{" "}
                            &#8377;
                            {Intl.NumberFormat("en-IN").format(item.itemsPrice)}
                          </p>
                          <p>
                            <label htmlFor="ItemPrice"> Tax Price :-</label>{" "}
                            &#8377;
                            {Intl.NumberFormat("en-IN").format(item.taxPrice)}
                          </p>
                          <p>
                            <label htmlFor="ItemPrice">
                              {" "}
                              Shipping Price :-
                            </label>{" "}
                            &#8377;
                            {Intl.NumberFormat("en-IN").format(
                              item.shippingPrice
                            )}
                          </p>
                        </div>
                        <p onClick={() => togglePrice(index)}>
                          <label htmlFor="ItemPrice"> Total Price :-</label>{" "}
                          &#8377;
                          {Intl.NumberFormat("en-IN").format(item.totalPrice)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllORders;
