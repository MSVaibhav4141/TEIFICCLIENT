import React, { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './about.css'

gsap.registerPlugin(ScrollTrigger);
function About() {

    const about = useRef();
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const text = new SplitType(".sectionss p",{types: 'chars'})
           gsap.to(".sectionss", {
                xPercent: -100,
                ease: "none",
                scrollTrigger: {
                  trigger: ".about_wrapper",
                  pin: true,
                  scrub: 1,
                  end: "+=3000",
                }
            });
            gsap.from('.about_wrapper', {
                backgroundImage:"linear-gradient(45deg,rgba(0, 0, 0, 0.956) 10%, rgba(0, 0, 0, 1) 55%)",
                duration:1,
                scrollTrigger: {
                    trigger: ".about_wrapper",
                    scrub: 2,
                    start: "top left",
                    end: "+=3000",
                }
              });
            gsap.from(text.chars, {
                opacity : 0,
                stagger: 0.3,
                transformOrigin:"top",
                color:"white",
                y: -80,
                duration:2,
                scrollTrigger: {
                    trigger: ".about_wrapper",
                    scrub: 2,
                    start: "top left",
                    end: "+=2000",
                }
              });
        })
        return () => ctx.revert();
      }, []);

  return (
    <div className='about' ref={about}>
        <div className="about_wrapper">
            <section className='sectionss'>
            <p>We At Teific Transforming the Way You Live, Drive, and Grow with Innovative Technologies</p>
            </section>
        </div>
    </div>
  )
}

export default About