// const cartSlice = createSlice({
//     name: "carti",
//     initialState: {
//       cartItems: [],
//       status: "idle",
//       error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//       builder.addCase(cartItem.fulfilled, (state, action) => {
//         state.cartItems.push(action.payload); // Update state with new cart item
//         localStorage.setItem("cartItemn", "KKK"); // Update local storage
//       });
//     },
//   });

//   export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { cartItem } from "./cartAction";

const userSlice = createSlice({
  name: "user",
  initialState: {
    cartItems: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cartItem.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
    
      })
  },
});

export default userSlice.reducer;