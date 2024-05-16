import React, { useLayoutEffect, useRef } from "react";
import "./starproduct.css";
import Image1 from "../../../Utility/images/img1.png";
import Image2 from "../../../Utility/images/img2.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {Link} from "react-router-dom"
gsap.registerPlugin(ScrollTrigger);

function StarProduct() {
  const star = useRef();
  useLayoutEffect(() => {
    let mm = gsap.matchMedia();

    mm.add(
      '(min-width: 1000px)',
      () => {
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
      },
      star
    );
    mm.add(
      '(max-width: 1000px)',
      () => {
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
            opacity:0.2
          },
          "d"
        )
        .from(
          ".card_two_container",
          {
            opacity:0.2,
            x: "100%",
          },
          "d"
        );
      },
      star
    );

    return () => mm.revert();
  }, []);


  function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
        return str;
    } else {
        return str.substring(0, maxLength) + "...";
    }
}
  return (
    <>
      <div className="star_container" ref={star}>
        <div className="star_products">
          <h1>OUR PRODUCTS</h1>
        </div>
        <div className="evolutionaries">
          <p>Evolutionaries</p>
        </div>  
       <div className="_card-container">
        <div>
        <div className="card_container card_one_container">
          <div className="card">
            <img src={Image1} alt="" />
            <div className="card_body_one">
              <div className="title">JDNDND</div> 
              <div className="content">
              {truncateString("GrowMinder takes the guesswork out of plant care, monitoring and optimizing everything from temperature and light intensity to humidity, pH levels, soil moisture, and leaf temperature", 150)}
                
              </div> 
              
              <Link className="productCard" to={"12"}>
              <button className="buy">Buy</button>
              </Link>
              <button className="know">Know More</button> 
            </div>
          </div>
        </div>
        </div>
        <div>
        <div className="card_container card_two_container">
          <div className="card">
            <img src={Image2} alt="" />
            <div className="card_body_one">
              <div className="title">airHwak</div>
              <div className="content">
                {truncateString("airHwak Pro is a compact device with temperature, humidity, and oxygen sensors that send real-time data to the IOT cloud, keeping you connected to your enviroment whether indoors or outdoors", 150)}
                
              </div>

              <button className="buy">Buy</button>
              <button className="know">Know More</button>
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default StarProduct;
