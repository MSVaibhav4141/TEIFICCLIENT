import { configureStore } from "@reduxjs/toolkit";
import {
  editProductReducer,
  newProductReducer,
  productChangeReducer,
  productDetailReducer,
  productReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducer";
import { allUsersReducer, cartItemReducer, deleteUserReducer, updateRoleReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import {
  forgeteUserReducer,
  updateUserReducer,
} from "./reducers/updateUserReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersAdmin, getDeliveryDetailReducer, myOrderReducer, newOrderReducer, orderDetailsReducer, orderReducerDelete, orderReducerUpdate } from "./reducers/orderReducer";
import { checkEligibilty, deleteReviewReducer, getAllReview, newReviewReducer } from "./reducers/reviewReducer";
import { newPayment } from "./reducers/paymentReducer";

export const store = configureStore({
  reducer: {
    products: productReducer,
    productDetail: productDetailReducer,
    user: userReducer,
    profile: updateUserReducer,
    forgotPassword: forgeteUserReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrder: myOrderReducer,
    orderDetails: orderDetailsReducer,
    eligible:checkEligibilty,
    newReview:newReviewReducer,
    getAllReviews:getAllReview,
    deleteReviews:deleteReviewReducer,
    paymentReducer : newPayment,
    newAdminProduct : newProductReducer,
    productManager : productChangeReducer,
    editProductRed : editProductReducer,
    allOrders: allOrdersAdmin,
    updateOrder:orderReducerUpdate,
    deleteOrder:orderReducerDelete,
    allUsers:allUsersReducer,
    getUserAdmin:userDetailsReducer,
    updateReducer:updateRoleReducer,
    deleteUser: deleteUserReducer,
    cartItem:cartItemReducer,
    productReview:productReviewsReducer,
    deleteProductReview:reviewReducer,
    deliveryDeatils:getDeliveryDetailReducer
  },
});
