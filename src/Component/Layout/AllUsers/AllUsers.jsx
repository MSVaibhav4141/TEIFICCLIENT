import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import {Button} from "@mui/material";
import Sidebar from "../Admin/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Loder from "../Loader/Loder";
import MetaData from "../MetaData";
import {
  clearError,
  reset,
  getAllUsers,
  deleteUser,
} from "../../../actions/userAction";
import "./Alluser.css";
import PopUpLoader from "../Loader/PopUpLoader";
const AllUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    error,
    users,
    userSigned
  } = useSelector((state) => state.allUsers);
  const {
    loading: deleteLoader,
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.deleteUser);
  const [isOpen, setIsOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [indexEle, setIndex] = useState(0);
  const [signedUser, setSignedUser] = useState([]);
  const [otherUSer, setOtherUser] = useState([]);

  useEffect(() => {
    if (loading === false) {
      let userLogged = []
      let otherUsersArray = [];
      users.forEach((item) => {
        if (item._id === userSigned) {
          userLogged.push(item);
        } else {
          otherUsersArray.push(item);
        }
      });
      setSignedUser(userLogged)
      setOtherUser(otherUsersArray);
    }
  },[loading, users, userSigned])


  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (deleteError) {
      toast.error(deleteError.message);
      dispatch(clearError());
    }

    if (isDeleted) {
      toast.success(message);
      dispatch(reset());
    }
    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted, navigate,message]);


  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setCurrentX(e.touches[0].clientX);
  };

  const deleteUserHandeler = (id, i) => {
    setIndex(i);
    dispatch(deleteUser(id));
  };

  const handleTouchEnd = () => {
    const deltaX = currentX - startX;
    if (deltaX > 70) {
      // Adjust threshold as needed
      setIsOpen(true);
    } else if (deltaX < -60) {
      // Adjust threshold as needed
      setIsOpen(false);
    }
  };

  
  return (
    <>
      {loading !== false ? (
        <Loder />
      ) : (
        <>
          <MetaData title="All Products" />
          <div
            className="_all-products-admin"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Sidebar isShown={isOpen} />
            <div className="_admin-products-list">
              {loading === false &&
                signedUser.map((item, index) => (
                  <div className="_admin-panel-product" key={"u" + index}>
                    <div className="_admin-panel-product-id">
                      UserID:{item._id}
                    </div>
                    <div className="_admin-panel-product-details">
                      <div className="_ap-product-image user-img">
                        <img
                          src={item.avatar.public_URI}
                          alt={item.name}
                          key={index}
                        />
                      </div>

                      <div className="_ap-product-detail">
                        <Link to={`/user/${item._id}`}>
                          <p>{item.name}</p>{" "}
                        </Link>
                        <p
                          style={
                            item.role === "admin"
                              ? { color: "green" }
                              : { color: "crimson" }
                          }
                        >
                          Role: {item.role.toUpperCase()}
                        </p>
                        <p>Registered On:{item.createdAt.split("T")[0]}</p>
                        <div>
                          <Button
                            sx={{ backgroundColor: "#D8F5F6" }}
                            className="ap-order-button"
                            disabled={deleteLoader}
                            onClick={() => deleteUserHandeler(item._id, index)}
                          >
                            {deleteLoader && indexEle === index ? (
                              <PopUpLoader />
                            ) : (
                              ""
                            )}
                            <DeleteIcon
                              color="error"
                              sx={
                                deleteLoader && indexEle === index
                                  ? { display: "none" }
                                  : { display: "block" }
                              }
                            />
                          </Button>
                          <p>ME</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {loading === false &&
                otherUSer.map((item, index) => (
                  <div className="_admin-panel-product" key={"u" + index}>
                    <div className="_admin-panel-product-id">
                      UserID:{item._id}
                    </div>
                    <div className="_admin-panel-product-details">
                      <div className="_ap-product-image user-img">
                        <img
                          src={item.avatar.public_URI}
                          alt={item.name}
                          key={index}
                        />
                      </div>

                      <div className="_ap-product-detail">
                        <Link to={`/user/${item._id}`}>
                          <p>{item.name}</p>{" "}
                        </Link>
                        <p
                          style={
                            item.role === "admin"
                              ? { color: "green" }
                              : { color: "crimson" }
                          }
                        >
                          Role: {item.role.toUpperCase()}
                        </p>
                        <p>Registered On:{item.createdAt.split("T")[0]}</p>
                        <div>
                          
                          <Button
                            sx={{ backgroundColor: "#D8F5F6" }}
                            className="ap-order-button"
                            disabled={deleteLoader}
                            onClick={() => deleteUserHandeler(item._id, index)}
                          >
                            {deleteLoader && indexEle === index ? (
                              <PopUpLoader />
                            ) : (
                              ""
                            )}
                            <DeleteIcon
                              color="error"
                              sx={
                                deleteLoader && indexEle === index
                                  ? { display: "none" }
                                  : { display: "block" }
                              }
                            />
                          </Button>
                        </div>
                    
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllUsers;
