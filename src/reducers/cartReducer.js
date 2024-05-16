import { createReducer } from "@reduxjs/toolkit";
import { CLEAR_ERRORS } from "../constants/productConstants";
import { cartItem, cartItemRemove, saveShippingInfo } from "../actions/cartAction";

const initialState = {
  cartItem: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cartItem.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(cartItem.fulfilled, (state, action) => {
      state.loading = false;
      const item = action.payload;
      const isItemExist = state.cartItem.find(
        (i) => i.product === item.product
      );
      if (isItemExist) {
        state.cartItem = state.cartItem.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItem.push(item);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    })
    .addCase(cartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(cartItemRemove.fulfilled, (state, action) => {
      return {
        ...state,
        cartItem: state.cartItem.filter(
          (item) => item.product !== action.payload
        ),
      };
    })
    .addCase(saveShippingInfo.fulfilled, (state, action) => {
      return {
        ...state,
        shippingInfo: action.payload
      };
    })
    .addCase(CLEAR_ERRORS, (state, action) => {
      state.error = null;
    });
});

