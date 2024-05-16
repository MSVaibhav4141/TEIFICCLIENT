import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Navigation, Pagination, Zoom } from "swiper/modules";
import { ReactComponent as Share } from "../../../Utility/icons/share.svg";

const Carousel = ({ product, options }) => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        const currentUrl = window.location.href;
        await navigator.share({
          title: product.name,
          url: currentUrl,
        });
      } else {
        throw new Error(
          "Web Share API not supported on this device or browser."
        );
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  return (
    <Swiper
      pagination={options.pagination}
      navigation={options.navigation}
      zoom={options.zoom}
      lazy={options.lazy}
      modules={[Zoom, Pagination, Navigation]}
      className="mySwiper"
    >
      <div
        style={{ display: `${options.share}` }}
        className="_share-product"
        onClick={handleShare}
      >
        <Share />
      </div>
      {product.images &&
        product.images.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="swiper-zoom-container">
              <img src={item.url} alt="yo" loading="lazy" />
              <div className="swiper-lazy-preloader"></div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Carousel;
