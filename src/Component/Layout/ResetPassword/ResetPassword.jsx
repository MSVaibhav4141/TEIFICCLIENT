import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { clearError } from "../../../actions/userAction";
import { resetUserPassword } from "../../../actions/updateUserAction";
import { useSelector, useDispatch } from "react-redux";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Loder from "../Loader/Loder";
import { toast } from "react-toastify";
import "./resetPassword.css";
import MetaData from "../MetaData";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //Functions

  const udpateProfileSubmit = (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.set("password", newPassword);
    userData.set("confirmPassword", confirmPassword);
    dispatch(resetUserPassword({ token, userData }));
  };

  //Hooks used
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (success) {
      toast.info("Password Updated Successfully");
      navigate("/access");
    }
  }, [dispatch, error, success, navigate]);
  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <>
          <MetaData title="Forgot Password" />
          <div className="_left-profile-section-password">
            <div className="_login-signup-container">
              <div className="_form-container-reset-password">
                <form className="_signup-form" onSubmit={udpateProfileSubmit}>
                  <div className="_reset-password">
                    <LockOpenIcon className="_form-icon" />
                    <input
                      type="password"
                      name="password"
                      required
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="_reset-password">
                    <LockOutlinedIcon className="_form-icon" />
                    <input
                      type="password"
                      name="password"
                      required
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <button type="submit-reset">Change Password</button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
