import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

const AboutSection2Part3 = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="w-full  flex flex-col py-[5vw] xl:flex-row bg-[#F9F9F9]"
      ref={sectionRef}
    >
      <div className="xl:w-[30%] w-full  flex items-center justify-center">
        <h5 className="xl:text-[1.8vw] text-[8vw] text-center xl:text-start  font-bold leading-[7vw] xl:leading-[2.2vw] w-full xl:w-[10vw] tracking-[-0.03em]">
          Hype tattoo in number
        </h5>
      </div>
      <div className="xl:w-[70%]   w-full flex items-center justify-center">
        <ul className="grid grid-cols-1 xl:grid-cols-4 gap-[5vw]">
          <li>
            <span className="block text-[25vw]  xl:text-[5.2vw] font-semibold mb-[2vw] text-center xl:text-left">
              {inView ? <CountUp end={15} duration={2} /> : 0}
            </span>
            <p className=" text-[4vw] xl:text-[1vw] font-medium leading-[1vw]  text-center xl:text-left text-[#B3B3B3]">
              professional craftsmen
            </p>
          </li>
          <li>
            <span className="block text-[25vw] xl:text-[5.2vw] font-semibold mb-[2vw] text-center xl:text-left">
              {inView ? <CountUp end={8} duration={2} /> : 0}
            </span>
            <p className="text-[4vw] xl:text-[1vw] font-medium leading-[1vw] text-center xl:text-left text-[#B3B3B3]">
              hour average session
            </p>
          </li>
          <li>
            <span className="block text-[25vw] xl:text-[5.2vw] font-semibold mb-[2vw] text-center xl:text-left">
              {inView ? <CountUp end={1543} duration={2} /> : 0}
            </span>
            <p className="text-[4vw] xl:text-[1vw] font-medium leading-[1vw] text-center xl:text-left text-[#B3B3B3]">
              tattos done by our team
            </p>
          </li>
          <li>
            <span className="block text-[25vw] xl:text-[5.2vw] font-semibold mb-[2vw] text-center xl:text-left">
              {inView ? <CountUp end={1300} duration={2} /> : 0}
            </span>
            <p className="text-[4vw] xl:text-[1vw] font-medium leading-[1vw] text-center xl:text-left text-[#B3B3B3]">
              satisfied client
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutSection2Part3;
