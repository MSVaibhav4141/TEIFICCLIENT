import React, { useRef, useLayoutEffect } from "react";
import "./main.css";
import { ReactComponent as Mouse } from "../../../Utility/icons/magic-mouse_1.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EVO from "../../../Utility/images/evo.png";
gsap.registerPlugin(ScrollTrigger);

function Main() {
  const mn = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      var tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: mn.current,
          start: "50% 50%",
          end: "250% 50%",
          scrub: 2,
          pin: true,
        },
      });

      tl1
        .to(
          ".top",
          {
            top: "-50%",
            duration: 1,
          },
          "a"
        )
        .to(
          ".bottom",
          {
            bottom: "-50%",
            duration: 1,
          },
          "a"
        )
        .to(
          "#head_top_heading",
          {
            top: "120%",
            duration: 1.5,
          },
          "a"
        )
        .to(
          "#head_bottom_heading",
          {
            top: "-20%",
            duration: 1.5,
          },
          "a"
        )
        .to(
          ".center",
          {
            backgroundImage:
              "linear-gradient(90deg,rgba(0, 0, 0, 0.48), rgba(0, 0, 0, 1))",
            duration: 1.5,
          },
          "a"
        )
        .to(
          ".action_perform",
          {
            bottom: "-15%",
            opacity: 0,
            duration: 1.5,
          },
          "a"
        )
        .to(
          ".box_content",
          {
            opacity: 1,
            scale: 1,
            duration: 2,
          },
          "a"
        )
        .to(
          ".product_image",
          {
            top: "30%",
            duration: 2,
          },
          "a"
        )
        .to(
          ".center",
          {
            backgroundImage:
              "linear-gradient(90deg,rgba(7, 7, 7, 0.8) 15%,rgba(20, 20, 20, 0.8) ,rgba(44, 44, 44, 0.6))",
            duration: 2.5,
          },
          "b"
        )
        .to(
          ".product_image",
          {
            left: "77%",
            top: "50%",
            width: "28%",
            duration: 2.5,
          },
          "b"
        )
        .to(
          ".name_left",
          {
            left: "86.5%",
            rotate: "90deg",
            fontSize: "11vw",
            top: "44%",
            duration: 3,
            textShadow: " 15px 14px 2px rgba(0, 0, 0, 0.3)",
          },
          "b"
        )
        .to(
          ".name_right",
          {
            right: "100%",
            rotate: "90deg",
            fontSize: "11vw",
            duration: 3,
            top: "44%",
          },
          "b"
        )
        .to(
          " h2",
          {
            marginLeft: "10%",
            opacity: 1,
            duration: 3.5,
          },
          "b"
        )
        .to(
          ".para_first_center",
          {
            marginLeft: "10%",
            opacity: 1,
            duration: 3.5,
          },
          "b"
        )
        .to(
          ".para_second_center",
          {
            marginLeft: "10%",
            opacity: 1,
            duration: 3.5,
          },
          "b"
        )
        .to(
          ".center_product_price",
          {
            marginLeft: "10%",
            opacity: 1,
            duration: 3.5,
          },
          "b"
        )
        .to(
          ".center_button",
          {
            marginLeft: "10%",
            opacity: 1,
            duration: 4,
          },
          "b"
        );
    }, mn);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="main_head" ref={mn}>
        <div className="top">
          <h1 id="head_top_heading">
            Te<span>i</span>fic
          </h1>
        </div>
        <div className="center">
          <div className="box_content">
            <span className="name_left" id="evo_left">
              EVO
            </span>
            <span className="name_right ">SWAP</span>
          </div>
          <div className="product_image">
            <img src={EVO} alt="" srcset="" />
          </div>
          <div className="center_main_content_left">
            <div className="content_center">
              <h2>EVO EV CHARGER</h2>
              <p className="para_first_center">
                Teific UPI Supported Hassle Free EV Charger
              </p>
              <p className="para_second_center">
                EVOCharger..Say goodbye to apps and payment hassles. Enjoy
                seamless charging, effortless transactions, and a greener
                journey today.
              </p>
              <p className="center_product_price">₹19,999</p>
              <div className="center_button">
                <button className="center_main_button buy_button">
                  Add To Cart
                </button>
                <button className="center_main_button info_button">
                  Know More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1 id="head_bottom_heading">
            Te<span>i</span>fic
          </h1>
        </div>
        <div className="action_perform">
          <Mouse className="mouse"> This</Mouse>
          <p>Scroll Down</p>
        </div>
      </div>
    </>
  );
}

export default Main;

// backgroundImage:"linear-gradient(90deg,rgba(7, 7, 7, 0.8) 15%,rgba(20, 20, 20, 0.8) ,rgba(44, 44, 44, 0.6))"
