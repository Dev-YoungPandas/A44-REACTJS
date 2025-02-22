import gsap from 'gsap/all';
import React, { useEffect, useRef } from 'react';
import { MdArrowOutward } from 'react-icons/md';
import SplitType from 'split-type';
import "../../css/Section2.css";



const AboutSection1 = () => {
    
    const H1Ref = useRef(null);
    const H1Ref2 = useRef(null);

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
        textRef.current.style.color = "black";
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
        textRef.current.style.color = "#00D0D2";
        line1Frame.current.style.borderColor = "#00D0D2";
        line2Frame.current.style.borderColor = "#00D0D2";
        line3Frame.current.style.borderColor = "#00D0D2";
        line4Frame.current.style.borderColor = "#00D0D2";
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



    useEffect(() => {
        const spanElement = H1Ref.current;
        const spanElement2 = H1Ref2.current;

        gsap.to(spanElement, {
            rotateX: 90,
            y: -22,
            duration: 0.7,
            color: "black",
            delay: 1,

        })

        gsap.to(spanElement2, {
            rotateX: 90,
            y: -22,
            duration: 0.7,
            color: "black",
            delay:1,

        })
    }, []);


    return (
        <div className="w-full py-[40vw] xl:py-[15vw] ">

            <img
                className="w-full fixed top-0 h-[100vh] object-cover"
                src="https://hype-tattoo.com/wp-content/themes/HYPE_studio/img/about-page/about-hero-image.jpg"
                alt="Background"
            />

            <div className="Main-Section1 w-full h-[65%] gap-10 flex xl:pt-[1vw] pt-[15vw] flex-col items-center justify-center">



                <div className='HeadTextAnimation '>
                    <h1 className='text-[7.29vw] font-bold text-center'>
                        <a href="#" className="flip-animate">
                            <span ref={H1Ref} className='text-white' data-hover="ABOUT">ABOUT</span>
                        </a>
                    </h1>
                    <h1 className='text-[7.29vw] text-center leading-[7vw] font-bold'>
                        <a href="#" className="flip-animate">
                            <span ref={H1Ref2} className='text-white' data-hover="OUR FAMILY">OUR FAMILY</span>
                        </a>
                    </h1>
                </div>


                <div
                    className="Button-section3 xl:w-[30vw] xl:h-[13vh] w-[80vw] h-[13vh] flex items-center gap-1"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div
                        ref={bookRef}
                        className="xl:w-[20vw] w-[60vw] h-[13vh] border border-gray-600 flex backdrop-blur-[8px] relative items-center justify-center"
                    >
                        <div ref={frameRef} className="xl:w-[20vw] w-[60vw] h-[13vh] absolute">
                            <div ref={line1Frame} className="w-[20px] h-[20px] absolute top-0 left-0 border-l-2 border-[#00D0D2] border-t-2"></div>
                            <div ref={line2Frame} className="w-[20px] h-[20px] absolute top-0 right-0 border-t-2 border-[#00D0D2] border-r-2"></div>
                            <div ref={line3Frame} className="w-[20px] h-[20px] absolute bottom-0 border-l-2 border-b-2 border-[#00D0D2] left-0"></div>
                            <div ref={line4Frame} className="w-[20px] h-[20px] absolute bottom-0 right-0 border-[#00D0D2] border-r-2 border-b-2"></div>
                        </div>
                        <h3 ref={textRef} className="font-bold text-[#00D0D2] text-[16px] xl:text-xl">BOOK A CONSULTATION</h3>
                    </div>

                    <div className="xl:w-[6vw] w-[20vw] h-[13vh] z-50 text-4xl font-bold flex items-center justify-center bg-[#00d0d2]">
                        <MdArrowOutward ref={arrowRef} />
                    </div>
                </div>
            </div>



        </div>
    );
};

export default AboutSection1;
