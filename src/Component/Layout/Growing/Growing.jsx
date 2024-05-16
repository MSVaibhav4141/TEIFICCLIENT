import React, { useLayoutEffect, useRef } from "react";
import Car from "../../../Utility/images/car.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./growing.css";

gsap.registerPlugin(ScrollTrigger);
function Growing() {
  const grow = useRef();
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: grow.current,
          start: "20% 50%",
          end: "80% 50%",
          scrub: 1,
        },
      });

      tl1
        .from(
          "img",
          {
            scale: 1,
          }, 
          "e"
        )
        .from(
          "h2",
          {

            left: "50%",
            top: "50%",
            scale: 0,
            opacity: 0,
            duration: 2,
          },
          "e"
        );
    }, grow);
    return () => ctx.revert();
  }, []);
  return (
    <div className="grow_container" ref={grow}>
      <img src={Car} alt="" />
      <h2>We Are Continuously Growing</h2>
    </div>
  );
}

export default Growing;
