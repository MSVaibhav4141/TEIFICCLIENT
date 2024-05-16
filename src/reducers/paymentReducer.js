import { createReducer } from "@reduxjs/toolkit";
import { clearError, paymentInitator, reset } from "../actions/paymentAction";
const initialState = {};

export const newPayment = createReducer(initialState, (builder) => {
  builder
    .addCase(paymentInitator.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(paymentInitator.fulfilled, (state, action) => {
      return {
        order: action.payload.order,
        success:action.payload.success,
        loading: false,
      };
    })
    .addCase(paymentInitator.rejected, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        order:null,
        success: false,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
