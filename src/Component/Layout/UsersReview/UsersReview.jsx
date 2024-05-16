import React, { useEffect, useRef, useState } from "react";
import MetaData from "../MetaData";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { Button, Rating } from "@mui/material";
import Sidebar from "../Admin/Sidebar";
import "./productReviews.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  deleteReviews,
  getAllReviews,
  reset,
} from "../../../actions/productAction";
import { toast } from "react-toastify";
import PopUpLoader from "../Loader/PopUpLoader";
const CreateProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const dispatch = useDispatch();

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setCurrentX(e.touches[0].clientX);
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

  const [indexEle, setIndex] = useState(0);
  const [isDisplayed, setDisplay] = useState(false);
  const [isReview , setReview] = useState(false);
  const deleteUserHandeler = (id, reviewId, i) => {
    setIndex(i);
    dispatch(deleteReviews({ id, reviewId }));
  };
  const {
    loading: deleteLoader,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.deleteProductReview);
  const { loading, error, reviews } = useSelector(
    (state) => state.productReview
  );

  const [name, setName] = useState("");
  // const [loderClassName, setLoaderClassName] = useState(false);
  const submitButton = useRef();
  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(name));
  };

  useEffect(() => {
    if (loading === false) {
      if (reviews !== undefined) {
        if(reviews.length > 0){
          setReview(true)
        }
        if(reviews.length === 0){
          setReview(false)
        }
        setDisplay(true);
      }
      if (error) {
        toast.error(error.message);
        dispatch(clearError());
      }
    }
    if (deleteLoader === false) {
      if (isDeleted) {
        toast.success("Review Deleted Successfully");
        dispatch(reset());
      }
      if (deleteError) {
        toast.error(deleteError.message);
        dispatch(clearError());
      }
      isDeleted && dispatch(getAllReviews(name));
    }
  }, [
    error,
    isDeleted,
    deleteError,
    dispatch,
    loading,
    deleteLoader,
    name,
    reviews,
  ]);
  const setUserRating = (r) => {
    return {
    precision: 0.5,
    // size: "large",
    readOnly: true,
    value:r ,
  };
  }
  
  return (
    <>
      <MetaData title="Reviews - Admin" />
      <div
        className="_create-products-admin"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Sidebar isShown={isOpen} />
        <div className="newProductContainer _user-review-cont">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Search For Reviews</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product ID"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="on"
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              ref={submitButton}
              disabled={loading ? true : false}
            >
              {loading ? <PopUpLoader /> : ""}
              Search
            </Button>
          </form>
          <div
            className={
              isDisplayed
                ? `_user-reviews-for-single-product toggle_reviews-section`
                : `_user-reviews-for-single-product`
            }
          >
            <div className="_admin-products-list">
              <Button onClick={() => setDisplay(false)}>
                <CloseIcon />
              </Button>
             {isReview ? (
               <div className="_review-list">
               {loading === false &&
                 reviews.map((item, index) => (
                   <div className="_admin-panel-product" key={"r" + index}>
                     <div className="_admin-panel-product-id">
                       Review ID:{item._id}
                     </div>
                     <div className="_admin-panel-product-details">
                       <div className="_ap-product-image user-img">
                         <img
                           src={item.userCreated.avatar.public_URI}
                           alt={item.name}
                           key={index}
                         />
                       </div>

                       <div className="_ap-product-detail">
                         <Link to={`/user/${item.userCreated._id}`}>
                           <p>{item.name}</p>{" "}
                         </Link>
                         {loading === false && (<p><Rating {...(setUserRating(item.rating))}/></p>)}
                         <p>Review: {item.comment}</p>
                         <p>Reviewed On:{item.reviewdAt}</p>
                         <div>
                           <Button
                             sx={{ backgroundColor: "#D8F5F6" }}
                             className="ap-order-button"
                             disabled={deleteLoader}
                             onClick={() =>
                               deleteUserHandeler(name, item._id, index)
                             }
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
             ) : <></>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateProduct;
