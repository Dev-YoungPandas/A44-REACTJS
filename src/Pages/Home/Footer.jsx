import { useEffect, useRef } from 'react'
import gsap from 'gsap/all'

import "../../css/Section2.css";
import { MdArrowOutward } from 'react-icons/md';
import SplitType from 'split-type';
import { Link } from 'react-router-dom';


const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

// Text splitter utility
class TextSplitter {
    constructor(textElement, options = {}) {
        if (!textElement || !(textElement instanceof HTMLElement)) {
            throw new Error("Invalid text element provided.");
        }

        const { resizeCallback, splitTypeTypes } = options;
        this.textElement = textElement;
        this.onResize = typeof resizeCallback === "function" ? resizeCallback : null;
        this.splitText = new SplitType(this.textElement, { types: splitTypeTypes });

        if (this.onResize) {
            this.initResizeObserver();
        }
    }

    initResizeObserver() {
        this.previousContainerWidth = null;
        let resizeObserver = new ResizeObserver(
            debounce((entries) => this.handleResize(entries), 100)
        );
        resizeObserver.observe(this.textElement);
    }

    handleResize(entries) {
        const [{ contentRect }] = entries;
        const width = Math.floor(contentRect.width);
        if (this.previousContainerWidth && this.previousContainerWidth !== width) {
            this.splitText.split();
            this.onResize();
        }
        this.previousContainerWidth = width;
    }

    revert() {
        return this.splitText.revert();
    }

    getChars() {
        return this.splitText.chars;
    }
}

// Hover animation
class TextAnimator {
    constructor(textElement) {
        if (!textElement || !(textElement instanceof HTMLElement)) {
            throw new Error("Invalid text element provided.");
        }

        this.textElement = textElement;
        this.splitText();
    }

    splitText() {
        this.splitter = new TextSplitter(this.textElement, {
            splitTypeTypes: "words, chars",
        });

        this.originalChars = this.splitter.getChars().map((char) => char.innerHTML);
    }

    animate() {
        this.reset();
        const chars = this.splitter.getChars();
        const lettersAndSymbols = "abcdefghijklmnopqrstuvwxyz!@#$%^&*-_=+:;<>,".split("");

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
    }

    reset() {
        const chars = this.splitter.getChars();
        chars.forEach((char, index) => {
            gsap.killTweensOf(char);
            char.innerHTML = this.originalChars[index];
        });
    }
}

const Footer = () => {

    const textRef = useRef();

    const frameRef = useRef();
    const bookRef = useRef();
    const originalLetters = useRef([]);

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
    
     useEffect(() => {
            document.querySelectorAll(".nav-link").forEach((item) => {
                const animator = new TextAnimator(item);
                item.addEventListener("mouseenter", () => animator.animate());
            });
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
        bookRef.current.style.backgroundColor = "black";
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
                        className="Button-section3 xl:w-[30vw] bg-[black] xl:bg-transparent xl:h-[13vh] w-[80vw] h-[10vh] mt-[3vh] ml-[7vw] xl:ml-0 mb-[3vw]  flex items-center gap-1"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div
                            ref={bookRef}
                            className="xl:w-[20vw] w-[60vw] xl:h-[13vh] h-[10vh] border border-gray-600 flex backdrop-blur-[8px] relative items-center justify-center"
                        >
                            <div ref={frameRef} className="xl:w-[20vw] w-[56vw] xl:h-[13vh] h-[9vh] absolute">
                                <div ref={line1Frame} className="w-[20px] h-[20px] absolute top-0 left-0 border-l-2 border-[#00D0D2]  xl:border-[#000] border-t-2"></div>
                                <div ref={line2Frame} className="w-[20px] h-[20px] absolute top-0 right-0 border-t-2 border-[#00D0D2] xl:border-[#000] border-r-2"></div>
                                <div ref={line3Frame} className="w-[20px] h-[20px] absolute bottom-0 border-l-2 border-b-2 border-[#00D0D2] xl:border-[#000] left-0"></div>
                                <div ref={line4Frame} className="w-[20px] h-[20px] absolute bottom-0 right-0 border-[#00D0D2] xl:border-[#000] border-r-2 border-b-2"></div>
                            </div>
                            <h3 ref={textRef} className="font-bold xl:text-[#000] text-[#00D0D2] text-[16px] xl:text-xl">BOOK A CONSULTATION</h3>
                        </div>

                        <div className="xl:w-[6vw] w-[20vw] xl:h-[13vh] h-[10vh] z-50 text-4xl font-bold flex items-center justify-center bg-[#000]">
                            <MdArrowOutward ref={arrowRef} />
                        </div>
                    </div>


                </div>
                <div className='flex flex-col justify-normal items-start xl:mt-0 mt-[4vh] xl:items-end'>
                    <p className=' xl:text-[1.8vw] text-[5vw]'>Menu</p>

                    <Link to='/' className=' xl:text-[1.8vw] text-[7vw]'>Main Page</Link>
                    <Link to='/about' className=' xl:text-[1.8vw] text-[7vw]'>About us</Link>
                    <Link to='/' className=' xl:text-[1.8vw] text-[7vw]'>Price</Link>
                    <Link to='/gallery' className='n xl:text-[1.8vw] text-[7vw]'>Gallery</Link>
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
