import React, { useEffect, useState } from "react";
import CustomCarousel from "./Carousel.jsx";
import "./reviewModal.css";
import ReactStars from "react-rating-stars-component";

const ReviewModal = ({ review }) => {
  const customCarouselOption = {
    share: "none",
    pagination: {
      dynamicBullets: true,
      clickable: true,
    },
    zoom: true,
    lazy: true,
    navigation: true,
  };

  const [optionsKey, setOptionsKey] = useState(0);
  const [userImg, updateUserImg] = useState("");

  const [options, setOptions] = useState({
    edit: false,
    color: "#D9D9D9",
    activeColor: "#FFC700",
    value: 0,
    size: 18,
  });

  useEffect(() => {
    // Update ReactStars value when review changes
    setOptions((prevOptions) => ({
      ...prevOptions,
      value: review.rating,
    }));

    // Increment the key to force re-mount of ReactStars
    setOptionsKey((prevKey) => prevKey + 1);
    updateUserImg(review.userCreated.avatar.public_URI);
  }, [review]);

  return (
    <>
      <div className="_review-modal">
        <div className="_img-modal-section">
          <CustomCarousel product={review} options={customCarouselOption} />
        </div>
        <div className="_review-modal-section">
          <div>
            <img src={userImg} alt="user-img" />
            <div>
              <p>{review.name}</p>
              <ReactStars
                key={optionsKey}
                edit={false}
                color={options.color}
                activeColor={options.activeColor}
                value={options.value}
                size={options.size}
              />
            </div>
          </div>
          <p>Reviewed on {review.reviewdAt}</p>
          <p>{review.comment}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;
