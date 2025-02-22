import React, { useEffect, useRef } from 'react'
import gsap from 'gsap/all'

import "../../css/Section2.css";
import { MdArrowOutward } from 'react-icons/md';
import SplitType from 'split-type';


const Footer = () => {

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
        <div className='w-full text-white  bg-[#00D0D2]'>

            <div className='w-full   pt-[5vw] px-[2.2vw] xl:flex xl:flex-row flex-col justify-between '>
                <div>
                    <p className='font-semibold xl:text-start text-center'>Lets Talk</p>

                    <h1 className='xl:text-[2.7vw] text-center text-[6.7vw] font-bold'>hypetattootoronto@gmail.com</h1>
                    <div className='xl:flex xl:flex-row flex-col gap-[3vw] mt-[3vw]'>
                        <div>
                            <p className='xl:text-[0.93vw] xl:text-start text-center text-[5vw]'>Phone</p>
                            <h3 className='xl:text-[1.8vw] xl:text-start text-center text-[5vw]'>+16479631488</h3>
                        </div>

                        <div>
                            <p className='xl:text-[0.93vw] xl:text-start text-center text-[5vw]'>Work time</p>
                            <h3 className='xl:text-[1.8vw] xl:text-start text-center text-[5vw]'>11AM - 8 PM</h3>
                        </div>
                    </div>

                    <div className='mt-[3vw]'>
                        <p className='xl:text-[0.93vw] xl:text-start text-center text-[5vw]'>Address</p>
                        <h3 className='xl:text-[1.8vw] xl:text-start text-center text-[5vw]'>758 Yonge St, Toronto</h3>
                    </div>
                </div>
                <div>
                    <p className='xl:text-start text-center'>Instagram</p>

                    <h1 className='xl:text-[2.7vw] xl:text-start text-center text-[6vw] font-bold'>hypetattoo_toronto</h1>


                    <div
                        className="Button-section3 xl:w-[30vw] xl:h-[13vh] w-[80vw] h-[13vh] mt-[3vh] ml-[7vw] xl:ml-0 mb-[3vw] mb-0 flex items-center gap-1"
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

                        <div className="xl:w-[6vw] w-[20vw] h-[13vh] z-50 text-4xl font-bold flex items-center justify-center bg-[#000]">
                            <MdArrowOutward ref={arrowRef} />
                        </div>
                    </div>


                </div>
                <div className='xl:flex xl:flex-col flex-row flex justify-between xl:justify-normal items-center xl:items-end'>
                    <p>Menu</p>

                    <h4 className='xl:text-[1.8vw] text-[5vw]'>Main Page</h4>
                    <h4 className='xl:text-[1.8vw] text-[5vw]'>About us</h4>
                    <h4 className='xl:text-[1.8vw] text-[5vw]'>Price</h4>
                    <h4 className='xl:text-[1.8vw] text-[5vw]'>Gallery</h4>
                </div>
            </div>
            <div className='xl:flex-row xl:flex flex flex-col xl:items-end  items-center justify-between  mt-[2vw] px-[2.2vw]'>
                <h1 className='xl:text-[14.7vw] text-center  text-[33vw] font-bold'>HYPE</h1>


                <div className='xl:text-[1.8vw] text-[4vw]  text-start xl:text-end'>
                    <p>(C) HYPE 2024</p>
                    <p>ALL RIGHTS RESERVED</p>
                </div>
            </div>

        </div>
    )
}

export default Footer
