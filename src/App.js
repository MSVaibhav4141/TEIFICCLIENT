import Navbar from "./Component/Layout/Navbar/Navbar.jsx";
import "./Utility/font/font.css";
import Home from "./Component/Layout/Growing/Home.jsx";
import Footer from "./Component/Layout/Footer/Footer.jsx";
import Shop from "./Component/Layout/Shop/Shop.jsx";
import ProductDetail from "./Component/Layout/Product/Product.jsx";
import Profile from "./Component/Layout/Profile/Profile.jsx";
import MetaData from "./Component/Layout/MetaData.js";
import { Routes, Route } from "react-router-dom";
import LoginSignup from "./Component/Layout/LoginSignup/LoginSignUp.jsx";
import UpdateProfile from "./Component/Layout/UpdateProfile/UpdateProfile.jsx";
import UpdatePassword from "./Component/Layout/UpdatePassword/UpdatePassword.jsx";
import ForgotPassword from "./Component/Layout/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./Component/Layout/ResetPassword/ResetPassword.jsx";
import ConfirmOrder from "./Component/Layout/ConfirmOrder/ConfirmOrder.jsx";
import MyOrders from "./Component/Layout/MyOrders/MyOrders.jsx";
import OrderDetail from "./Component/Layout/OrderDetail/OrderDetail.jsx";
import Shipping from "./Component/Layout/Shipping/Shipping.jsx";
import NotFound from "./Component/Layout/NotFound/NotFound.jsx";
import Cart from "./Component/Layout/Cart/Cart.jsx";
import Admin from "./Component/Layout/Admin/Admin.jsx";
import CreateProduct from "./Component/Layout/CreateProduct/CreateProduct.jsx";
import EditProduct from "./Component/Layout/EditProduct/EditProduct.jsx";
import AdminProduct from "./Component/Layout/AdminProduct/AdminProduct.jsx";
import AllORders from "./Component/Layout/AllORders/AllORders.jsx";
import AllUsers from "./Component/Layout/AllUsers/AllUsers.jsx";
import UpdateOrder from "./Component/Layout/UpdateOrder/UpdateOrder.jsx";
import UserDetail from "./Component/Layout/UserDetail/UserDetail.jsx";
import PaymentSuccess from "./Component/Layout/PaymentSuccess/PaymentSuccess.jsx";
import UsersReview from "./Component/Layout/UsersReview/UsersReview.jsx";
import { store } from "./store.js";
import { useEffect } from "react";
import { loadUser } from "./actions/userAction.js";
import PrivateRoute from "./Component/Route/PrivateRoute.jsx";

import "./App.css";
function App() {
  // useEffect(() => {
  //     Webfront.load({
  //       custom: {
  //         families: ["Estedad"],
  //         urls: ["./utility/Font/font.css"],
  //       },
  //       google: {
  //         families: [
  //           "Gothic A1:100,200,300,400,500,600,700,800,900",
  //           "Almarai: 300, 400, 700, 800",
  //         ],
  //       },
  //     });
  //   }, []);
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <div className=".App">
      <MetaData title="Teific" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="/shop/:keyword" element={<Shop />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/access" element={<LoginSignup />} />
        <Route path="/cart" element={<Cart />} />

        <Route element={<PrivateRoute isAdmin={true} />}>
          <Route path="/admin/dashboard" element={<Admin />} />
          <Route path="/admin/products/all" element={<AdminProduct />} />
          <Route path="/admin/product/new/create" element={<CreateProduct />} />
          <Route path="/admin/product/edit/:id" element={<EditProduct />} />
          <Route path="/admin/orders/all" element={<AllORders />} />
          <Route path="/admin/orders/edit/:id" element={<UpdateOrder />} />
          <Route path="/admin/users/all" element={<AllUsers />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/admin/reviews" element={<UsersReview />} />
          <Route path="/admin/reviews" element={<UsersReview />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/account" element={<Profile />} />
          <Route
            path="/payment/success"
            element={
              <PaymentSuccess
                amountPaid="$100"
                buyerName="John Doe"
              />
            }
          />
          <Route path="/user/update" element={<UpdateProfile />} />
          <Route path="/user/privacy" element={<UpdatePassword />} />
          <Route path="/shipping" element={<Shipping />} />

          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
        </Route>
        <Route path="/password/reset" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/default/request/unknown" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
