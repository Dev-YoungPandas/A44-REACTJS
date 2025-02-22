import React, { useEffect, useRef } from 'react'
import ViewallWorkBtn from './ViewallWorkBtn'
import gsap from 'gsap/all'
import "../../css/Section2.css";
import { MdArrowOutward } from 'react-icons/md';
import SplitType from 'split-type';

const PostSection4 = () => {

  // useEffect(() => {
  //   gsap.from(".Button-section3", {
  //     y: 100,
  //     duration: 0.5,
  //     opacity: 0,
  //     scrollTrigger: {
  //       trigger: ".viewAllWork",
  //       start: "top 60%",
  //       end: "top 59%",
  //       scrub: 2
  //     }
  //   })
  // }, [])


 
  const textRef = useRef();

  const frameRef = useRef();
  const bookRef = useRef();

  const arrowRef = useRef();
  const line1Frame = useRef();
  const line2Frame = useRef();
  const line3Frame = useRef();
  const line4Frame = useRef();

  useEffect(() => {
      if (textRef.current) {
          new SplitType(textRef.current, { types: "words, chars" });
      }
  }, []);

  const handleMouseEnter = () => {
      gsap.to(frameRef.current, {
          scale: 0.95,
          duration: 0.5,
          ease: "power2.out",
          borderColor: "#fff",
      });
      gsap.to(arrowRef.current, {
          rotate: '360deg',
          duration: 0.5
      });
      bookRef.current.style.backgroundColor = "#00D0D2";
      textRef.current.style.color = "#000";
      line1Frame.current.style.borderColor = "black";
      line2Frame.current.style.borderColor = "black";
      line3Frame.current.style.borderColor = "black";
      line4Frame.current.style.borderColor = "black";

      animateText();
  };

  const handleMouseLeave = () => {
      gsap.to(frameRef.current, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          borderColor: "#000",
      });
      gsap.to(arrowRef.current, {
          rotate: '0deg',
          duration: 0.5
      });
      bookRef.current.style.backgroundColor = "transparent";
      textRef.current.style.color = "#000";
      line1Frame.current.style.borderColor = "#000";
      line2Frame.current.style.borderColor = "#000";
      line3Frame.current.style.borderColor = "#000";
      line4Frame.current.style.borderColor = "#000";
  };

  const animateText = () => {
      const chars = textRef.current.querySelectorAll(".char");
      const lettersAndSymbols =
          "abcdefghijklmnopqrstuvwxyz!,".split("");

      chars.forEach((char, index) => {
          let initialHTML = char.innerHTML;
          let repeatCount = 0;

          gsap.fromTo(
              char,
              { opacity: 0 },
              {
                  duration: 0.03,
                  onStart: () => gsap.set(char, { "--opa": 1 }),
                  onComplete: () => gsap.set(char, { innerHTML: initialHTML, delay: 0.03 }),
                  repeat: 3,
                  onRepeat: () => {
                      repeatCount++;
                      if (repeatCount === 1) {
                          gsap.set(char, { "--opa": 0 });
                      }
                  },
                  repeatRefresh: true,
                  repeatDelay: 0.04,
                  delay: (index + 1) * 0.07,
                  innerHTML: () =>
                      lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
                  opacity: 1,
              }
          );
      });
  };



  return (
    <div className='viewAllWork w-full py-[5vw]  flex items-center justify-center '>
      <div
        className="Button-section3 xl:w-[30vw] xl:h-[13vh] w-[80vw]  flex items-center gap-1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={bookRef}
          className="xl:w-[20vw] w-[60vw] h-[13vh] border border-gray-600 flex backdrop-blur-[8px] relative items-center justify-center"
        >
          <div ref={frameRef} className="xl:w-[20vw] w-[60vw] h-[13vh] absolute">
            <div ref={line1Frame} className="w-[20px] h-[20px] absolute top-0 left-0 border-l-2 border-[#000] border-t-2"></div>
            <div ref={line2Frame} className="w-[20px] h-[20px] absolute top-0 right-0 border-t-2 border-[#000] border-r-2"></div>
            <div ref={line3Frame} className="w-[20px] h-[20px] absolute bottom-0 border-l-2 border-b-2 border-[#000] left-0"></div>
            <div ref={line4Frame} className="w-[20px] h-[20px] absolute bottom-0 right-0 border-[#000] border-r-2 border-b-2"></div>
          </div>
          <h3 ref={textRef} className="font-bold text-[#000] text-[16px] xl:text-xl">BOOK A CONSULTATION</h3>
        </div>

        <div className="xl:w-[6vw] w-[20vw] h-[13vh] z-50 text-4xl font-bold flex items-center justify-center bg-[#00d0d2]">
          <MdArrowOutward ref={arrowRef} />
        </div>
      </div>

    </div>
  )
}

export default PostSection4
