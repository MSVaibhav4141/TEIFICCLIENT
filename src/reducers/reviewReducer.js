import { createReducer } from "@reduxjs/toolkit";

import {
  allReviewForProduct,
  checkEligibiltyForReview,
  clearError,
  deleteReview,
  newReview,
  reset,
} from "../actions/reviewAction";

const initialState = {};

export const checkEligibilty = createReducer(initialState, (builder) => {
  builder
    .addCase(checkEligibiltyForReview.pending, (state, action) => {
      return {
        loading: true,
      };
    })
    .addCase(checkEligibiltyForReview.fulfilled, (state, action) => {
      return {
        loading: false,
        isEligible: action.payload.isEligible,
        userSigned:action.payload.userSigned
      };
    })

    .addCase(clearError.fulfilled, (state, action) => {
      state.error = null;
    });
});
export const newReviewReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(newReview.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(newReview.fulfilled, (state, action) => {
      return {
        loading: false,
        success: action.payload,
      };
    })
    .addCase(newReview.rejected, (state, action) => {
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
      state.error = null;
    });
});

// get all reviews

export const getAllReview = createReducer(initialState, (builder) => {
  builder
    .addCase(allReviewForProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(allReviewForProduct.fulfilled, (state, action) => {
      return {
        loading: false,
        review: action.payload.reviews,
        ratingsOfProduct: action.payload.ratingsOfProduct,
        numberOfReviewsOfProduct:action.payload.numberOfReviewsOfProduct,
        numberOfRatingsOfProduct:action.payload.numberOfRatingsOfProduct
      };
    })
    .addCase(allReviewForProduct.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })

    .addCase(clearError.fulfilled, (state, action) => {
      state.error = null;
    });
});

//Delete review 
export const deleteReviewReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteReview.pending, (state, action) => {
      return {
        loading: true,
      };
    })
    .addCase(deleteReview.fulfilled, (state, action) => {
      return {
        loading: false,
        success: action.payload
      };
    })
    .addCase(deleteReview.rejected, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
        return {
          success: false,
        };
      })
    .addCase(clearError.fulfilled, (state, action) => {
      state.error = null;
    });
});
