import React, { useEffect, useRef } from 'react';
import '../../css/Carousel.css';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";



const Carousel = () => {
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  const slides = [
    { src: "https://hype-tattoo.com/wp-content/uploads/2024/12/Exis7.jpg", alt: "Slide 1" },
    { src: "https://hype-tattoo.com/wp-content/uploads/2024/12/Lensa3.jpg", alt: "Slide 1" },
    { src: "https://hype-tattoo.com/wp-content/uploads/2024/12/Ruslan2-scaled.jpg", alt: "Slide 1" },
    { src: "https://hype-tattoo.com/wp-content/uploads/2024/12/Lensa7.jpg", alt: "Slide 1" },
    
    {
      src: "https://images.unsplash.com/photo-1739455146717-4f05b6f2d2ec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
      alt: "Slide 1",
      nested: true,
    },
    { src: "https://hype-tattoo.com/wp-content/uploads/2024/12/Yurii15-scaled.jpg", alt: "Slide 1" },
    { src: "https://hype-tattoo.com/wp-content/uploads/2024/12/Demus6.jpg", alt: "Slide 1" },
    { src: "https://hype-tattoo.com/wp-content/uploads/2024/12/Yurii16-scaled.jpg", alt: "Slide 1" },
    { src: "https://hype-tattoo.com/wp-content/uploads/2024/12/Zey6.jpg", alt: "Slide 1" },
    { src: "https://hype-tattoo.com/wp-content/uploads/2024/12/Yurii12-scaled.jpg", alt: "Slide 1" },
  ];

  useEffect(() => {
    let width, height, totalWidth, margin = 20;
    let currIndex = 0;
    let interval;
    const intervalTime = 4000;

    const resize = () => {
      width = Math.max(window.innerWidth * 0.28, 275);
      height = window.innerHeight * 0.75;
      const items = sliderRef.current.children;
      totalWidth = width * items.length;
      sliderRef.current.style.width = `${totalWidth}px`;

      for (let i = 0; i < items.length; i++) {
        items[i].style.width = (width - margin * 2) + "px";
        items[i].style.height = height + "px";
      }
    };

    const move = (index) => {
      const items = sliderRef.current.children;
      if (index < 1) index = items.length;
      if (index > items.length) index = 1;
      currIndex = index;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const box = item.querySelector('.item__3d-frame');
        if (i === index - 1) {
          item.classList.add('carousel__slider__item--active');
          if (box) {
            box.style.transform = "perspective(1200px)";
          }
        } else {
          item.classList.remove('carousel__slider__item--active');
          if (box) {
            box.style.transform =
              "perspective(1200px) rotateY(" + (i < index - 1 ? 40 : -40) + "deg)";
          }
        }
      }
      sliderRef.current.style.transform =
        "translate3d(" +
        ((index * -width) + (width / 2) + window.innerWidth / 2) +
        "px, 0, 0)";
    };

    const timer = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        move(++currIndex);
      }, intervalTime);
    };

    const prev = () => {
      move(--currIndex);
      timer();
    };

    const next = () => {
      move(++currIndex);
      timer();
    };

    resize();
    const items = sliderRef.current.children;
    move(Math.floor(items.length / 2) + 1);

    window.addEventListener('resize', resize);
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    timer();

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
      prevBtn.removeEventListener('click', prev);
      nextBtn.removeEventListener('click', next);
    };
  }, []);

  return (
    <div className="carousel" ref={carouselRef}>
      <div className="carousel__body">
        <div className="carousel__prev flex items-center justify-center relative" ref={prevBtnRef}>
        <IoIosArrowBack className='' />

        </div>
        <div className="carousel__next flex items-center justify-center" ref={nextBtnRef}>
        <IoIosArrowForward />

        </div>
        <div className="carousel__slider bg-green-300" ref={sliderRef}>
          {slides.map((slide, index) => (
            <div className="carousel__slider__item" key={index}>
              <div className="item__3d-frame bg-amber-200">
                {slide.nested ? (
                  <div className="item__3d-frame__box item__3d-frame__box--front">
                    <div className="item__3d-frame__box item__3d-frame__box--front">
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="item__3d-frame__box item__3d-frame__box--front">
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
