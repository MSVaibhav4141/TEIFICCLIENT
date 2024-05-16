import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Add to Cart

const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL})
export const cartItem = createAsyncThunk(
  "product/cart", 
  async ({ id, cartItemNo }, { getState, rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/VC1/products/${id}`);
      return {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quant: cartItemNo,
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Remove to Cart
export const cartItemRemove = createAsyncThunk(
  "product/cart/remove",
  async ({ id }, { getState, rejectWithValue }) => {
    try {
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
//Shipping Info
export const saveShippingInfo = createAsyncThunk(
  "product/shipping/info",
  async ( data , {rejectWithValue }) => {
    try {
      localStorage.setItem("shippingInfo", JSON.stringify(data));
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
