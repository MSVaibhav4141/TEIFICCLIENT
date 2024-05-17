import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL, withCredentials:true})

// Create Order
export const createOrder = createAsyncThunk(
  "product/checkout/newOrder",
  async ({ orders }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.post(`/VC1/order/new`, orders, config);

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Get All Orders (admin)
export const getAllOrders = createAsyncThunk(
  "order/admin/all",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/VC1/order/sales");
      return data.order;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Update Order

export const updateOrder = createAsyncThunk(
  "order/admin/update",
  async ({ id, orderStatus }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.put(
        `/VC1/order/admin/${id}`,
        orderStatus,
        config
      );

      return data.success;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Delete Order

export const deleteOrder = createAsyncThunk(
  "order/admin/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/VC1/order/admin/${id}`);
      return data.success;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// My order
export const myOrder = createAsyncThunk(
  "user/myOrder",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/VC1/order/self`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//Sibgle Order Details(User)
export const getOrderDetail = createAsyncThunk(
  "user/orderDetail",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/VC1/order/find/${id}`);
      return data.order;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//Sibgle Order Details(User)
export const getDeliveryDetail = createAsyncThunk(
  "user/delivery",
  async (pincode, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/VC1/order/delivery/${pincode}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const clearError = createAsyncThunk("order/clearError", async () => {
  return null;
});
export const reset = createAsyncThunk("order/reset", async () => {
  return null;
});