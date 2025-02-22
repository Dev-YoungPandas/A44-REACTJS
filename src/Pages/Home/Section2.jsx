import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react'
import { MdArrowOutward } from "react-icons/md";
import "../../css/Section2.css";


gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {

  const frameRef = useRef();
  const bookRef = useRef();
  const arrowRef = useRef();
  const imageRef = useRef(null);

  const textRef = useRef(null);


  useEffect(() => {
    const spanElement = textRef.current;

    gsap.to(spanElement, {
      rotateX: 90,
      y: -22, 
      duration:0.7,
      color:"black",
      scrollTrigger: {
        trigger: spanElement,
        start: "top 80%", 
        toggleActions: "play none none reverse", 
      },
    });
  }, []);



  const imageMapping = {
    first: "https://hype-tattoo.com/wp-content/themes/HYPE_studio/img/main-page/about/Sanchi1-1.jpg",
    second: "https://hype-tattoo.com/wp-content/themes/HYPE_studio/img/main-page/about/Sanchi1-3.jpg",
    third: "https://hype-tattoo.com/wp-content/themes/HYPE_studio/img/main-page/why-section/why-card-image/IMAGE%202024-06-16%2018_25_16%201-5.jpg",
    forth: "https://hype-tattoo.com/wp-content/uploads/2024/12/Demus6.jpg"
  };

  useEffect(() => {

    gsap.from(".Text-Section2 h1", {
      y: 100,
      opacity: 0,
      duration: 2,
      scrollTrigger: {
        trigger: ".Text-Section2",
        start: "top 60%",
        end: "top 59%",
        scrub: 3,
      }
    })
    gsap.from(".Text-Section2 p", {
      y: 100,
      opacity: 0,
      duration: 2,
      scrollTrigger: {
        trigger: ".Text-Section2 h1",
        start: "top 60%",
        end: "top 59%",
        scrub: 3,
      }
    })
    gsap.from(".Button-section2", {
      y: 100,
      opacity: 0,
      duration: 2,
      scrollTrigger: {
        trigger: ".Text-Section2 p",
        start: "top 60%",
        end: "top 59%",
        scrub: 3,
      }
    })
  }, [])




  const handleMouseEnter = () => {
    gsap.to(frameRef.current, {
      scale: 0.9,
      duration: 0.5,
      ease: "power2.out"
    })
    bookRef.current.style.backgroundColor = "#00d0d2"
    gsap.to(arrowRef.current, {
      rotate: "360deg",
      duration: 0.5
    })
  }
  const handleMouseLeave = () => {
    gsap.to(frameRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    })
    bookRef.current.style.backgroundColor = "transparent"
    gsap.to(arrowRef.current, {
      rotate: "0deg",
      duration: 0.5
    })


  }


  const rotationMapping = {
    first: -20,
    second: -10,
    third: 5,
    forth: 20
  };

  const handleDivMouseEnter = (e, id) => {
    if (imageRef.current) {
      imageRef.current.src = imageMapping[id];
      gsap.to(imageRef.current, {
        opacity: 1,
        duration: 0.3,
        rotate: `${rotationMapping[id]}deg`,
        ease: "power2.out"
      });
    }
  };


  const handleDivMouseMove = (e) => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };


  const handleDivMouseLeave = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, { opacity: 0, duration: 0.3 });
    }
  };


  useEffect(() => {

    const mask2 = document.querySelectorAll(".mask-Section2");

    mask2.forEach((mask) => {
      const image = mask.querySelector("img");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mask,
          toggleActions: "restart pause resume reverse",
          // markers: true,
          start: "150% 80%",

        },
      });


      tl.set(mask, { autoAlpha: 1 });
      tl.from(mask, {
        duration: 1.5,
        yPercent: -100,
        ease: "power2.out",
      });
      tl.from(
        image,
        {
          duration: 1.5,
          yPercent: 105,
          scale: 1.3,
          ease: "power2.out",
        },
        "-=1.5"
      );

    })
  }, [])


  return (
    <div className='w-full py-[3vw] relative  bg-cover '
      style={{ backgroundImage: "url('https://hype-tattoo.com/wp-content/themes/HYPE_studio/img/main-page/about/about-bg.jpg')" }}
    >
      {/* <h1 className='text-[7.29vw] text-white top-[5%] left-[16%] z-[999] mix-blend-difference absolute font-extrabold'>ABOUT THE TEAM</h1> */}
      <div className='HeadTextAnimation flex items-center justify-center absolute top-[5%] h-[30vh] w-full left-[0%]'>
        <h1 className='text-[7.29vw] font-bold'>
          <a href="#" className="flip-animate">
            <span ref={textRef} className='text-white' data-hover="ABOUT THE TEAM">ABOUT THE TEAM</span>
          </a>
        </h1>
      </div>



      <div className='container-section2 w-full pt-[4vw] px-[2vw] '>

        <div id='topImg-sec2' className='img_container-section2 w-[29vw] relative'>
          <div className='mask-Section2 invisible relative w-[100%] h-[80%] overflow-hidden'>
            <img className='h-[100%] w-[100%] object-cover origin-top'
              src="https://hype-tattoo.com/wp-content/themes/HYPE_studio/img/main-page/about/right.jpg"
              alt=""
            />
          </div>

        </div>


        <div id="uper-sec2" className="img_container-section2 relative mt-[-20vw] w-[38vw] ml-[30vw]">
          <div id="uperMask-sec2" className="mask-Section2 invisible relative w-[100%] h-[80%] overflow-hidden">
            <img className='h-[100%] w-[100%] object-cover origin-top'
              src="https://hype-tattoo.com/wp-content/themes/HYPE_studio/img/main-page/about/central.jpg"
              alt=""
            />
          </div>
        </div>


        <div id="lastImg-sec2" className="img_container-section2 relative w-[25vw] ml-[70vw]">
          <div id="lastMask-sec2" className="mask-Section2 invisible relative w-[100%] h-[80%] overflow-hidden">
            <img className='h-[100%] w-[100%] object-cover origin-top'
              src="https://hype-tattoo.com/wp-content/themes/HYPE_studio/img/main-page/about/left.jpg"
              alt=""
            />
          </div>
        </div>

      </div>


      <div className='Text-Section2 w-full h-[65vh] flex items-center  flex-col '>
        <h1 className='xl:text-[3.7vw] text-[9vw] leading-[9vw] xl:leading-[4.5vw] text-center mt-3 font-bold'>WE ARE BRINGING YOUR UNIQUE <br /> VISION TO LIFE THROUGH INK</h1>

        <p className=' text-[14px] xl:text-[18px] font-semibold text-center mt-7 w-[90%] xl:w-[60%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, incidunt soluta perspiciatis ipsam rerum esse consequuntur doloremque iure vel nam autem sunt sint hic illo quo officiis libero molestiae ipsum nobis omnis expedita architecto accusamus accusantium minima.</p>


        <div className='Button-section2 xl:w-[30vw] xl:h-[13vh] w-[80vw] flex mt-10 items-center gap-1 '>
          <div ref={bookRef} className='xl:w-[20vw] w-[60vw] h-[13vh] border border-gray-600  flex backdrop-blur-[8px]  relative items-center justify-center' >
            <div ref={frameRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='xl:w-[20vw] w-[60vw] h-[13vh]  absolute'>
              <div className='w-[20px] h-[20px] absolute top-0 left-0 border-l-2 border-black border-t-2 '></div>
              <div className='w-[20px] h-[20px] absolute top-0 right-0 border-t-2 border-black border-r-2 '></div>
              <div className='w-[20px] h-[20px] absolute bottom-0 border-l-2 border-b-2 border-black left-0 '></div>
              <div className='w-[20px] h-[20px] absolute bottom-0 right-0 border-black border-r-2 border-b-2 '></div>

            </div>
            <h3 className='font-bold text-black text-xl'>ABOUT US</h3>

          </div>

          <div className='xl:w-[6vw] w-[20vw] h-[13vh] text-4xl font-bold flex items-center justify-center bg-[#00d0d2]'>
            <MdArrowOutward ref={arrowRef} />


          </div>

        </div>
      </div>


      <div className='w-full xl:flex   grid grid-cols-2  px-0 xl:px-10 mt-[3vw]'>
        <div id='first'
          onMouseEnter={(e) => handleDivMouseEnter(e, 'first')}
          onMouseMove={handleDivMouseMove}
          onMouseLeave={handleDivMouseLeave}
          className='w-full xl:w-[22vw] h-[25vh] xl:h-[60vh] pt-[16.4vw] pl-[2.2vw] border-l-[0.05vw] x'>
          <div className=' h-[25vh] '>
            <div className='xl:w-[3vw] xl:h-[3vw] w-[5vw] h-[5vw] flex items-center justify-center border rounded-full'>
              <p className='xl:text-2xl text-xs font-semibold'>A</p>
            </div>

            <h1 className='text-[6vw] mt-[-1vw] font-extrabold'>4+</h1>

            <p className='mt-[-0.5vw] font-extrabold'>hours average session</p>
          </div>
        </div>
        <div id='second'
          onMouseEnter={(e) => handleDivMouseEnter(e, 'second')}
          onMouseMove={handleDivMouseMove}
          onMouseLeave={handleDivMouseLeave}
          className='w-full xl:w-[26vw] h-[25vh] xl:h-[75vh] border-l-[0.05vw] pt-[23.9vw] pl-[2.2vw] '>
          <div className=' h-[25vh] '>
            <div className='w-[4vw] h-[4vw] xl:w-[3vw] xl:h-[3vw]  flex items-center justify-center border rounded-full'>
              <p className='xl:text-2xl text-xs font-semibold'>A</p>
            </div>

            <h1 className='text-[5vw] font-extrabold'>A LOT </h1>

            <p className='font-bold'>tattos done by our artist</p>
          </div>
        </div>
        <div id='third'
          onMouseEnter={(e) => handleDivMouseEnter(e, 'third')}
          onMouseMove={handleDivMouseMove}
          onMouseLeave={handleDivMouseLeave}
          className='w-full xl:w-[29.4vw] h-[25vh] xl:h-[60vh] pt-[16.4vw] pl-[2.2vw] border-l-[0.05vw] '>
          <div className=' h-[25vh] '>
            <div className='w-[4vw] h-[4vw] xl:w-[3vw] xl:h-[3vw] flex items-center justify-center border rounded-full'>
              <p className='xl:text-2xl text-xs font-semibold'>A</p>
            </div>

            <h1 className='text-[5vw]   font-extrabold'>A LOT OF</h1>

            <p className='font-bold'>satisfied client</p>
          </div>
        </div>
        <div id='forth'
          onMouseEnter={(e) => handleDivMouseEnter(e, 'forth')}
          onMouseMove={handleDivMouseMove}
          onMouseLeave={handleDivMouseLeave}
          className='w-[17vw] h-[25vh] xl:h-[75vh]  pt-[23.9vw] pl-[2.2vw] border-l-[0.05vw] '>
          <div className=' h-[25vh] '>
            <div className='w-[4vw] h-[4vw] xl:w-[3vw] xl:h-[3vw] flex items-center justify-center border rounded-full'>
              <p className='xl:text-2xl text-xs font-semibold'>A</p>
            </div>

            <h1 className='text-[5vw] font-extrabold'>6</h1>

            <p className='font-bold'>professional artist</p>
          </div>
        </div>

      </div>

      <img
        ref={imageRef}
        alt="hover preview"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          opacity: 0,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          width: "300px",
          height: "auto"
        }}
      />

    </div>
  )
}

export default Section2
