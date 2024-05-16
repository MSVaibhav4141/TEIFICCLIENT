import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { clearError, getAllProductAdmin } from "../../../actions/productAction";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { CategoryScale } from "chart.js";

import SideBar from "./Sidebar.jsx";
import "./admin.css";
import { Typography } from "@mui/material";
import Loder from "../Loader/Loder.jsx";
import { getAllOrders, clearError as orderClear } from "../../../actions/orderAction.js";
import { getAllUsers , clearError as userClear} from "../../../actions/userAction.js";
const Admin = () => {
  const dispatch = useDispatch();

  const { loading, error, productsAdmin } = useSelector(
    (state) => state.products
  );
  const { loading :orderLoading, error:orderError, orders } = useSelector(
    (state) => state.allOrders
  );
  const {
    loading:userLoading,
    error:userError,
    users,
  } = useSelector((state) => state.allUsers);
  let outOfStock = 0;

  loading === false &&
    productsAdmin &&
    productsAdmin.forEach((item) => {
      if (item.stock === 0) {
        outOfStock++;
      }
    });
  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (orderError) {
      toast.error(orderError.message);
      dispatch(orderClear());
    }
    if(userError){
      toast.error(userError.message)
      dispatch(userClear());

    }
    dispatch(getAllProductAdmin());
    dispatch(getAllOrders())
    dispatch(getAllUsers())
  }, [dispatch, error,orderError, userError]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  Chart.register(CategoryScale);
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, orderLoading === false && totalAmount],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [
          outOfStock,
          loading === false && productsAdmin && productsAdmin.length - outOfStock,
        ],
      },
    ],
  };

  const [isOpen, setIsOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

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

  return (
    <>
      {loading === true ? (
        <Loder />
      ) : (
        <div
          className="_admin-dashboard"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <SideBar isShown={isOpen} />

          <div className="_admin-stats">
            <Typography component="h1">Dashboard</Typography>
            <div className="dashboardSummary">
              <div>
                <p>
                  Total Amount <br /> ₹{totalAmount}
                </p>
              </div>
              <div className="dashboardSummaryBox2">
                <Link to="/admin/products">
                  <p>Product</p>
                  <p>{loading === false && productsAdmin && productsAdmin.length}</p>
                </Link>
                <Link to="/admin/orders">
                  <p>Orders</p>
                  <p>{orderLoading === false && orders && orders.length}</p>
                </Link>
                <Link to="/admin/users">
                  <p>Users</p>
                  <p>{userLoading === false && users && users.length}</p>
                </Link>
              </div>
            </div>
            <div className="lineChart">
              <Line data={lineState} />
            </div>
            <div className="doughnutChart">
              <Doughnut data={doughnutState} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
