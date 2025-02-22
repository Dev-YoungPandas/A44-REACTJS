import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import "../../css/Section2.css";

const GallerySection3 = () => {
  const frameRef = useRef();
  const bookRef = useRef();
  const textRef = useRef();

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
      scale: 0.98,
      duration: 0.5,
      ease: "power2.out",
      borderColor: "#fff",
    });

    bookRef.current.style.backgroundColor = "#000";
    textRef.current.style.color = "white";
    line1Frame.current.style.borderColor = "white";
    line2Frame.current.style.borderColor = "white";
    line3Frame.current.style.borderColor = "white";
    line4Frame.current.style.borderColor = "white";

    animateText();
  };

  const handleMouseLeave = () => {
    gsap.to(frameRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
      borderColor: "#000",
    });

    bookRef.current.style.backgroundColor = "transparent";
    textRef.current.style.color = "#000";
    line1Frame.current.style.borderColor = "black";
    line2Frame.current.style.borderColor = "black";
    line3Frame.current.style.borderColor = "black";
    line4Frame.current.style.borderColor = "black";
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
    <div className="w-full flex items-center bg-white justify-center h-[45vh]">
      <div
        className="Button-section3 w-[90vw] h-[13vh] flex items-center gap-1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={bookRef}
          className="w-[90vw] h-[13vh] border border-gray-600 flex backdrop-blur-[8px] relative items-center justify-center"
        >
          <div ref={frameRef} className="w-[90vw] h-[13vh] absolute">
            <div ref={line1Frame} className="w-[20px] h-[20px] absolute top-0 left-0 border-l-2 border-black border-t-2"></div>
            <div ref={line2Frame} className="w-[20px] h-[20px] absolute top-0 right-0 border-t-2 border-black border-r-2"></div>
            <div ref={line3Frame} className="w-[20px] h-[20px] absolute bottom-0 border-l-2 border-b-2 border-black left-0"></div>
            <div ref={line4Frame} className="w-[20px] h-[20px] absolute bottom-0 right-0 border-black border-r-2 border-b-2"></div>
          </div>
          <h3 ref={textRef} className="font-bold text-black text-xl">ABOUT US</h3>
        </div>
      </div>
    </div>
  );
};

export default GallerySection3;
