import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// LOGIN

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ loginEmail, loginPassword }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `/VC1/login`,
        { email: loginEmail, password: loginPassword },
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// SIGN UP
export const signUpUser = createAsyncThunk(
  "user/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post(`/VC1/register`, userData, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//LOAD USER

export const loadUser = createAsyncThunk(
  "user/load",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/VC1/self`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "admin/alluser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/VC1/admin/users`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// get  User Details
export const getUserDetails = createAsyncThunk(
  "admin/singleUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/VC1/admin/users/${id}`);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Update User
export const updateUser = createAsyncThunk(
  "admin/singleUser/update",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/VC1/admin/users/${id}`,
        userData,
        config
      );

      return data.success;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Delete User

export const deleteUser = createAsyncThunk(
  "admin/singleUser/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/VC1/admin/users/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "user/add/cart",
  async ({ id, cartItemNo }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(`/VC1/add/cart/${id}`, {cartItemNo}, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCartItem = createAsyncThunk(
  "user/get/cart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/VC1/get/cart`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// LOGOUT USER

export const logoutUser = createAsyncThunk(
  "/user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/VC1/logout");
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const clearError = createAsyncThunk("user/clearError", async () => {
  return null;
});
export const reset = createAsyncThunk("user/reset", async () => {
  return null;
});
