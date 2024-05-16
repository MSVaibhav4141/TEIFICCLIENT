import { createReducer } from "@reduxjs/toolkit";

import { clearError } from "../actions/userAction";
import {
  forgetUserPassword,
  resetUserPassword,
  updateProfile,
  updateProfileReset,
  updateUserPassword,
} from "../actions/updateUserAction";
const state = {
  user: {},
};

export const updateUserReducer = createReducer(state, (builder) => {
  builder
    // update user
    .addCase(updateProfile.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(updateProfile.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        isUpdated: action.payload,
      };
    })
    .addCase(updateProfile.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(updateProfileReset.fulfilled, (state, action) => {
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
    })
    // change user password
    .addCase(updateUserPassword.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(updateUserPassword.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        isUpdated: action.payload,
      };
    })
    .addCase(updateUserPassword.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    });
});

export const forgeteUserReducer = createReducer(state, (builder) => {
  builder

    // change user password
    .addCase(forgetUserPassword.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    })
    .addCase(forgetUserPassword.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        message: action.payload,
      };
    })
    .addCase(forgetUserPassword.rejected, (state, action) => {
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
    })

    // Reset Password
    .addCase(resetUserPassword.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    })
    .addCase(resetUserPassword.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        success: action.payload,
      };
    })
    .addCase(resetUserPassword.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    });
});
