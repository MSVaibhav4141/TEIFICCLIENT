import React, { useState, useRef, useEffect } from "react";
import "./UpdateProfile.css"; // Make sure to create a CSS file for styling
import MailIcon from "@mui/icons-material/Mail";
import { useSelector, useDispatch } from "react-redux";
import { clearError, loadUser } from "../../../actions/userAction";
import FaceIcon from "@mui/icons-material/Face";
import PhoneIcon from "@mui/icons-material/Phone";
import Loder from "../Loader/Loder";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MetaData from "../MetaData";
import {
  updateProfile,
  updateProfileReset,
} from "../../../actions/updateUserAction";
const LoginSignup = () => {
  // setAvatarPreview()
  //Hooks Initialization

  const signUpForm = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/avatar.png");

  //Functions

  const udpateProfileDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const udpateProfileSubmit = (e) => {
    e.preventDefault();
    const userData = new FormData();

    userData.set("name", name);
    userData.set("email", email);
    userData.set("mobileNumber", mobileNumber);
    userData.set("avatar", avatar);

    const serializedData = {};
    userData.forEach((value, key) => {
      serializedData[key] = value;
    });
    dispatch(updateProfile(serializedData));
  };

  //Hooks used
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar);
      setAvatarPreview(user.avatar.public_URI);
      setMobileNumber(user.mobileNumber);
    }
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.info("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch(updateProfileReset());
    }
  }, [dispatch, error, isUpdated, navigate, user]);
  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <>
          <MetaData title="Update Your Profile" />

          <div className="_update-profile-container">
            <div className="_navbar-right">
              Te<span>i</span>fic
            </div>
            <div className="_update-form-container">
              <form
                className="_update-profile-form"
                ref={signUpForm}
                encType="multipart/form-data"
                onSubmit={udpateProfileSubmit}
              >
                <div className="_update-name">
                  <FaceIcon className="_form-icon" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="_update-email">
                  <MailIcon className="_form-icon" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="_update-phone">
                  <PhoneIcon className="_form-icon" />
                  <input
                    type="text"
                    name="mobileNumber"
                    minLength={5}
                    maxLength={10}
                    required
                    placeholder="mobileNo"
                    value={mobileNumber}
                    disabled={mobileNumber.length > 10 ? true : false}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
                <div className="_update-user-avatar">
                  <img src={avatarPreview} alt="userAvatar" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/"
                    onChange={udpateProfileDataChange}
                  />
                </div>
                <button type="submit">Update Profile</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginSignup;
