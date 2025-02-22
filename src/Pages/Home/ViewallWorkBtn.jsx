import React, {
    useLayoutEffect,
    useRef,
    useImperativeHandle,
    forwardRef
  } from 'react';
  import gsap from 'gsap';
  import SplitType from 'split-type';
  import { MdArrowOutward } from "react-icons/md";
  
  // Debounce helper
  const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };
  
  //////////////////////////////////////////////
  // TEXT SPLITTER & ANIMATOR (unchanged logic)
  //////////////////////////////////////////////
  
  class TextSplitter {
    constructor(textElement, options = {}) {
      if (!textElement || !(textElement instanceof HTMLElement)) {
        throw new Error('Invalid text element provided.');
      }
      const { resizeCallback, splitTypeTypes } = options;
      this.textElement = textElement;
      this.onResize =
        typeof resizeCallback === 'function' ? resizeCallback : null;
  
      const splitOptions = splitTypeTypes ? { types: splitTypeTypes } : {};
      this.splitText = new SplitType(this.textElement, splitOptions);
  
      if (this.onResize) {
        this.initResizeObserver();
      }
    }
  
    initResizeObserver() {
      this.previousContainerWidth = null;
      const resizeObserver = new ResizeObserver(
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
  
    getLines() {
      return this.splitText.lines;
    }
  
    getWords() {
      return this.splitText.words;
    }
  
    getChars() {
      return this.splitText.chars;
    }
  }
  
  const lettersAndSymbols = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ','
  ];
  
  class TextAnimator {
    constructor(textElement) {
      if (!textElement || !(textElement instanceof HTMLElement)) {
        throw new Error('Invalid text element provided.');
      }
      this.textElement = textElement;
      this.splitText();
    }
  
    splitText() {
      // Split text into words and characters
      this.splitter = new TextSplitter(this.textElement, {
        splitTypeTypes: 'words, chars'
      });
      // Save the original content of each character
      this.originalChars = this.splitter.getChars().map(char => char.innerHTML);
    }
  
    animate() {
      // Reset any previous animations
      this.reset();
      const chars = this.splitter.getChars();
  
      chars.forEach((char, position) => {
        const initialHTML = char.innerHTML;
        let repeatCount = 0;
  
        gsap.fromTo(
          char,
          { opacity: 0 },
          {
            duration: 0.03,
            onStart: () => {
              gsap.set(char, { '--opa': 1 });
            },
            onComplete: () => {
              gsap.set(char, { innerHTML: initialHTML, delay: 0.03 });
            },
            repeat: 3,
            onRepeat: () => {
              repeatCount++;
              if (repeatCount === 1) {
                gsap.set(char, { '--opa': 0 });
              }
            },
            repeatRefresh: true,
            repeatDelay: 0.04,
            delay: (position + 1) * 0.07,
            innerHTML: () =>
              lettersAndSymbols[
                Math.floor(Math.random() * lettersAndSymbols.length)
              ],
            opacity: 1
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
  
  /////////////////////////////////////////////////////
  // HOVER TEXT COMPONENT (exposing animate/reset)
  /////////////////////////////////////////////////////
  
  const HoverText = forwardRef(({ text, className = '' }, ref) => {
    const textRef = useRef(null);
    const animatorRef = useRef(null);
  
    useImperativeHandle(ref, () => ({
      animate: () => {
        if (animatorRef.current) {
          animatorRef.current.animate();
        }
      },
      reset: () => {
        if (animatorRef.current) {
          animatorRef.current.reset();
        }
      }
    }));
  
    // useLayoutEffect to ensure the DOM is fully rendered
    useLayoutEffect(() => {
      if (textRef.current) {
        animatorRef.current = new TextAnimator(textRef.current);
      }
      return () => {
        if (animatorRef.current) {
          animatorRef.current.reset();
        }
      };
    }, [text]);
  
    return (
      <span
        className={`list__item-col hover-effect hover-effect--cursor-square ${className}`}
        ref={textRef}
      >
        {text}
      </span>
    );
  });
  
  /////////////////////////////////////////////////////
  // BUTTON COMPONENT THAT TRIGGERS THE TEXT ANIMATION
  /////////////////////////////////////////////////////
  
  const ViewallWorkBtn = ({
    label = "VIEW ALL WORK",
    borderColor = "black",
    boxBgColor = "#00d0d2",
    textColor = "black",
    IconColor = "black"
  }) => {
    const bookRef = useRef(null);
    const arrowRef = useRef(null);
    const frameRef = useRef(null);
    const hoverTextRef = useRef(null);
  
    const handleMouseEnter = () => {
      // Animate the frame and arrow
      gsap.to(frameRef.current, {
        scale: 0.9,
        duration: 0.5,
        ease: "power2.out"
      });
      bookRef.current.style.backgroundColor = "#00d0d2";
      gsap.to(arrowRef.current, {
        rotate: "360deg",
        duration: 0.5
      });
      // Trigger the text split animation
      if (hoverTextRef.current) {
        hoverTextRef.current.animate();
      }
    };
  
    const handleMouseLeave = () => {
      gsap.to(frameRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
      bookRef.current.style.backgroundColor = "transparent";
      gsap.to(arrowRef.current, {
        rotate: "0deg",
        duration: 0.5
      });
      // Reset the text to its original state
      if (hoverTextRef.current) {
        hoverTextRef.current.reset();
      }
    };
  
    return (
      <div className='w-full flex justify-center'>
        <div className='w-[30vw] h-[13vh] flex mt-10 items-center gap-1'>
          <div
            ref={bookRef}
            className='w-[20vw] h-[13vh] cursor-pointer border border-gray-600 flex backdrop-blur-[8px] relative items-center justify-center'
          >
            <div
              ref={frameRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className='w-[20vw] h-[13vh] absolute cursor-pointer'
            >
              <div
                className='w-[20px] h-[20px] absolute top-0 left-0 border-l-2 border-t-2'
                style={{ borderColor }}
              ></div>
              <div
                className='w-[20px] h-[20px] absolute top-0 right-0 border-t-2 border-r-2'
                style={{ borderColor }}
              ></div>
              <div
                className='w-[20px] h-[20px] absolute bottom-0 left-0 border-l-2 border-b-2'
                style={{ borderColor }}
              ></div>
              <div
                className='w-[20px] h-[20px] absolute bottom-0 right-0 border-r-2 border-b-2'
                style={{ borderColor }}
              ></div>
            </div>
            <h3 className='font-bold text-xl' style={{ color: textColor }}>
              {/* Pass a ref to HoverText so its methods can be controlled */}
              <HoverText ref={hoverTextRef} text={label} />
            </h3>
          </div>
          <div
            id='box'
            className='w-[6vw] h-[13vh] text-4xl font-bold flex items-center justify-center'
            style={{ backgroundColor: boxBgColor }}
          >
            <MdArrowOutward ref={arrowRef} style={{ color: IconColor }} />
          </div>
        </div>
      </div>
    );
  };
  
  export default ViewallWorkBtn;
  