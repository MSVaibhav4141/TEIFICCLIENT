import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactComponent as Search } from "../../../Utility/icons/search.svg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
// import { store } from "../../../store";
import "./navbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { loadUser } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import SpeedDial from "./speedDial.jsx";
gsap.registerPlugin(ScrollTrigger);

function Navbar(props) {
  // Function for searching the product
  //
  //

  const navigate = useNavigate();
  const productSearch = (e, keyword) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/shop/${keyword}`);
    } else {
      navigate(`/shop`);
    }
  };
  //
  //
  const { cartItem } = useSelector((state) => state.cart);
  const isHomepage = useLocation().pathname === "/";
  const [position, updatePostion] = useState({
    position: "fixed",
    width: "100%",
  });

  const [style, updateStyle] = useState({
    width: "90%",
  });
  const [navColor, updateNavColor] = useState({ color: "rgb(209, 209, 209)" });
  const [keyword, updateKeyword] = useState("");
  const [seacrBoxBackground, updateSearchBoxBackground] = useState({
    backgroundColor: "transparent",
    borderBottom: "1px solid rgb(209, 209, 209)",
  });
  const [inputBoxBackground, updateInputBoxBackground] = useState({
    backgroundColor: "transparent",
    borderBottom: "1px solid rgb(209, 209, 209)",
  });
  const nav_bar = useRef();
  let viewportHeight = window.innerHeight;
  let startValue = window.innerHeight * 3.7;
  let endValue = window.innerHeight * 4.7;
  const { user, isAuthenticated } = useSelector((state) => state.user);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (isHomepage) {
        updateInputBoxBackground({
          backgroundColor: "transparent",
          border: "1px solid rgb(209, 209, 209)",
        });
        updateSearchBoxBackground({
          backgroundColor: "transparent",
          borderBottom: "1px solid rgb(209, 209, 209)",
        });
        updateNavColor({ color: "rgb(209, 209, 209)" });
        updatePostion({
          position: "fixed",
        });
        updateStyle({
          width: "90%",
        });
        let tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: nav_bar.current,
            start: `${viewportHeight} 50%`,
            end: `${viewportHeight * 1.3} 50%`,
            scrub: 2,
          },
        });
        tl1.from(nav_bar.current, {
          y: `-${viewportHeight / 3} % `,
        });

        let tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: nav_bar.current,
            start: `${startValue} 50%`,
            end: `${endValue} 50%`,
            scrub: 2,
          },
        });

        tl2.to(nav_bar.current, {
          y: `-${viewportHeight / 3} % `,
        });
      } else {
        updateNavColor({ color: "rgba(0, 0, 0, 0.75)" });
        updateSearchBoxBackground({
          backgroundColor: "#b8f2f1",
          borderBottom: "0px solid rgb(209, 209, 209)",
          color: "black",
        });
        updateInputBoxBackground({
          backgroundColor: "white",
          border: "0px",
        });
        updatePostion({
          position: "static",
          maxWidth: "100vw",
          width: "auto",
        });
        updateStyle({
          backgroundColor: "#B8F2F1",
          width: "100%",
        });
      }
    }, nav_bar);

    return () => ctx.revert();
  }, [viewportHeight, isHomepage, startValue, endValue]);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const actions = [
    { icon: <FileCopyIcon />, name: "Account" },
    { icon: <FileCopyIcon />, name: "Orders" },
    { icon: <SaveIcon />, name: "Logout" },
  ];
  if (1) {
    actions.unshift({ icon: <FileCopyIcon />, name: "Dashboard" });
  }
  useEffect(() => {
    dispatch(loadUser());
    setLoading(false);
  }, [dispatch]);

  return (
    <>
      <div className="_navbar" style={position} ref={nav_bar}>
        <div className="_navbar-content" style={style}>
          <Link to="/" className="links" style={navColor}>
            <div className="_navbar-right">
              Te<span>i</span>fic
            </div>
          </Link>
          <div className="_navbar-left">
            <ul>
              <li className="_search-bar" style={seacrBoxBackground}>
                <form onSubmit={(e) => productSearch(e, keyword)}>
                  <input
                    type="text"
                    style={inputBoxBackground}
                    placeholder="Search for products"
                    onChange={(e) => updateKeyword(e.target.value)}
                  />
                  <button type="submit">
                    <Search />
                  </button>
                </form>
              </li>
              <Link to="/shop" className="links" style={navColor}>
                <li>
                  <StoreIcon />
                </li>
              </Link>
              <Link
                to="/cart"
                className="links _cart-item-count"
                style={navColor}
              >
                <li>
                  {cartItem.length > 0 ? <div>{cartItem.length}</div> : ""}

                  <ShoppingCartIcon />
                </li>
              </Link>

              {loading ? (
                <>loading</>
              ) : isAuthenticated ? (
                <li className="_user-account">
                  <SpeedDial user={user} />{" "}
                </li>
              ) : (
                <Link to="/access" className="links">
                  <li className="_user-account">
                    <AccountCircleIcon className="_user-account-o" />
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
      {/* <div className="_mobile-view">
        <ul>
          <Link to="/shop" className="links" style={navColor}>
            <li>SHOP</li> 
          </Link>
          <Link to="diyFabricate" className="links" style={navColor}>
            <li>FABRICATE</li>
          </Link>
          <Link to="profile" className="links" style={navColor}>
            <li>
              <User className="user_navbar" />
            </li>
          </Link>
        </ul>
      </div> */}
    </>
  );
}

export default Navbar;
