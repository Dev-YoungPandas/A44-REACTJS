import React, { useEffect, useRef } from 'react'
import { PiStarFourFill } from "react-icons/pi";
import "../../css/Section2.css";
import gsap from 'gsap/all';


const Section4 = () => {

  const textRef = useRef();
  const textRef2 = useRef();

  useEffect(() => {
    const spanElement = textRef.current;
    const spanElement2 = textRef2.current;

    gsap.to(spanElement, {
      rotateX: 90, // Flip effect
      y: -22, 
      duration:0.7,
      color:"black",
      scrollTrigger: {
        trigger: spanElement,
        start: "top 80%", 
        toggleActions: "play none none reverse", 
      },
    })
    gsap.to(spanElement2, {
      rotateX: 90, // Flip effect
      y: -22, 
      duration:0.7,
      delay:0.7,
      color:"black",
      scrollTrigger: {
        trigger: spanElement2,
        start: "top 80%", 
        toggleActions: "play none none reverse", 
      },
    });
  }, []);

  return (
    <div className='w-full py-[3vw] flex items-center gap-8 justify-center flex-col bg-white'>
      <PiStarFourFill className='text-[7vw]' />


      <div className='HeadTextAnimation'>
        <h1 className='text-[7vw] text-center font-extrabold '>
          <a href="#" className="flip-animate">
            <span ref={textRef} className='text-white' data-hover="EXPLORE OUR">EXPLORE OUR</span>
          </a>
          
        </h1>
        <h1 className='text-[7vw] mt-[-2vw] text-center font-extrabold '>
          <a href="#" className="flip-animate">
            <span ref={textRef2} className='text-white' data-hover="EXTENSIVE PORTFOLIO">EXTENSIVE PORTFOLIO</span>
          </a>
          
        </h1>
      </div>
    </div>
  )
}

export default Section4
