import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import Loder from "../Loader/Loder";
import "./userDetail.css";
import {
  clearError as clearOrderError,
  reset,
  getUserDetails,
  updateUser,
} from "../../../actions/userAction";

const UserDetail = () => {
  const { user, error, loading } = useSelector((state) => state.getUserAdmin);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.updateReducer
  );
  const { id } = useParams();
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const userData = new FormData();

    userData.set("role", role);

    dispatch(updateUser({ id, userData }));
  };

  const dispatch = useDispatch();

  const [role, setRole] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearOrderError());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearOrderError());
    }
    if (isUpdated) {
      toast.success("User Role Updated Successfully");
      dispatch(reset());
    }

    dispatch(getUserDetails(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  return (
    <>
      {loading === true ? (
        <Loder />
      ) : (
        <>
          <MetaData title="Update Order" />
          <div className="newProductContainer _order-container">
            <div className="confirmOrderPage">
              <div>
                <div className="confirmshippingArea">
                  <Typography>User's Information</Typography>
                  <div className="_user-pfpc">
                    {loading === false && (
                      <img src={user.avatar.public_URI} alt={user.name} />
                    )}
                  </div>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>
                        Name: <span>{loading === false && user.name}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        Phone:{" "}
                        <span>{loading === false && user.mobileNumber}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        Email:{" "}
                        <span>{loading === false && `${user.email}`}</span>
                      </p>
                    </div>
                  </div>

                  <Typography>User Role</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          loading === false && user.role === "admin"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {loading === false && user.role.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  {loading === false && user.productsOrdered.length === 0 ? (
                    <h3>User Haven't Bought Any Product Yet!</h3>
                  ) : (
                    <>
                      <Typography>User Ordered Items:</Typography>
                      <div className="confirmCartItemsContainer">
                        {loading === false &&
                          user.productsOrdered.map((item) => (
                            <div key={item.product}>
                              <img src={item.image} alt="Product" />
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>{" "}
                              <span>
                                {item.quant} X &#8377;
                                {Intl.NumberFormat("en-IN").format(
                                  item.price
                                )}{" "}
                                ={" "}
                                <b>
                                  &#8377;
                                  {Intl.NumberFormat("en-IN").format(
                                    item.price * item.quant
                                  )}
                                </b>
                              </span>
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div>
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Change Role</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setRole(e.target.value)}>
                      <option value="">Choose Role</option>
                      {loading === false && user.role === "admin" && (
                        <option value="user">User</option>
                      )}

                      {loading === false && user.role === "user" && (
                        <option value="admin">Admin</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || role === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserDetail;
