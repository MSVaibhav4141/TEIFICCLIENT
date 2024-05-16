import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { myOrder, clearError } from "../../../actions/orderAction";
import Loder from "../Loader/Loder";
import { Link } from "react-router-dom";
import MetaData from "../MetaData";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import clsx from "clsx";
import LaunchIcon from "@mui/icons-material/Launch";
import "./myOrder.css";

const MyOrders = () => {
  const rows = [];
  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
      renderCell: (params) => {
        return (
          <Link className="_order-Id" to={`/orders/${params.value}`}>
            {params.value}
            <LaunchIcon className="_launch-icon" />
          </Link>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) =>
        clsx({
          greenColor: params.value === "Delivered",
          redColor: params.value !== "Delivered",
        }),
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
  ];

  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrder);
  // const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    dispatch(myOrder());
  }, [dispatch, error]);

  loading === false &&
    orders.order &&
    orders.order.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  return (
    <>
      {loading !== false ? (
        <Loder />
      ) : (
        <>
          <MetaData title="My Orders" />
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            autoHeight
            className="myOrderTable"
          />
        </>
      )}
    </>
  );
};

export default MyOrders;
