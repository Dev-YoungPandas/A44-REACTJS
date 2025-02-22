import { useEffect } from "react";
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

class TextSplitter {
    constructor(textElement) {
        if (!textElement || !(textElement instanceof HTMLElement)) {
            throw new Error("Invalid text element provided.");
        }
        this.textElement = textElement;
        this.splitText = new SplitType(this.textElement, { types: "words, chars" });
    }

    getChars() {
        return this.splitText.chars;
    }
}

const lettersAndSymbols = "abcdefghijklmnopqrstuvwxyz!@#$%^&*-_=+;:<>,".split("");

class TextAnimator {
    constructor(textElement) {
        if (!textElement || !(textElement instanceof HTMLElement)) {
            throw new Error("Invalid text element provided.");
        }
        this.textElement = textElement;
        this.splitter = new TextSplitter(this.textElement);
        this.originalChars = this.splitter.getChars().map((char) => char.innerHTML);
    }

    animate() {
        this.reset();
        const chars = this.splitter.getChars();

        chars.forEach((char, position) => {
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
                        if (repeatCount === 1) gsap.set(char, { "--opa": 0 });
                    },
                    repeatDelay: 0.04,
                    delay: (position + 1) * 0.07,
                    innerHTML: () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
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

const ListItem = ({ text }) => {
    useEffect(() => {
        const element = document.querySelector(`.hover-effect[data-text='${text}']`);
        if (!element) return;

        const animator = new TextAnimator(element);
        element.addEventListener("mouseenter", () => animator.animate());

        return () => element.removeEventListener("mouseenter", () => animator.animate());
    }, [text]);

    return (
        <li className="list__item">
            <span className="hover-effect" data-text={text}>{text}</span>
        </li>
    );
};


const HoverText = () => {
    return (
        <main>
            <section className="content">
                <ul className="list">
                    <ListItem text="Mount Vespera" />
                    <ListItem text="Helion Peak" />
                </ul>
            </section>
        </main>
    )
}

export default HoverText
