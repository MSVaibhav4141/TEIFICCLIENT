import React, { useEffect, useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import {
  forgetUserPassword,
  clearError,
} from "../../../actions/updateUserAction";
import { useSelector, useDispatch } from "react-redux";
import Loder from "../Loader/Loder";
import { toast } from "react-toastify";
import "./forgotPassword.css";
import MetaData from "../MetaData";
const ForgotPassword = () => {
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const forgetPasswordSubmit = (e) => {
    e.preventDefault();
    const userData = new FormData();

    userData.set("email", email);
    dispatch(forgetUserPassword(userData));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);
  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <>
          <MetaData title="Forgot Password" />
          <div className="_forget-password-container">
            <div className="_navbar-right">
              Te<span>i</span>fic
            </div>
            <div className="_form-container-forgot-password">
              <form
                className="_forget-password-form"
                onSubmit={forgetPasswordSubmit}
              >
                <div className="_forget-password">
                  <MailIcon className="_form-icon" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
