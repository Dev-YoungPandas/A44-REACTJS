import gsap from 'gsap/all';
import React, { useEffect, useRef } from 'react';
import { MdArrowOutward } from 'react-icons/md';
import SplitType from 'split-type';
import "../css/Section2.css";

const SplitBtn = ({
    borderColor = "black",
    h3TextColor = "black",
    blueBoxBgColor = "#00D0D2",
    arrowColor = "#fff", // Default value added
    bookRefBgColor = "#00D0D2", // Default value added
    label = "BOOK A CONSULTATION"
}) => {
    const frameRef = useRef();
    const bookRef = useRef();
    const textRef = useRef();
    const originalLetters = useRef([]);
    
    const arrowRef = useRef();
    const lineRefs = [useRef(), useRef(), useRef(), useRef()];

   
       useEffect(() => {
           if (textRef.current) {
               // Split text into words and characters
               const split = new SplitType(textRef.current, { types: "words, chars" });
               // Store original text for each character
               originalLetters.current = Array.from(textRef.current.querySelectorAll('.char')).map(char => char.innerHTML);
           }
       }, []);

       const animateText = () => {
        const chars = textRef.current.querySelectorAll(".char");
        // Kill any existing animations on the characters
        gsap.killTweensOf(chars);

        const lettersAndSymbols = "abcdefghijklmnopqrstuvwxyz!,".split("");

        chars.forEach((char, index) => {
            gsap.to(char, {
                duration: 0.03,
                repeat: 3,
                repeatDelay: 0.04,
                delay: (index + 1) * 0.07,
                onUpdate: () => {
                    // Set a random letter during animation
                    char.innerHTML = lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
                },
                onComplete: () => {
                    // Restore the original character after animation
                    char.innerHTML = originalLetters.current[index];
                }
            });
        });
    };

   

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
        bookRef.current.style.backgroundColor = bookRefBgColor;
        textRef.current.style.color = h3TextColor;
        lineRefs.forEach(line => line.current.style.borderColor = h3TextColor);

    
        animateText();
    };

    const handleMouseLeave = () => {
        gsap.to(frameRef.current, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            borderColor: borderColor,
        });
        gsap.to(arrowRef.current, {
            rotate: '0deg',
            duration: 0.5
        });
        bookRef.current.style.backgroundColor = "transparent";
        textRef.current.style.color = borderColor;
        lineRefs.forEach(line => line.current.style.borderColor = borderColor);
    };

  

    return (
        <div
            className="Button-section3 xl:w-[30vw] xl:h-[13vh] h-[10vh] w-[80vw] flex items-center gap-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={bookRef}
                className="xl:w-[20vw] w-[60vw] h-[13vh] border flex backdrop-blur-[8px] relative items-center justify-center"
            >
                <div ref={frameRef} className="xl:w-[20vw] w-[56vw] h-[9vh] xl:h-[13vh] absolute">
                    {lineRefs.map((ref, index) => (
                        <div key={index} ref={ref} className={`w-[20px] h-[20px] absolute ${index === 0 ? 'top-0 left-0 border-l-2 border-t-2' : 
                        index === 1 ? 'top-0 right-0 border-t-2 border-r-2' : 
                        index === 2 ? 'bottom-0 left-0 border-l-2 border-b-2' : 
                        'bottom-0 right-0 border-r-2 border-b-2'}`} 
                        style={{ borderColor }}></div>
                    ))}
                </div>
                <h3 ref={textRef} className="font-bold text-xl" style={{ color: h3TextColor }}>{label}</h3>
            </div>

            <div className="blueBox xl:w-[6vw] w-[20vw] h-[10vh] xl:h-[13vh] z-50 text-4xl font-bold flex items-center justify-center" style={{ backgroundColor: blueBoxBgColor }}>
                <MdArrowOutward ref={arrowRef} style={{ color: arrowColor }} />
            </div>
        </div>
    );
};

export default SplitBtn;
