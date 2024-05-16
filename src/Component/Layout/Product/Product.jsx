import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loder";
import "./product.css";
import { getProductDetail, getProducts } from "../../../actions/productAction";
import { cartItem } from "../../../actions/cartAction.js";
import parse from "html-react-parser";
import ProductServices from "./ProductServices.jsx";
import ProductReviews from "./ProductReviews.jsx";
import ReviewModal from "./ReviewModal.jsx";
import CustomCarousel from "./Carousel.jsx";
import { ReactComponent as Cross } from "../../../Utility/icons/cross.svg";
import MetaData from "../MetaData.js";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";

import {
  allReviewForProduct,
  checkEligibiltyForReview,
  clearError,
  deleteReview,
  newReview,
  reset,
} from "../../../actions/reviewAction.js";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Rating,
} from "@mui/material";
const Product = () => {
  const productReview = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { products } = useSelector((state) => state.products);
  const { product, loading } = useSelector((state) => state.productDetail);
  const { isEligible, userSigned } = useSelector((state) => state.eligible);
  const { success: deleteReviewStatus } = useSelector(
    (state) => state.deleteReviews
  );
  const [deleteiconclass, setDeleteIconClass] = useState("");
  const {
    loading: reviewLoading,
    review: productAllReview,
    ratingsOfProduct,
    numberOfRatingsOfProduct,
    numberOfReviewsOfProduct,
  } = useSelector((state) => state.getAllReviews);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const [oneStar, updateOneStar] = useState(0);
  const [twoStar, updateTwoStar] = useState(0);
  const [threeStar, updateThreeStar] = useState(0);
  const [fourStar, updateFourStar] = useState(0);
  const [fiveStar, updateFiveStar] = useState(0);
  const [technicalDetails, updateTechnicalDetails] = useState([]);
  const [productAbout, updateProductAbout] = useState([]);
  const [allReviewImages, updateReviewImages] = useState([]);
  const [allReview, updateReview] = useState([]);
  const [referedProduct, setReferedProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [reiviewBox, updateReviewBox] = useState({
    userCreated: { avatar: { public_URI: "" } },
  });
  const [slide, updateSlide] = useState(0);
  const [cartItemNo, updateCartItem] = useState(1);
  const renderImage = [];
  const modal = useRef();

  const options = {
    precision: 0.5,
    size: "large",
    readOnly: true,
    value: reviewLoading === false && ratingsOfProduct,
  };

  const setProductRating = (rating) => {
    return {
      precision: 0.5,
      size: "small",
      readOnly: true,
      value: rating,
    }
  }

  const addItemsToCart = () => {
    dispatch(cartItem({ id, cartItemNo }));
    toast.success("Item added to cart");
  };
  const increaseItem = () => {
    if (cartItemNo >= product.stock) return;

    updateCartItem((prev) => prev + 1);
  };
  const decreaseItem = () => {
    if (cartItemNo <= 1) return;
    updateCartItem((prev) => prev - 1);
  };

  const deleteReviewofProduct = () => {
    const reviewId = signedUserReiview[0]._id;
    dispatch(deleteReview({ id, reviewId }));
    signedUserReiview.pop();
    setOpen(false);
  };
  const customCarouselOption = {
    share: "flex",
    pagination: {
      dynamicBullets: true,
      clickable: true,
    },
    zoom: true,
    lazy: true,
    navigation: false,
  };

  const submitReviewToggle = () => {
    if (!isEligible) {
      toast(
        "Sorry!! You can't review a product you haven't purchased or received it yet"
      );
    } else {
      open ? setOpen(false) : setOpen(true);
    }
  };

  const reviewSubmitHandler = () => {
    const reviewData = new FormData();
    reviewData.set("rating", rating);
    reviewData.set("comment", comment);
    reviewData.set("productID", id);

    dispatch(newReview(reviewData));

    setOpen(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getProductDetail(id));
    dispatch(checkEligibiltyForReview({ id }));
  }, [dispatch, id]);
  useEffect(() => {
    if (loading === false && productAllReview) {
      if (productAllReview.length === 0) {
        updateFiveStar(0);
        updateFourStar(0);
        updateThreeStar(0);
        updateTwoStar(0);
        updateOneStar(0);
      } else {
        updateFiveStar(
          Math.round(
            (productAllReview.filter((rev) => rev.rating === 5).length /
              numberOfRatingsOfProduct) *
              100
          )
        );

        updateFourStar(
          Math.round(
            (productAllReview.filter((rev) => rev.rating === 4).length /
              numberOfRatingsOfProduct) *
              100
          )
        );
        updateThreeStar(
          Math.round(
            (productAllReview.filter((rev) => rev.rating === 3).length /
              numberOfRatingsOfProduct) *
              100
          )
        );
        updateTwoStar(
          Math.round(
            (productAllReview.filter((rev) => rev.rating === 2).length /
              numberOfRatingsOfProduct) *
              100
          )
        );
        updateOneStar(
          Math.round(
            (productAllReview.filter((rev) => rev.rating === 1).length /
              numberOfRatingsOfProduct) *
              100
          )
        );
      }
      updateReviewImages(productAllReview.filter((item) => "images" in item));
      updateReview(productAllReview.filter((item) => "comment" in item));
    }
  }, [loading, productAllReview, numberOfRatingsOfProduct]);

  useEffect(() => {
    if (loading === false) {

      let s = product.productAbout;
      let ss = product.technicalDetails;
      updateProductAbout(s.split("/n"));;
      const productTechnicalDetail = ss.split("/n").map((items) => {
        const splittedData = items.split("-");
        return {
          heading: splittedData[0],
          discription: splittedData[1],
        };
      });
      updateTechnicalDetails(productTechnicalDetail);
    }
  }, [loading, product]);
   
  useEffect(() => {
    if (loading === false) {
      const category = product.category;
      dispatch(getProducts({ category }));
    }
  }, [dispatch, id, loading, product]);

  useEffect(() => {
    if (products !== undefined) {
      const refered = products.filter((i) => i._id !== product._id);
      setReferedProduct(refered);
    }
  }, [products, product]);
  useEffect(() => {
    if (reviewError) {
      toast.error(reviewError.message);
      dispatch(clearError());
    }
    if (success) {
      toast.success("Review Submitted Successfully!!");
      dispatch(reset());
    }
    if (deleteReviewStatus) {
      toast.success("Review Deleted Successfully!!");
      dispatch(reset());
      // setRating(1);
      // setComment("");
    }
    dispatch(allReviewForProduct(id));
  }, [dispatch, id, reviewError, success, deleteReviewStatus]);

  const displayReview = (review, index) => {
    updateReviewBox(review);
    updateSlide(index);
    modal.current.showModal();
  };
  const closeModal = () => {
    modal.current.close();
  };

  function truncateString(str, maxLength) {
    // If string length is less than or equal to maxLength, return the original string
    if (str.length <= maxLength) {
      return str;
    }
    // Truncate the string to maxLength characters and add "..."
    return str.slice(0, maxLength) + "...";
  }
  const signedUserReiview =
    reviewLoading === false &&
    productAllReview.filter((i) => i.userCreated._id === userSigned);

  useEffect(() => {
    if (reviewLoading === false) {
      if (signedUserReiview.length > 0) {
        setDeleteIconClass("");
        setRating(signedUserReiview[0].rating);
        setComment(signedUserReiview[0].comment);
      }
    } else {
      setDeleteIconClass("deleteIconClass");
      setRating(1);
      setComment("");
    }
  }, [reviewLoading, signedUserReiview]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={product.name} />
          <div className="productDetail">
            <div className="_product-detail-right">
              <CustomCarousel
                product={product}
                options={customCarouselOption}
              />
            </div>
            <div className="_product-detail-left">
              <div className="_product-category-info">
                <p>
                  Shop <span>&gt;</span> Product <span>&gt;</span>{" "}
                  {product.category}
                </p>
              </div>

              <div className="_product-name">
                <h1>{product.name}</h1>
              </div>
              <div
                className="_product-rating-reviews"
                onClick={() => {
                  productReview.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>{ratingsOfProduct === "NaN" ? 0 : ratingsOfProduct}</span>
                <Rating {...options} />
                <span>
                  {reviewLoading === false && numberOfRatingsOfProduct} ratings
                  & {reviewLoading === false && numberOfReviewsOfProduct}{" "}
                  reviews
                </span>
              </div>
              <div className="_special-price">
                <div>
                  <p>Special Price</p>
                </div>
                <p>
                  {" "}
                  <em>Inclusive of all taxes</em>{" "}
                </p>
              </div>
              <div className="_product-price">
                <div>
                  <span>&#8377;</span>
                  <h1>{Intl.NumberFormat("en-IN").format(product.price)}</h1>
                </div>
                <div>
                  <h3>
                    <strike>
                      <span>&#8377;</span>
                      {Intl.NumberFormat("en-IN").format(product.actualPrice)}
                    </strike>
                  </h3>
                </div>
              </div>
              {loading === false && !product.stock ? (
                <>
                  <div className="_out-of-stock">
                    <h3>Out Of Stock</h3>
                    Sorry, Item is currently unavailable.
                  </div>
                </>
              ) : (
                <>
                  <div className="_buy-cart-button">
                    <div className="_buy-button">
                      <button>Buy Now</button>
                    </div>
                    <div className="_cart-button">
                      <button onClick={addItemsToCart}>Add To Cart</button>
                    </div>
                    <div className="_add-item-cart">
                      <button
                        className="_add-to-cart"
                        onClick={() => {
                          increaseItem();
                        }}
                      >
                        +
                      </button>
                      <input
                        type="number"
                        className="_number-of-item-cart"
                        readOnly
                        value={cartItemNo}
                      />
                      <button
                        className="_subtract-to-cart"
                        onClick={() => {
                          decreaseItem();
                        }}
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <div className="_pincode-checker">
                    <p>Delivery</p>
                    <input type="text" placeholder="Enter Your Pincode" />
                    <p>{null}</p>
                    <button>Check </button>
                  </div>
                </>
              )}

              <hr />
              <div className="_product-services">
                {loading === false && product.servicesAvailable && 
                  product.servicesAvailable.map((items) => (
                    <ProductServices service={items} key={items._id} />
                  ))}
              </div>
              <hr />
              <div className="_product-about">
                <p>About the product</p>
                <ul>
                  {loading === false &&
                    productAbout.map((item, i) => (
                      <li key={i}>
                        <span>&#183;</span>
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div className="_product-details-lower-part">
            <div className=" _spacing-for-product-details-outer-part">
              <h4>Product's Description</h4>
              <div className=" _spacing-for-product-details">
                {parse(String(product.discription))}
              </div>
              <hr />
            </div>
            <div className=" _spacing-for-product-details-outer-part">
              <h4>What's in the box?</h4>
              <div className=" _spacing-for-product-details">
                {product.boxContent}
              </div>
              <hr />
            </div>
            <div className=" _spacing-for-product-details-outer-part">
              <h4>Technical Details</h4>
              <div className="_table-spacing">
                <table className="_table-for-product">
                  <tbody>
                    {technicalDetails.map((items, i) => (
                      <>
                        <tr>
                          <td className="_product-detail-table">
                            {items.heading}
                          </td>
                          <td className="_product-detail-table _border-left">
                            {items.discription}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              <hr />
            </div>
            <div
              className=" _spacing-for-product-details-outer-part"
              ref={productReview}
            >
              <h4>Customer Reviews</h4>
              <div className="_cutsomer-feedback-section _spacing-for-product-details">
                <div className="_customer-single-product-rating">
                  <div className="_rating-value">
                    <span>{product.ratings}</span>
                    <span>
                      <Rating {...options} />
                    </span>
                  </div>

                  <div className="_number-of-reviews">
                    <p>
                      {reviewLoading === false && numberOfRatingsOfProduct}{" "}
                      ratings &{" "}
                      {reviewLoading === false && numberOfReviewsOfProduct}{" "}
                      reviews
                    </p>
                  </div>
                  <div className="_rating-percentage">
                    <div>
                      <div>
                        <span style={{ width: `${fiveStar}%` }}></span>
                      </div>
                      <span>{fiveStar}%</span>
                    </div>
                    <div>
                      <div>
                        <span style={{ width: `${fourStar}%` }}></span>
                      </div>
                      <span>{fourStar}%</span>
                    </div>
                    <div>
                      <div>
                        <span style={{ width: `${threeStar}%` }}></span>
                      </div>
                      <span>{threeStar}%</span>
                    </div>
                    <div>
                      <div>
                        <span style={{ width: `${twoStar}%` }}></span>
                      </div>
                      <span>{twoStar}%</span>
                    </div>
                    <div>
                      <div>
                        <span style={{ width: `${oneStar}%` }}></span>
                      </div>
                      <span>{oneStar}%</span>
                    </div>
                  </div>
                  <button onClick={submitReviewToggle}>Write a Review</button>
                </div>

                <Dialog
                  aria-labelledby="simple-dialog-title"
                  open={open}
                  onClose={submitReviewToggle}
                >
                  <DialogTitle>Submit Review</DialogTitle>
                  <DialogContent className="submitDialog">
                    <div>
                      <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="large"
                      />
                      <Button
                        className={deleteiconclass}
                        disabled={
                          reviewLoading === false &&
                          signedUserReiview.length === 0
                        }
                        onClick={() => deleteReviewofProduct()}
                      >
                        <DeleteIcon sx={{ color: red[400] }} />
                      </Button>
                    </div>
                    <textarea
                      className="submitDialogTextArea"
                      cols="30"
                      rows="5"
                      placeholder="Write your review"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <input type="file" name="avatar" accept="image/" />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={submitReviewToggle} color="secondary">
                      Cancel
                    </Button>
                    <Button onClick={reviewSubmitHandler} color="primary">
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
                <div className="_customer-product-review">
                  <div>
                    <h4>Read Reviews</h4>
                  </div>
                  {loading === false &&
                  productAllReview &&
                  productAllReview.length === 0 ? (
                    <h1>No Reviews Yet</h1>
                  ) : (
                    <div className="_images-and-reviews">
                      <div className="_review-images">
                        {loading === false &&
                          allReviewImages.map((item) =>
                            item.images.map((images, i) => (
                              <img
                                key={i}
                                src={images.url}
                                className="_review-image-block"
                                alt="review_image"
                                onClick={() => displayReview(item, i)}
                              />
                            ))
                          )}
                        {renderImage}
                        {loading === false && (
                          <dialog
                            ref={modal}
                            className="_modal-for-single-review"
                          >
                            <ReviewModal review={reiviewBox} slide={slide} />
                            <div
                              className="_cross"
                              onClick={() => closeModal()}
                            >
                              <Cross />
                            </div>
                          </dialog>
                        )}
                      </div>
                      <div className="reviews_of_product">
                        {loading === false &&
                          productAllReview !== undefined &&
                          allReview.map((item) => (
                            <ProductReviews review={item} />
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <hr />
            </div>
            <div
              className=" _spacing-for-product-details-outer-part"
              ref={productReview}
            >
              <h4>Product you may like</h4>
              <div className="_recommended-products">
                {products &&
                  referedProduct.map((product) => (
                    <>
                    <Link to={`/products/${product._id}`}>
                      <div className="_productCardP">
                        <div className="_productCard_imgP">
                          {product.images.length === 0 ? (
                            <img src="/avatar.png" alt="" srcset="" />
                          ) : (
                            <img src={product.images[0].url} alt={product.name} />
                          )}
                        </div>
                        <div>
                          <p className="_productCard-nameP spacing-for-cardP">
                            {window.innerWidth > 1000
                              ? truncateString(product.name, 50)
                              : truncateString(product.name, 20)}
                          </p>
                          <div className="rating_reviewsP spacing-for-cardP">
                            <span>{product.ratings}</span>
                            <Rating {...(setProductRating(product.rating))} />
                            <span>&#40;{product.numberOfReviews}&#41;</span>
                          </div>
                          <div className="_pricing-single-productP spacing-for-cardP">
                            <div>
                              <p>
                                <span>&#8377;</span>
                                {Intl.NumberFormat("en-IN").format(product.price)}
                              </p>
                            </div>
                            <div>
                              <p>
                                <strike>
                                  <span>&#8377;</span>
                                  {Intl.NumberFormat("en-IN").format(product.actualPrice)}
                                </strike>
                              </p>
                            </div>
                            <div className="_discount-percentageP spacing-for-cardP">
                              {Math.floor(100 - (product.price / product.actualPrice) * 100)}%
                              off
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Product;
