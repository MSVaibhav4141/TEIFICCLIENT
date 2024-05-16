import React, { useRef } from "react";
import ReviewModal from "./ReviewModal.jsx";
import { ReactComponent as Cross } from "../../../Utility/icons/cross.svg";
import { Rating } from "@mui/material";
import "./productReview.css";
const ProductReviews = ({ review }) => {
  const options = {
    readOnly: true,
    precision: 0.5,
    value: review.rating,
  };
  const modal = useRef();

  const displayReview = () => {
    modal.current.showModal();
  };

  const closeModal = () => {
    modal.current.close();
  };
  return (
    <>
      <div className="_single-review">
        <div className="_review-info">
          <div>
            <img src={review.userCreated.avatar.public_URI} alt="user" />
          </div>
          <div>
            <div>
              <span>{review.name}</span>
            </div>
            <div>
              <Rating {...options} />{" "}
            </div>
          </div>
        </div>
        <div className="_review">
          <p>Reviewed on {review.reviewdAt}</p>
          <span>{review.comment}</span>
        </div>
        {review.images.length > 0 &&
          review.images.map((images, i) => (
            <img
              key={i}
              src={images.url}
              alt="review_image"
              className="_singal-review-images"
              onClick={() => displayReview(review, i)}
            />
          ))}
        <dialog ref={modal} className="_modal-for-single-review">
          <ReviewModal review={review} />
          <div className="_cross" onClick={() => closeModal()}>
            <Cross />
          </div>
        </dialog>
      </div>
    </>
  );
};

export default ProductReviews;
