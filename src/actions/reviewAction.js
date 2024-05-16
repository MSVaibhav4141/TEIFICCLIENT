import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const checkEligibiltyForReview = createAsyncThunk(
  "review/isEligible/review",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/VC1/review/eligible/${id}`);

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// new Review
export const newReview = createAsyncThunk(
  "review/new/",
  async (reviewData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.put(`/VC1/review/`, reviewData, config);

      return data.success;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Get all review
export const allReviewForProduct = createAsyncThunk(
  "review/all/",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/VC1/reviews/${id}`);

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Delete Review
export const deleteReview = createAsyncThunk(
  "review/delete/",
  async ({ id, reviewId }, { rejectWithValue }) => {
    try {
      const params = { revId: reviewId };
      const { data } = await axios.delete(`/VC1/reviews/${id}`, {params});
      return data.success;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

//clearing error
export const clearError = createAsyncThunk("products/clearError", async () => {
  return null;
});
export const reset = createAsyncThunk("reset/review", async () => {
  return null;
});
