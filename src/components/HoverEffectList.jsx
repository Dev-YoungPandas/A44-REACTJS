import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import "../css/HoverEffect.css";

// Debounce helper function
const debounce = (func, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

// Class to split text using SplitType
class TextSplitter {
  constructor(textElement, options = {}) {
    if (!textElement || !(textElement instanceof HTMLElement)) {
      throw new Error('Invalid text element provided.');
    }
    const { resizeCallback, splitTypeTypes } = options;
    this.textElement = textElement;
    this.onResize = typeof resizeCallback === 'function' ? resizeCallback : null;

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

  // Reset text to its original state
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

// A constant array of letters and symbols for the animation effect
const lettersAndSymbols = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
  'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ','
];

// Class to create and control the text animation
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
    // Reset any ongoing animations
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
            lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
          opacity: 1
        }
      );
    });
  }

  reset() {
    // Kill any ongoing GSAP animations and reset the text
    const chars = this.splitter.getChars();
    chars.forEach((char, index) => {
      gsap.killTweensOf(char);
      char.innerHTML = this.originalChars[index];
    });
  }
}

// React component for hoverable text
const HoverText = ({ text, className = '' }) => {
  const textRef = useRef(null);
  const animatorRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      animatorRef.current = new TextAnimator(textRef.current);
    }
    // Cleanup on unmount
    return () => {
      if (animatorRef.current) {
        animatorRef.current.reset();
      }
    };
  }, [text]);

  const handleMouseEnter = () => {
    if (animatorRef.current) {
      animatorRef.current.animate();
    }
  };

  return (
    <span
      className={`list__item-col hover-effect hover-effect--cursor-square ${className}`}
      ref={textRef}
      onMouseEnter={handleMouseEnter}
    >
      {text}
    </span>
  );
};

// React component rendering the list of hover effects
const HoverEffectList = () => {
  return (
    <section className="content">
      <ul className="list list--box">
        <li className="list__item">
          <HoverText text="Mount Vespera" />
        </li>
        <li className="list__item">
          <HoverText text="Helion Peak" />
        </li>
      </ul>
    </section>
  );
};

export default HoverEffectList;
