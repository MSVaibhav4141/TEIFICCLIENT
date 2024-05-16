import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateProfile = createAsyncThunk(
  "user/update",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.put(
        `/VC1/self/update/profile`,
        userData,
        config
      );
      return data.success;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "user/updateUserPassword",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/VC1/self/reset/password`,
        userData,
        config
      );
      return data.success;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const updateProfileReset = createAsyncThunk(
  "user/updateReset",
  async () => {
    return null;
  }
);

export const forgetUserPassword = createAsyncThunk(
  "user/forgetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `/VC1/password/passRecovery`,
        email,
        config
      );
      return data.message;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Reset Password
export const resetUserPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, userData }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/VC1/password/reset/${token}`,
        userData,
        config
      );
      return data.success;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const clearError = createAsyncThunk("user/clearError", async () => {
  return null;
});
