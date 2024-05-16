import React, { useState, useRef, useEffect } from "react";
import "./LoginSignup.css"; // Make sure to create a CSS file for styling
import MailIcon from "@mui/icons-material/Mail";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, clearError, signUpUser } from "../../../actions/userAction";
import FaceIcon from "@mui/icons-material/Face";
import PhoneIcon from "@mui/icons-material/Phone";
import PasswordIcon from "@mui/icons-material/Password";
import Loder from "../Loader/Loder";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
const LoginSignup = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
  });
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/avatar.png");

  const { name, email, password, mobileNumber } = user;
  // setAvatarPreview()
  //Hooks Initialization
  const loginForm = useRef();
  const signUpForm = useRef();
  const login = useRef();
  const signup = useRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  //Functions
  const query = location.search;
  const redirect = query ? query.split("=")[1] : "account";
  const swapForm = (e) => {
    if (e === "login") {
      loginForm.current.classList.add("_swipe-form-right");
      signUpForm.current.classList.remove("_swipe-form-left");
      login.current.classList.add("_highlight-selection");
      signup.current.classList.remove("_highlight-selection");
    }
    if (e === "signup") {
      signUpForm.current.classList.add("_swipe-form-left");
      loginForm.current.classList.add("_swipe-form-left");
      loginForm.current.classList.remove("_swipe-form-right");
      login.current.classList.remove("_highlight-selection");
      signup.current.classList.add("_highlight-selection");
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ loginEmail, loginPassword }));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: [e.target.value] });
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const userData = new FormData();

    userData.set("name", name);
    userData.set("email", email);
    userData.set("password", password);
    userData.set("mobileNumber", mobileNumber);
    userData.set("avatar", avatar);

    const serializedData = {};
    userData.forEach((value, key) => {
      serializedData[key] = value;
    });
    dispatch(signUpUser(serializedData));
  };

  //Hooks used
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated) {
      navigate(`/${redirect}`);
    }
  }, [dispatch, error, isAuthenticated, navigate, redirect]);

  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <div className="_login-signup-container">
          <div className="_navbar-right">
            Te<span>i</span>fic
          </div>
          <div className="_form-container">
            <div className="_login-signup-selection">
              <div
                className="_login-select _highlight-selection "
                onClick={() => swapForm("login")}
                ref={login}
              >
                Login
              </div>
              <div
                className="_signup-select"
                onClick={() => swapForm("signup")}
                ref={signup}
              >
                Signup
              </div>
            </div>
            <div className="_login-signup-form">
              <form
                className="_login-form"
                ref={loginForm}
                onSubmit={loginSubmit}
              >
                <div className="_login-email">
                  <MailIcon className="_form-icon position" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={loginEmail}
                    placeholder="Email"
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="_login-password">
                  <PasswordIcon className="_form-icon" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={loginPassword}
                    placeholder="Password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/reset">Forget Password</Link>
                <button type="submit">Login</button>
              </form>
              <form
                className="_signup-form"
                ref={signUpForm}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="_signup-name">
                  <FaceIcon className="_form-icon" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="_signup-email">
                  <MailIcon className="_form-icon" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="_signup-phone">
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
                    onChange={registerDataChange}
                  />
                </div>
                <div className="_signup-password">
                  <PasswordIcon className="_form-icon" />
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="_user-avatar">
                  <img src={avatarPreview} alt="userAvatar" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/"
                    onChange={registerDataChange}
                  />
                </div>
                <button type="submit">SignUp</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignup;
