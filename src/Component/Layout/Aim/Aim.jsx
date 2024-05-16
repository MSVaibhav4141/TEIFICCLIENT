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
      
    }, );
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
