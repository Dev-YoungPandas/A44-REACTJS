import React, { useEffect, useRef } from 'react'
import ViewallWorkBtn from './ViewallWorkBtn'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap/all'

import "../../css/Section2.css";
import { MdArrowOutward } from 'react-icons/md';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);


const Section7 = () => {
    const imageRef = useRef(null);

    const H1Ref = useRef();
    const H1Ref2 = useRef();

    const textRef = useRef();
    const originalLetters = useRef([]);

  const frameRef = useRef();
  const bookRef = useRef();

  const arrowRef = useRef();
  const line1Frame = useRef();
  const line2Frame = useRef();
  const line3Frame = useRef();
  const line4Frame = useRef();


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
    bookRef.current.style.backgroundColor = "#00D0D2";
    textRef.current.style.color = "black";
    line1Frame.current.style.borderColor = "#00D0D2";
    line2Frame.current.style.borderColor = "#00D0D2";
    line3Frame.current.style.borderColor = "#00D0D2";
    line4Frame.current.style.borderColor = "#00D0D2";

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
    textRef.current.style.color = "black";
    line1Frame.current.style.borderColor = "black";
    line2Frame.current.style.borderColor = "black";
    line3Frame.current.style.borderColor = "black";
    line4Frame.current.style.borderColor = "black";
};



    useEffect(() => {
        const spanElement = H1Ref.current;
        const spanElement2 = H1Ref2.current;

        gsap.to(spanElement, {
            rotateX: 90,
            y: -22,
            duration: 0.7,
            color: "black",
            scrollTrigger: {
                trigger: spanElement,
                start: "top 80%",
                toggleActions: "play none none reverse",
                scrub: 2,
            },
        })
        gsap.to(spanElement2, {
            rotateX: 90,
            y: -22,
            duration: 0.7,
            color: "black",
            delay: 1,
            scrollTrigger: {
                trigger: spanElement2,
                start: "top 90%",
                toggleActions: "play none none reverse",
                scrub: 2,
            },
        });
    }, []);


    useEffect(() => {
        const mm = gsap.matchMedia();
    
        // For desktop and tablet devices
        mm.add("(min-width: 768px)", () => {
          gsap.to(imageRef.current, {
            y: "-50vw", // Moves the image upward by 50% of the viewport width
            ease: "power1.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          });
        });
    
        // For mobile devices
        mm.add("(max-width: 767px)", () => {
          gsap.to(imageRef.current, {
            y: "-50vh", // Moves the image upward by 50% of the viewport height for mobile
            ease: "power1.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          });
        });
    
        return () => {
          mm.revert(); // Cleanup the matchMedia listeners on component unmount
        };
      }, []);



    return (
        <div className='w-full relative xl:h-[140vh] h-[90vh]'>
            <div className='w-full h-[25vh] flex items-center justify-center '>
                <h5 className='xl:text-[18px] font-bold xl:tracking-[16px]'>HYPE TATTOO TORONTO</h5>
            </div>

            <img ref={imageRef} data-scroll data-scroll-speed="-1" className=' xl:w-[35vw] w-[80vw] absolute z-[99999] top-[50vh] right-[12vw] object-cover object-top' src="https://hype-tattoo.com/wp-content/themes/HYPE_studio/img/gift-card.png" alt="" />

            <div className='px-[3vw] flex flex-col xl:items-start items-center '>
                <p className='xl:text-[1.9vw] text-[4vw] xl:text-start text-center font-extrabold'>Share the joy of creativity <br /> and self-expression with <br /> those you love!</p>
                <div className=' mt-[4vh]'>

                    <div
                        className="Button-section3 xl:w-[30vw] xl:h-[13vh] w-[80vw] h-[13vh]  flex items-center gap-1"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div
                            ref={bookRef}
                            className=" xl:w-[20vw] w-[60vw] xl:h-[13vh] h-[10vh] border border-gray-600 flex backdrop-blur-[8px] relative items-center justify-center"
                        >
                            <div ref={frameRef} className="xl:w-[20vw] w-[56vw] xl:h-[13vh] h-[9vh] absolute">
                                <div ref={line1Frame} className="w-[20px] h-[20px] absolute top-0 left-0 border-l-2 border-[#000] border-t-2"></div>
                                <div ref={line2Frame} className="w-[20px] h-[20px] absolute top-0 right-0 border-t-2 border-[#000] border-r-2"></div>
                                <div ref={line3Frame} className="w-[20px] h-[20px] absolute bottom-0 border-l-2 border-b-2 border-[#000] left-0"></div>
                                <div ref={line4Frame} className="w-[20px] h-[20px] absolute bottom-0 right-0 border-[#000] border-r-2 border-b-2"></div>
                            </div>
                            <h3 ref={textRef} className="font-bold text-[#000] text-[16px] xl:text-xl">BOOK A CONSULTATION</h3>
                        </div>

                        <div className="xl:w-[6vw] w-[20vw] xl:h-[13vh] h-[10vh] z-50 text-4xl font-bold flex items-center justify-center bg-[#00d0d2]">
                            <MdArrowOutward ref={arrowRef} />
                        </div>
                    </div>

                </div>


                <h1 className='text-[14.5vw] font-bold'>GIFT</h1>
                <h1 className='text-[14.5vw] font-bold leading-[4vw]'>CERTIFICATE</h1>



            </div>

        </div>
    )
}

export default Section7
