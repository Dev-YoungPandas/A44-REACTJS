import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import "../../css/Section2.css";
import gsap from 'gsap/all';
import SplitBtn from '../../components/SplitBtn';


const Section5 = () => {
  const tiltRefs = [useRef(null), useRef(null), useRef(null)];
  const containerRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const options = {
      reverse: false,
      max: 15,
      perspective: 1000,
      scale: 1,
      speed: 300,
      transition: true,
      axis: null,
      glare: false,
      "max-glare": 1,
      "glare-prerender": false,
      "full-page-listening": false,
      "mouse-event-element": null,
      reset: true,
      "reset-to-start": true,
      gyroscope: true,
      gyroscopeMinAngleX: -45,
      gyroscopeMaxAngleX: 45,
      gyroscopeMinAngleY: -45,
      gyroscopeMaxAngleY: 45,
      gyroscopeSamples: 10,
    };

    // Initialize VanillaTilt on each card using tiltRefs
    tiltRefs.forEach(ref => {
      if (ref.current) {
        VanillaTilt.init(ref.current, options);
      }
    });

    // Cleanup: destroy each VanillaTilt instance when component unmounts
    return () => {
      tiltRefs.forEach(ref => {
        if (ref.current && ref.current.vanillaTilt) {
          ref.current.vanillaTilt.destroy();
        }
      });
    };
  }, [tiltRefs]);



  const textRef = useRef();
  const textRef2 = useRef();

  useEffect(() => {
    const spanElement = textRef.current;
    const spanElement2 = textRef2.current;

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

  return (
    <div className='w-full '>
      <div className='w-full py-[3vh] mt-[5vh]'>
        <div className='HeadTextAnimation '>
          <h1 className='text-[7vw] text-center font-extrabold '>
            <a href="#" className="flip-animate">
              <span ref={textRef} className='text-white' data-hover="EXPLORE OUR">EXPLORE OUR</span>
            </a>

          </h1>
          <h1 className='text-[7vw] mt-[-2vw] text-center font-extrabold '>
            <a href="#" className="flip-animate">
              <span ref={textRef2} className='text-white' data-hover="EXTENSIVE PORTFOLIO">EXTENSIVE PORTFOLIO</span>
            </a>

          </h1>
        </div>
      </div>
      <div className='w-full relative  xl:flex xl:flex-row  flex-col mt-[3vw]  xl:mt-1 items-center justify-between px-[2.5vw]'>
        {['QUANTUM', 'QUANTUM', 'QUANTUM'].map((title, index) => (
          <div
            key={index}
            ref={containerRefs[index]}
            className={`container xl:w-[30vw] w-[100%] h-[80vh] xl:h-[93vh] flex items-center justify-center ${index === 0 ? 'bg-white' : index === 1 ? 'bg-[#00d0d2]' : 'bg-black'
              }`}
          >
            <div
              ref={tiltRefs[index]}
              className={`xl:w-[26.5vw] w-full h-[87vh] flex items-center justify-between flex-col ${index === 2 ? 'text-white' : ''
                } ${index === 0 ? 'bg-white' : ''}`}
            >
              <div className='w-full h-[29vh] relative '>
                <h1 className='xl:text-[4vw]  text-[15vw] absolute  left-[10%] top-[60%] font-bold text-white mix-blend-exclusion'
               >
                  {title}
                </h1>
                <img
                  className='w-[100%] h-[100%] object-cover'
                  src={`https://hype-tattoo.com/wp-content/themes/HYPE_studio/img/tariff/${index === 0 ? 'quantum' : index === 1 ? 'blast' : 'hyper'
                    }.jpg`}
                  alt=""
                />
              </div>
              <p className='text-center text-[4vw] xl:text-[1vw] font-medium'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus fuga sed sunt nulla commodi.
              </p>
              <h1 className='xl:text-[3.4vw] text-[10vw] font-bold'>$150</h1>
             <div className='ml-[4vw]'>
             <SplitBtn
                label='CHOOSE ARTIST'
                {...(index === 1
                  ? { blueBoxBgColor: 'black', arrowColor: 'white' }
                  : index === 2
                    ? { borderColor: 'white', h3TextColor: 'white' }
                    : {})}
              />
             </div>
              <div className='w-full text-[0.7vw] font-light text-[#eaeaea] flex justify-between'>
                <p>[00{index + 1}]</p>
                <p>[choose]</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section5;
