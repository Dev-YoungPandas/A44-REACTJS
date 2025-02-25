import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/HoverEffect.css";
import gsap from "gsap";
import SplitType from "split-type";

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

const Nav = () => {

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const screenWidth = window.innerWidth;

        if (isOpen) {
            gsap.to(".MenuSection", {
                right: "0vw",
                duration: 1,
                ease: "power2.out"
            });
        } else {
            gsap.to(".MenuSection", {
                right: screenWidth <= 1024 ? "-100vw" : "-50vw",
                duration: 1,
                ease: "power2.out"
            });
        }
    }, [isOpen]);


    useEffect(() => {
        document.querySelectorAll(".nav-link").forEach((item) => {
            const animator = new TextAnimator(item);
            item.addEventListener("mouseenter", () => animator.animate());
        });
    }, []);



    return (
        <div className="w-full absolute font-semibold text-[17px] text-white z-[9999] flex items-center px-6 justify-between h-[12vh]">
            <div>
                <Link className=" text-white" to='/'>LOGO</Link>
            </div>
            <div className="flex gap-8">
                <Link to="/" className="nav-link">Main</Link>
                <Link to="/about" className="nav-link">About Us</Link>
                <Link className="nav-link">Price</Link>
                <Link to="/gallery" className="nav-link">Gallery</Link>
                <h3 onClick={() => setIsOpen(true)} className="cursor-pointer">Menu</h3>
            </div>

            <div className="MenuSection xl:w-[50vw] w-[100%] p-[2vw]  h-[100vh] bg-[#00d0d2] fixed right-[-100vw]  xl:right-[-50vw] top-0">
                <div>
                    <div className="text-white flex items-center mb-[3vw] p-2 pt-4 justify-between" >
                        <span className="xl:text-[2.2vw] text-[7vw] font-bold leading-[2.9vw] ">[ Menu ]</span>
                        <span onClick={() => setIsOpen(false)} className="xl:text-[2.2vw] text-[7vw] cursor-pointer font-bold leading-[2.9vw] ">Close</span>
                    </div>

                    <div>
                        <ul className="flex text-black flex-col xl:pt-0 pt-[9vw] xl:items-start items-center justify-between gap-[3vw] xl:gap-[0vw] ">
                            <li>
                                <Link to='/about' className="xl:text-[4vw] text-[12vw] font-bold transition">ABOUT US</Link>
                            </li>
                            <li>
                                <p className="xl:text-[4vw] text-[12vw] font-bold transition">ARTIST</p>
                            </li>
                            <li>
                                <p className="xl:text-[4vw] text-[12vw] font-bold transition">PRICE</p>
                            </li>
                            <li>
                                <Link to='/gallery' className="xl:text-[4vw] text-[12vw] font-bold transition">GALLERY</Link>
                            </li>
                            <li>
                                <p className="xl:text-[4vw] text-[12vw] font-bold transition">CONTACT</p>
                            </li>
                        </ul>
                    </div>


                    <div className="xl:mt-[4vw] mt-[9vw]">
                        <p className="text-center xl:text-start text-2xl">[ GET IN TOUCH ]</p>
                        <h5 className="text-center text-xl xl:text-start">HYPETATTOOTORONTO@GMAIL.COM</h5>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Nav;
