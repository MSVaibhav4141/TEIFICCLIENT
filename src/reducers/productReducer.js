import { createReducer } from "@reduxjs/toolkit";
import { CLEAR_ERRORS } from "../constants/productConstants";

import {
  clearError,
  createNewProduct,
  deleteProduct,
  deleteReviews,
  editProduct,
  getAllProductAdmin,
  getAllReviews,
  getProductDetail,
  getProducts,
  reset,
  stateEmpty,
} from "../actions/productAction";

const initialState = {
  products: [],
};

const productDetail = {
  product: [],
};

// All product depending upon productCount
export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getProducts.pending, (state, action) => {
      state.loading = true;
      state.products = [];
    })
    .addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productCount;
      state.contentPerPage = action.payload.contentPerPage;
      state.totalCategories = action.payload.totalCategories;
    })
    .addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(getAllProductAdmin.pending, (state, action) => {
      state.loading = true;
      state.productsAdmin = [];
    })
    .addCase(getAllProductAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.productsAdmin = action.payload.products;
    })
    .addCase(getAllProductAdmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(clearError.fulfilled, (state, action) => {
      state.error = null;
    });
});

//Single product Detail
export const productDetailReducer = createReducer(productDetail, (builder) => {
  builder
    .addCase(getProductDetail.pending, (state, action) => {
      state.loading = true;
      state.product = [];
    })
    .addCase(getProductDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
    })
    .addCase(getProductDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS, (state, action) => {
      state.error = null;
    })
    .addCase(stateEmpty.fulfilled, (state, action) => {
     state.product = {}
    })
});

// Create new Product
const initialStates = {};
export const newProductReducer = createReducer(initialStates, (builder) => {
  builder
    .addCase(createNewProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(createNewProduct.fulfilled, (state, action) => {
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    })
    .addCase(createNewProduct.rejected, (state, action) => {
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
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: false,
      };
    });
});

// Delete Product
export const productChangeReducer = createReducer(initialStates, (builder) => {
  builder
    .addCase(deleteProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    })
    .addCase(deleteProduct.rejected, (state, action) => {
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
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        isDeleted: false,
      };
    });
});

// edit product
const initialState1 = {};
export const editProductReducer = createReducer(initialState1, (builder) => {
  builder
    .addCase(editProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(editProduct.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    })
    .addCase(editProduct.rejected, (state, action) => {
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
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        isUpdated: false,
        reload: true,
      };
    })
  
});
export const productReviewsReducer = createReducer(initialState1, (builder) => {
  builder
    .addCase(getAllReviews.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getAllReviews.fulfilled, (state, action) => {
      return {
        loading: false,
        reviews: action.payload,
      };
    })
    .addCase(getAllReviews.rejected, (state, action) => {
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

  
});
export const reviewReducer = createReducer(initialState1, (builder) => {
  builder
    .addCase(deleteReviews.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(deleteReviews.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    })
    .addCase(deleteReviews.rejected, (state, action) => {
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
    })

  
});

// export const productChangeReducer = (initialStates, action) => {
//   switch (action.type) {
//     case DELETE_PRODUCT_REQUEST:
//     case UPDATE_PRODUCT_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case DELETE_PRODUCT_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isDeleted: action.payload,
//       };

//     case UPDATE_PRODUCT_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isUpdated: action.payload,
//       };
//     case DELETE_PRODUCT_FAIL:
//     case UPDATE_PRODUCT_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     case DELETE_PRODUCT_RESET:
//       return {
//         ...state,
//         isDeleted: false,
//       };
//     case UPDATE_PRODUCT_RESET:
//       return {
//         ...state,
//         isUpdated: false,
//       };
//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };
