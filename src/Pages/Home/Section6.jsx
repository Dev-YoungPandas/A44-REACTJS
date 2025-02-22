import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../css/Section6.css';
import "../../css/Section2.css";
import { MdArrowOutward } from 'react-icons/md';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const Section6 = () => {



    const H1Ref = useRef();
    const H1Ref2 = useRef();

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
            },
        })
        gsap.to(spanElement2, {
            rotateX: 90,
            y: -22,
            duration: 0.7,
            color: "black",
            delay: 0.5,
            scrollTrigger: {
                trigger: spanElement,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });
    }, []);



    useEffect(() => {
        gsap.from(".contactBox", {
            y: 200,
            duration: 0.6,
            opacity: 0,
            scrollTrigger: {
                trigger: ".contactBox",
                start: "top 120%",
                end: "top 119%",
                scrub: 2
            }
        })
    }, []);

    return (
        <div className="mainContactSec w-full bg-white mt-1  flex items-center justify-center">
            <div
                className="bg-cover bg-center pt-[10vw]  flex items-center justify-between flex-col py-[6vw] w-[100%] xl:w-[95%] h-[90%]"
                style={{
                    backgroundImage:
                        "url('https://hype-tattoo.com/wp-content/themes/HYPE_studio/img/main-page/about/central.jpg')",
                }}
            >

                <div className='HeadTextAnimation'>
                    <h1 className='text-[7vw] text-center font-bold '>
                        <a href="#" className="flip-animate">
                            <span ref={H1Ref} className='text-white' data-hover="GET A FREE">GET A FREE</span>
                        </a>

                    </h1>
                    <h1 className='text-[7vw] mt-[-2vw] text-center font-bold '>
                        <a href="#" className="flip-animate">
                            <span ref={H1Ref2} className='text-white' data-hover="CONSULTATION">CONSULTATION</span>
                        </a>

                    </h1>
                </div>


                <div className="contactBox w-[90vw] xl:w-[73vw] flex-col xl:flex-row  xl:flex bg-[#00d0d2]">
                    <div className='xl:w-[50%] w-[100%] py-3 p-[2vw] text-[#00d0d2] h-full bg-white'>
                        <div className='mt-3'>
                            <p>Full Name*</p>
                            <input className=' border-b border-black w-[95%] outline-0' type="text" />
                        </div>
                        <div className='mt-6'>
                            <p>E-mail*</p>
                            <input className=' border-b border-black w-[95%] outline-0' type="email" />
                        </div>
                        <div className='mt-6'>
                            <p>Phone Number*</p>
                            <input className=' border-b border-black w-[95%] outline-0' type="number" />
                        </div>
                        <div className='mt-6'>
                            <p>Instagram (optional)*</p>
                            <input className=' border-b border-black w-[95%] outline-0' type="text" />
                        </div>
                        <div className='mt-6'>
                            <p>About Project (optional)</p>
                            <input className=' border-b border-black w-[95%] outline-0' type="text" />
                        </div>
                    </div>
                    <div className='xl:w-[50%] w-[100%] p-[2vw]  h-full bg-[#00d0d2]'>
                        <div className=''>
                            <p className='font-semibold'>In addition to the consultation</p>

                            <h4 className='text-2xl font-extrabold'>A TEAM OF OUR MASTERS WILL <br /> HELP YOU CREATE A FREE SKETCH</h4>

                            <p className='font-semibold mt-4'>We will select a suitable artist who will be ready to realize <br /> even the most daring ideas of your tattoos</p>
                        </div>


                        <div className='pt-5 mt-[4vh]'>
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

                                <div className="xl:w-[6vw] w-[20vw] h-[13vh] z-50 text-4xl text-white font-bold flex items-center justify-center bg-black">
                                    <MdArrowOutward ref={arrowRef} />
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section6;
