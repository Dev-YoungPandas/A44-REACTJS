import gsap from 'gsap/all';
import React, { useEffect, useRef } from 'react'
import { PiStarFourFill } from "react-icons/pi";
import "../../css/Section2.css";



const AboutSection2Part1 = () => {

    const textRef = useRef();
    const textRef2 = useRef();
  

    useEffect(() => {
      const spanElement = textRef.current;
      const spanElement2 = textRef2.current;
  
      gsap.to(spanElement, {
        rotateX: 90, 
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
        rotateX: 90,
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
    <div className='w-full  sm:h-[50vh] lg:h-[60vh] xl:h-[70vh] flex items-center gap-8 justify-center flex-col bg-[#F9F9F9]'>
              <PiStarFourFill className='text-[7vw]' />
        
        
              <div className='HeadTextAnimation'>
                <h1 className='text-[7vw] text-center font-extrabold '>
                  <a href="#" className="flip-animate">
                    <span ref={textRef} className='text-white' data-hover="HISTORY OF THE">HISTORY OF THE</span>
                  </a>
                  
                </h1>
                <h1 className='text-[7vw] mt-[-2vw] text-center font-extrabold '>
                  <a href="#" className="flip-animate">
                    <span ref={textRef2} className='text-white' data-hover="EXTENSIVE PORTFOLIO">CREATION OF OUR TEAM</span>
                  </a>
                  
                </h1>
              </div>
            </div>
  )
}

export default AboutSection2Part1
