import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL, withCredentials:true})

// creating new product
export const createNewProduct = createAsyncThunk(
  "product/create/admin",
  async (productData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axiosInstance.post(
        `/VC1/admin/products/new`,
        productData,
        config
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Edit Product

export const editProduct = createAsyncThunk(
  "product/edit/admin",
  async ({ id, editedData }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axiosInstance.put(
        `/VC1/admin/products/${id}`,
        editedData,
        config
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ keyword, currentPage, priceFilter1, category, rating }) => {
    if (keyword === undefined) {
      keyword = "";
    }
    if (rating === null || rating === undefined) {
      rating = 0;
    }
    if (currentPage === null || currentPage === undefined) {
      currentPage = 1;
    }
    if (priceFilter1 === null || priceFilter1 === undefined) {
      priceFilter1 = {
        min: "0",
        max: "10000000",
      };
    }

    let link = `/VC1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${priceFilter1.min}&price[lte]=${priceFilter1.max}&ratings[gte]=${rating}`;
    if (category) {
      link = `/VC1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${priceFilter1.min}&price[lte]=${priceFilter1.max}&category=${category}&ratings[gte]=${rating}`;
    }
    const { data } = await axiosInstance.get(link);
    return data;
  }
);

export const getProductDetail = createAsyncThunk(
  "products/getProductDetail",
  async (pid) => {
    const { data } = await axiosInstance.get(`/VC1/products/${pid}`);
    return data;
  }
);

export const getAllProductAdmin = createAsyncThunk(
  "products/admin/all",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/VC1/admin/products/getall`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "products/admin/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/VC1/admin/products/${id}`);
      return data.success;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Get All Reviews of a Product
export const getAllReviews = createAsyncThunk(
  "products/admin/allreview",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/VC1/reviews/${id}`);
      return data.reviews;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Delete Review of a Product
export const deleteReviews = createAsyncThunk(
  "products/admin/deleteReview",
  async ({id,reviewId}, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/VC1/reviews/${id}?revId=${reviewId}`);
      return data.success;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
//clearing error
export const clearError = createAsyncThunk("products/clearError", async () => {
  return null;
});

export const reset = createAsyncThunk("reset/product", async () => {
  return null;
});
export const stateEmpty = createAsyncThunk("empty/product", async () => {
  return null;
});