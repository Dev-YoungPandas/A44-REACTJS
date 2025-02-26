import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { MdArrowOutward } from 'react-icons/md';
import "../../css/FlipTextAnimation.css";
import "../../css/Section2.css";





const Section1 = () => {

    const H1Ref = useRef(null);
    const H1Ref2 = useRef(null);
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


    useEffect(() => {

        gsap.from("#section1-Btn", {
            y: 200,
            opacity: 0,
            duration: 1,
        })
    }, [])

    useEffect(() => {
        const spanElement = H1Ref.current;
        const spanElement2 = H1Ref2.current;

        gsap.to(spanElement, {
            rotateX: 90,
            y: -22,
            duration: 0.5,
            color: "black",
            delay: 1,

        })

        gsap.to(spanElement2, {
            rotateX: 90,
            y: -22,
            duration: 0.7,
            color: "black",
            delay: 1,

        })
    }, []);



    return (
        <div
            id="main"
            className="w-full bg-cover bg-top"
            style={{
                backgroundImage:
                    "url('https://hype-tattoo.com/wp-content/themes/HYPE_studio/img/about-page/about-hero-bg.jpg')"
            }}
        >


            <div className="Main-Section1 w-full h-[65%] gap-10 flex pt-[0vw] xl:pt-[10vw] flex-col items-center justify-center">



                <div className='HeadTextAnimation xl:mt-0 mt-[60vw]'>
                    <h1 className='xl:text-[7.29vw] text-[13vw] font-bold text-center'>
                        <a href="#" className="flip-animate">
                            <span ref={H1Ref} className='text-white' data-hover="WE MAKE ART">WE MAKE ART</span>
                        </a>
                    </h1>
                    <h1 className='xl:text-[7.29vw] text-[13vw] text-center leading-[7vw] font-bold'>
                        <a href="#" className="flip-animate">
                            <span ref={H1Ref2} className='text-white' data-hover="JUST TATTOOS">JUST TATTOOS</span>
                        </a>
                    </h1>
                </div>

                <div id='section1-Btn'
                    className="Button-section3 xl:w-[30vw] xl:h-[13vh] w-[80vw] xl:mt-0  h-[10vh] flex items-center gap-1"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div
                        ref={bookRef}
                        className="xl:w-[20vw] w-[60vw] h-[10vh] xl:h-[13vh] border border-gray-600 flex backdrop-blur-[8px] relative items-center justify-center"
                    >
                        <div ref={frameRef} className="xl:w-[20vw] w-[56vw] xl:h-[13vh] h-[9vh] absolute">
                            <div ref={line1Frame} className="w-[20px] h-[20px] absolute top-0 left-0 border-l-2 border-[#00D0D2] border-t-2"></div>
                            <div ref={line2Frame} className="w-[20px] h-[20px] absolute top-0 right-0 border-t-2 border-[#00D0D2] border-r-2"></div>
                            <div ref={line3Frame} className="w-[20px] h-[20px] absolute bottom-0 border-l-2 border-b-2 border-[#00D0D2] left-0"></div>
                            <div ref={line4Frame} className="w-[20px] h-[20px] absolute bottom-0 right-0 border-[#00D0D2] border-r-2 border-b-2"></div>
                        </div>
                        <h3 ref={textRef} className="font-bold text-[#00D0D2] text-[16px] xl:text-xl">BOOK A CONSULTATION</h3>
                    </div>

                    <div className="xl:w-[6vw] w-[20vw] h-[10vh] xl:h-[13vh] z-50 text-4xl font-bold flex items-center justify-center bg-[#00d0d2]">
                        <MdArrowOutward ref={arrowRef} />
                    </div>
                </div>

            </div>

            <div className="w-full h-[10vh] mt-[12vh]  text-[1.1vw]  flex items-center justify-between px-7 font-semibold text-[#c5c9c6]">
                <h3>Based on Toronto,Canada</h3>
                <h3>(©2024)</h3>
                <h3>Scroll Down</h3>
            </div>
        </div>
    );
};

export default Section1;
