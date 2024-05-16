import { createReducer } from "@reduxjs/toolkit";
import { CLEAR_ERRORS } from "../constants/productConstants";

import {
  clearError,
  createOrder,
  deleteOrder,
  getAllOrders,
  getDeliveryDetail,
  getOrderDetail,
  myOrder,
  reset,
  updateOrder,
} from "../actions/orderAction";

const initialState = {};

// Add new order
export const newOrderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createOrder.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      return {
        order: action.payload,
        loading: false,
      };
    })
    .addCase(createOrder.rejected, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    })
    .addCase(CLEAR_ERRORS, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

// view your order
export const myOrderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(myOrder.pending, (state, action) => {
      return {
        loading: true,
      };
    })
    .addCase(myOrder.fulfilled, (state, action) => {
      return {
        orders: action.payload,
        loading: false,
      };
    })
    .addCase(myOrder.rejected, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

// view all order (admin)
export const allOrdersAdmin = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllOrders.pending, (state, action) => {
      return {
        loading: true,
      };
    })
    .addCase(getAllOrders.fulfilled, (state, action) => {
      return {
        loading: false,
        orders: action.payload,
      };
    })
    .addCase(getAllOrders.rejected, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

// update order (admin)
export const orderReducerUpdate = createReducer(initialState, (builder) => {
  builder
    .addCase(updateOrder.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(updateOrder.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    })
    .addCase(updateOrder.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        isUpdated: false,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

// delete order (admin)
export const orderReducerDelete = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteOrder.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(deleteOrder.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    })
    .addCase(deleteOrder.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        isDeleted: false,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});


export const orderDetailsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getOrderDetail.pending, (state, action) => {
      return {
        loading: true,
      };
    })
    .addCase(getOrderDetail.fulfilled, (state, action) => {
      return {
        orderDetail: action.payload,
        loading: false,
      };
    })
    .addCase(getOrderDetail.rejected, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

export const getDeliveryDetailReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getDeliveryDetail.pending, (state, action) => {
      return {
        loading: true,
      };
    })
    .addCase(getDeliveryDetail.fulfilled, (state, action) => {
      return {
        deliveryDetail: action.payload.details,
        success:action.payload.success,
        loading: false,
      };
    })
    .addCase(getDeliveryDetail.rejected, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
