import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import "./aim.css";

gsap.registerPlugin(ScrollTrigger);
function Aim() {
  const aim_wraper = useRef();
  const aim_content = useRef();
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const text = new SplitType(".aim_content p", { types: "chars" });

      let tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".aim_content",
          start: "-10% 50%",
          end: "80% 50%",
          scrub: 2,
          markers: true,
        },
      });

      tl1
        .from(
          text.chars,
          {
            opacity: 0.2,
            stagger: 0.1,
            color: "white",
          },
          "a"
        )
        .from(
          ".aim_content_cover_top",
          {
            y: "-100%",
            duration: 2,
          },
          "a"
        )
        .from(
          ".aim_content_cover_bottom",
          {
            y: "100%",
            duration: 2,
          },
          "a"
        );
    }, aim_wraper);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="aim_wrapper" ref={aim_wraper}>
        <div className="aim_content">
          <div className="aim_content_cover_top aim_content_cover">
            <div className="cover_content_container">
              <h2 id="cover_content_top_heading">Teific</h2>
            </div>
          </div>
          <div className="aim_content_cover_bottom aim_content_cover">
            <div className="cover_content_container">
              <h2 id="cover_content_bottom_heading">Teific</h2>
            </div>
          </div>
          <p>We Are Team Teific Ready To Revolutionize Your World</p>
        </div>
      </div>
    </>
  );
}

export default Aim;
