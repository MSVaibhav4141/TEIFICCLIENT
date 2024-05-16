import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loder from "../Loader/Loder";
import { Link, useNavigate } from "react-router-dom";
import WidgetsIcon from "@mui/icons-material/Widgets";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FaceIcon from "@mui/icons-material/Face";
import SkateboardingIcon from "@mui/icons-material/Skateboarding";
import SecurityIcon from "@mui/icons-material/Security";
import { toast } from "react-toastify"; 
import "./profile.css";
import { logoutUser } from "../../../actions/userAction";
const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
    toast.info("Logout Successfully");
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <div className="_profile">
          <div className="_right-profile-section">
            <div className="_greetings">
              <div className="_img-greeting">
                <img src={user.user.avatar.public_URI} alt={user.user.name} />
              </div>
              <div className="_user-info-profile">
                <div className="_user-name-profile">
                  Hello <strong>{user.user.name}</strong>
                </div>
                <div className="_user-mobile-profile">{user.user.email}</div>
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
              <Link to="/orders">
                <WidgetsIcon className="_profile-section-icons" />
                <div className="_users-order">My Orders</div>{" "}
              </Link>
              <Link to="/access" onClick={() => logout()}>
                <LogoutIcon className="_profile-section-icons" />
                <div className="_users-profile-logout">Logout</div>{" "}
              </Link>
            </div>
          </div>
          <div className="_left-profile-section">
            <div className="_profile-img">
              <img src={user.user.avatar.public_URI} alt={user.user.name} />
              <Link to="/user/update">
                <EditIcon className="_profile-section-icons-mobile" />
              </Link>
            </div>
            <div className="_profile-info">
              <div>
                <h4>
                  <FaceIcon className="_profile-section-icons" />
                  <span>Name</span>
                </h4>
                <p>{user.user.name}</p>
                <h4>
                  <EmailIcon className="_profile-section-icons" />
                  <span>Email</span>
                </h4>
                <p>{user.user.email}</p>
                <h4>
                  <LocalPhoneIcon className="_profile-section-icons" />
                  <span>Mobile No.</span>
                </h4>
                <p>{user.user.mobileNumber}</p>
                <h4>
                  <SkateboardingIcon className="_profile-section-icons" />
                  <span>Boarding Date</span>
                </h4>
                <p>{user.user.createdAt.substr(0, 10)}</p>
                <Link to="/user/update">
                  <div className="_hide-edit">
                    <EditIcon className="_profile-section-icons " />
                    Edit Profile
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
