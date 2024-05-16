import React from "react";
import { Link } from "react-router-dom";
import "./productCard.css";
import {
  Rating,Button
} from "@mui/material";
const productCard = ({ product }) => {
  const options = {
    precision: 0.5,
    size: "medium",
    readOnly: true,
    value: product  && product.ratings,
  };
  
  function truncateString(str, maxLength) {
    // If string length is less than or equal to maxLength, return the original string
    if (str.length <= maxLength) {
      return str;
    }
    // Truncate the string to maxLength characters and add "..."
    return str.slice(0, maxLength) + "...";
  }

  return (
    <>
      <Link to={`/products/${product._id}`}>
        <div className="_productCard">
          <div className="_productCard_img">
            {product.images.length === 0 ? (
              <img src="/avatar.png" alt="" srcset="" />
            ) : (
              <img src={product.images[0].url} alt={product.name} />
            )}
          </div>
          <div>
            <p className="_productCard-name spacing-for-card">
              {window.innerWidth > 1000
                ? truncateString(product.name, 50)
                : truncateString(product.name, 40)}
            </p>
            <div className="rating_reviews spacing-for-card">
              <span>{product.ratings}</span>
              <Rating {...options} />
              <span>&#40;{product.numberOfReviews}&#41;</span>
            </div>
            <div className="_pricing-single-product spacing-for-card">
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
              <div className="_discount-percentage spacing-for-card">
                {Math.floor(100 - (product.price / product.actualPrice) * 100)}%
                off
              </div>
            </div>
              <div className="_button-parent spacing-for-card"><Button variant="contained" disableElevation className="_view-more-button" >View More</Button></div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default productCard;
