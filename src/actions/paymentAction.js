import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL})

export const paymentInitator = createAsyncThunk(
    "product/checkout/payment",
    async (amount, { rejectWithValue }) => {
      try {

        const { data } = await axiosInstance.post(`/VC1/checkout`, {amount});
  
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const reset = createAsyncThunk("reset/payment", async () => {
    return null;
  });
  

  export const clearError = createAsyncThunk("clear/error/payment", async () => {
    return null;
  });
  