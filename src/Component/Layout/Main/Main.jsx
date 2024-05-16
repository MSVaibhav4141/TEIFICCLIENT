import React, { useRef, useLayoutEffect } from "react";
import "./main.css";
import { ReactComponent as Mouse } from "../../../Utility/icons/magic-mouse_1.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from 'split-type'
import EVO from "../../../Utility/images/evo.png";
gsap.registerPlugin(ScrollTrigger);

function Main() {
  const mn = useRef();
  const proHead = useRef();
  const paraFirst = useRef();
  const paraSec = useRef();
  const proPrice = useRef();
  const proButton = useRef();
  useLayoutEffect(() => {
    let mm = gsap.matchMedia();
    let mysplittext = new SplitType(proHead.current, {type:"chars"});
    let chars = mysplittext.chars;
    mm.add(
      '(min-width: 1000px)',
      () => {
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
      },
      mn
    ); // <- scope!!!
    mm.add("(max-width: 1000px)", () => {
      var tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: mn.current,
          start: "50% 50%",
          end: "250% 50%",
          scrub: 2,
          pin: true,
        },
      });
      // this setup code only runs when viewport is at least 800px wide
      tl1
      .to(
        ".top",
        {
          y: "-100vh",
          duration: 1,
        },
        "a"
      )
      .to(
        ".bottom",
        {
          y: "100vh",
          duration: 1,
        },
        "a"
      )
      .to(
        ".action_perform",
        {
          bottom: "-100%",
          opacity: 0,
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
          top: "40%",
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
          top: "50%",
          width: "33vmax",
          duration: 2.5,
        },
        "b"
      )
      .to(
        ".name_left",
        {
          left: "150%",
          rotate: "90deg",
          fontSize: "15vw",
          top: "44%",
          duration: 3,
          textShadow: " 15px 14px 2px rgba(0, 0, 0, 0.3)",
        },
        "b"
      )
      .to(
        ".name_right",
        {
          right: "150%",
          rotate: "90deg",
          fontSize: "15vw",
          duration: 3,
          top: "44%",
        },
        "b"
      )
      .to(
        ".product_image",
        {
          top: "20%",
          width: "29vmax",
          duration: 1.1,
          opacity:0
        },
        "c"
      )
      .to(
        "h2",
        {
          duration: 1,
          opacity:1
        },
        "c"
      )
      .to(
        chars,
        {
          opacity: 1,
          duration: 2,
          stagger:0.3
        },
        "d"
      )
      .to(
        ".line",
        {
          margin:"0px",
          duration:2
        },
        "f"
      )
      .to(
        "h2",
        {
          paddingLeft:"10px",
          top:"6vmax",
          duration:2
        },
        "e"
      )
      .to(
        "._item-container-mainPage",{
          top:"10vmax",
          opacity:1,
          duration:2.5,
          height:"180vh"
        },
        "e"
      )
      .to(
        ".para_first_center",
        {
          opacity: 1,
          duration: 2.5,
        },
        "e"
      )
      .to(
        ".para_second_center",
        {
          opacity: 1,
          duration: 2.5,
        },
        "e"
      )
      .to(
        ".center_product_price",
        {
          opacity: 1,
          duration: 2.5
        },
        "e"
      )
      .to(
        ".center_button",
        {
          opacity: 1,
          duration: 2.5,
        },
        "e"
      )
      // .to(
      //   ".product_image",
      //   {
      //     scale:9,
      //     duration: 2,
      //   },
      //   "a"
      // )
      // .to(
      //   ".product_image",
      //   {
      //     scale:6,
      //     y:"-10vh",
      //     x:"-30vw",
      //     duration: 2,
      //   },
      //   "b"
      // )
      // .to(
      //   ".name_left",
      //   {
      //     top: "36%",
      //     left: "71%",
      //     transform: "translate(-71%, -36%)",
      //     duration: 3,
      //   },
      //   "b"
      // )
      // .to(
      //   ".name_right",
      //   {
      //     top:"45%",
      //     right: "5%",
      //     transform: "translate(-5%, -45%)",
      //     duration: 3,
      //   },
      //   "b"
      // )
    });
    return () => mm.revert();
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
            <img src={EVO} alt="" srcSet="" />
          </div>
          <div className="center_main_content_left">
            <div className="content_center">
              <h2 ref={proHead}>EVO EV CHARGER</h2>
              <div className="_item-container-mainPage">
              <p className="para_first_center" ref={paraFirst}>
                Teific UPI Supported Hassle Free EV Charger
              </p>
              <p className="para_second_center" ref={paraSec}>
                EVOCharger..Say goodbye to apps and payment hassles. Enjoy
                seamless charging, effortless transactions, and a greener
                journey today.
              </p>
              <p className="center_product_price" ref={proPrice}>₹19,999</p>
              <div className="center_button" ref={proButton}>
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
