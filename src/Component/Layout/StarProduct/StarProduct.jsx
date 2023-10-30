import React, { useLayoutEffect, useRef } from "react";
import "./starproduct.css";
import Image1 from "../../../Utility/images/img1.png";
import Image2 from "../../../Utility/images/img2.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function StarProduct() {
  const star = useRef();
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: star.current,
          start: "-10% 50%",
          end: "50% 50%",
          scrub: 2,
        },
      });

      tl1
        .from(
          ".star_products h1",
          {
            scale: 0,
          },
          "d"
        )
        .from(
          ".evolutionaries p",
          {
            y: "-50%",
            opacity: 0,
          },
          "d"
        )
        .from(
          ".card_one_container",
          {
            x: "-100%",
            y: "100%",
          },
          "d"
        )
        .from(
          ".card_two_container",
          {
            x: "100%",
            y: "100%",
          },
          "d"
        );
    }, star);
    return () => ctx.revert();
  }, []);
  return (
    <>
      <div className="star_container" ref={star}>
        <div className="star_products">
          <h1>OUR PRODUCTS</h1>
        </div>
        <div className="evolutionaries">
          <p>Evolutionaries</p>
        </div>

        <div className="card_container card_one_container">
          <div className="card">
            <img src={Image1} alt="" />
            <div className="card_body_one">
              <div className="title">GrowMinder</div>
              <div className="content">
                GrowMinder takes the guesswork out of plant care, monitoring and
                optimizing everything from temperature and light intensity to
                humidity, pH levels, soil moisture, and leaf temperature
              </div>

              <button className="buy">Buy</button>
              <button className="know">Know More</button>
            </div>
          </div>
        </div>

        <div className="card_container card_two_container">
          <div className="card">
            <img src={Image2} alt="" />
            <div className="card_body_one">
              <div className="title">airHwak</div>
              <div className="content">
                airHwak Pro is a compact device with temperature, humidity, and
                oxygen sensors that send real-time data to the IOT cloud,
                keeping you connected to your enviroment whether indoors or
                outdoors
              </div>

              <button className="buy">Buy</button>
              <button className="know">Know More</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StarProduct;
