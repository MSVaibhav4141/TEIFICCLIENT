import { createReducer } from "@reduxjs/toolkit";

import {
  addItemToCart,
  clearError,
  deleteUser,
  getAllUsers,
  getCartItem,
  getUserDetails,
  loadUser,
  loginUser,
  logoutUser,
  reset,
  signUpUser,
  updateUser,
} from "../actions/userAction";
import { serializeError } from "serialize-error";
const state = {
  user: {},
};

const initalState = {}
export const allUsersReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(getAllUsers.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        userSigned:action.payload.userSigned
      };
    })
    .addCase(getAllUsers.rejected, (state, action) => {
      return {
        ...state,
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
export const cartItemReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(addItemToCart.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(addItemToCart.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };
    })
    .addCase(addItemToCart.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })

  // get Cart Item 
    .addCase(getCartItem.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getCartItem.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        cart: action.payload.cart,
      };
    })
    .addCase(getCartItem.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
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

export const userDetailsReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(getUserDetails.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getUserDetails.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    })
    .addCase(getUserDetails.rejected, (state, action) => {
      return {
        ...state,
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

export const updateRoleReducer = createReducer(initalState, (builder) => {
  builder
    .addCase(updateUser.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    })
    .addCase(updateUser.rejected, (state, action) => {
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
export const deleteUserReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(deleteUser.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.sucess,
        message: action.payload.message,
      };
    })
    .addCase(deleteUser.rejected, (state, action) => {
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

export const userReducer = createReducer(state, (builder) => {
  builder
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    })

    // login
    .addCase(loginUser.pending, (state, action) => {
      return {
        loading: true,
        isAuthenticated: false,
      };
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    })
    .addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload.message,
      };
    })

    // signup

    .addCase(signUpUser.pending, (state, action) => {
      return {
        loading: true,
        isAuthenticated: false,
      };
    })
    .addCase(signUpUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    })
    .addCase(signUpUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload.message,
      };
    })
    // LOAD USER

    .addCase(loadUser.pending, (state, action) => {
      return {
        loading: true,
        isAuthenticated: false,
      };
    })
    .addCase(loadUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    })
    .addCase(loadUser.rejected, (state, action) => {
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    })

    // LOGOUT USER
    .addCase(logoutUser.fulfilled, (state, action) => {
      return {
        loading: false,
        user: action.payload,
        isAuthenticated: false,
      };
    })
    .addCase(logoutUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: serializeError(action.payload),
      };
    });
});
