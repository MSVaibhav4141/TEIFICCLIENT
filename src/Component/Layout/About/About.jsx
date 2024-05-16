import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./about.css";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);
function Growing() {
  const about = useRef();
  const aboutPara = useRef();
  useLayoutEffect(() => {
    const text = new SplitType(aboutPara.current, {types:"chars,words"})
    const splittedText = text.chars;
    let ctx = gsap.context(() => {
      let tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: about.current,
          start: "-20% 50%",
          end: "80% 50%",
          markers:false,
          scrub: 1,

        },
      });

      tl1
        .from(
          splittedText,
          {
            scaleY:0,
            y:-20,
            transformOrigin:'top',
            stagger:0.1,
            duration:2
          }, 
          "e"
        )
        .from(
          ".about_wrapper",
          {
            backgroundImage: "linear-gradient(90deg, #fff 55%, #5acece)",
            duration:10
          }, 
          "e"
        )
        .from(
          "h2",
          {
            scale: 0,
            opacity: 0,
            duration: 2,
          },
          "e"
        );
    }, about);
    return () => ctx.revert();
  }, []);
  return (
      <div className="about" ref={about}>
      <div className="about_wrapper"> 
        <section className="sectionss"  >
          <p ref={aboutPara}> 
            We At Teific Transforming the Way You Live, Drive, and Grow with
            Innovative Technologies
          </p>
        </section> 
      </div>
    </div>
  );
}

export default Growing;
