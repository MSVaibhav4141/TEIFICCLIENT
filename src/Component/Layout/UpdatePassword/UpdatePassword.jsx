import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WidgetsIcon from "@mui/icons-material/Widgets";
import LogoutIcon from "@mui/icons-material/Logout";
import { clearError, loadUser } from "../../../actions/userAction";
import {
  updateUserPassword,
  updateProfileReset,
} from "../../../actions/updateUserAction";
import { useSelector, useDispatch } from "react-redux";
import PasswordIcon from "@mui/icons-material/Password";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Loder from "../Loader/Loder";
import { toast } from "react-toastify";
import SecurityIcon from "@mui/icons-material/Security";
import "./updatePassword.css";
import MetaData from "../MetaData";

const UpdatePassword = () => {
  const { user } = useSelector((state) => state.user.user);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const signUpForm = useRef();
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //Functions

  const udpateProfileSubmit = (e) => {
    e.preventDefault();
    const userData = new FormData();

    userData.set("oldPassword", oldPassword);
    userData.set("newPassword", newPassword);
    userData.set("confirmPassword", confirmPassword);
    // const serializedData = {};
    // userData.forEach((value, key) => {
    //   serializedData[key] = value;
    // });
    dispatch(updateUserPassword(userData));
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
    if (isUpdated) {
      toast.info("Password Updated Successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch(updateProfileReset());
    }
  }, [dispatch, error, isUpdated, navigate]);
  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <>
          <MetaData title="Update Password" />
          <div className="_profile">
            <div className="_right-profile-section">
              <div className="_greetings">
                <div className="_img-greeting">
                  <img src={user.avatar.public_URI} alt={user.name} />
                </div>
                <div className="_user-info-profile">
                  <div className="_user-name-profile">
                    Hello <strong>{user.name}</strong>
                  </div>
                  <div className="_user-mobile-profile">{user.email}</div>
                </div>
              </div>
              <div className="_user-profile-actions">
                <Link to="/account">
                  <SecurityIcon className="_profile-section-icons" />
                  <div className="_login-security">Account</div>
                </Link>
                <Link to="/user/privacy">
                  <SecurityIcon className="_profile-section-icons" />
                  <div className="_login-security">Login & Security</div>
                </Link>
                <Link to="/sec">
                  <WidgetsIcon className="_profile-section-icons" />
                  <div className="_users-order">My Orders</div>{" "}
                </Link>
                <Link to="/sec">
                  <LogoutIcon className="_profile-section-icons" />
                  <div className="_users-profile-logout">Logout</div>{" "}
                </Link>
              </div>
            </div>
            <div className="_left-profile-section-password">
              <div className="_update-profile-container">
                <div className="_form-container">
                  <form
                    className="_password-update"
                    ref={signUpForm}
                    onSubmit={udpateProfileSubmit}
                  >
                    <div className="_update-password">
                      <PasswordIcon className="_form-icon" />
                      <input
                        type="password"
                        name="password"
                        required
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <div className="_update-password">
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
                    <div className="_update-password">
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

                    <button type="submit">Update Password</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;
