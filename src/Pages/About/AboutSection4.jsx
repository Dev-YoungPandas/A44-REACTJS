import  { useEffect, useRef } from "react";
import { FaReact } from "react-icons/fa";

const AboutSection4 = () => {
  const containerRef = useRef(null);
  const lastScrollY = useRef(window.pageYOffset);
  const currentSkew = useRef(0);

  useEffect(() => {
    const animate = () => {
      const currentScrollY = window.pageYOffset;
      const diff = currentScrollY - lastScrollY.current;
      // Use a smaller multiplier for a subtle effect.
      const targetSkew = diff * 0.1;
      // Ease the current skew towards the target skew
      currentSkew.current += (targetSkew - currentSkew.current) * 1;

      if (containerRef.current) {
        containerRef.current.style.transform = `skewY(${currentSkew.current}deg)`;
      }
      lastScrollY.current = currentScrollY;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="w-full py-1 xl:py-[15vw] pt-[10vw] bg-transparent">
      {/* The container that gets the skew effect */}
      <div ref={containerRef} className="transition-transform will-change-transform">
        {/* First Row */}
        <div className="w-full xl:flex xl:flex-row flex-col  justify-between  px-[2vw]">
          <div className="xl:w-[21vw] py-[6vw] xl:py-5 xl:h-[21vw] w-full h-[40vh] bg-white flex flex-col justify-between p-[2vw]">
            <FaReact className="xl:text-[3vw] text-[20vw] text-[#00D0D2]" />
            <div>
              <h3 className="xl:text-[1.3vw] text-[8vw] font-bold leading-[1.6vw] mb-[6vw] xl:mb-[1.3vw]">
                Cultural Ambassadors
              </h3>
              <p className="xl:text-[1vw] text-[4vw] font-medium leading-[4vw] xl:leading-[1.5vw] w-full xl:w-[14vw]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam non voluptatum aperiam magnam!
              </p>
            </div>
          </div>
          <div className="xl:w-[21vw] py-[6vw] mt-[2vw] xl:mt-[20vh] xl:py-5 xl:h-[21vw] w-full h-[40vh] bg-white flex flex-col justify-between p-[2vw]">
            <FaReact className="xl:text-[3vw] text-[20vw] text-[#00D0D2]" />
            <div>
              <h3 className="xl:text-[1.3vw] text-[8vw] font-bold leading-[1.6vw] mb-[6vw] xl:mb-[1.3vw]">
                Cultural Ambassadors
              </h3>
              <p className="xl:text-[1vw] text-[4vw] font-medium leading-[4vw] xl:leading-[1.5vw] w-full xl:w-[14vw]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam non voluptatum aperiam magnam!
              </p>
            </div>
          </div>
          <div className="xl:w-[21vw] py-[6vw] mt-[2vw] xl:mt-[0vh] xl:py-5 xl:h-[21vw] w-full h-[40vh] bg-white flex flex-col justify-between p-[2vw]">
            <FaReact className="xl:text-[3vw] text-[20vw] text-[#00D0D2]" />
            <div>
              <h3 className="xl:text-[1.3vw] text-[8vw] font-bold leading-[1.6vw] mb-[6vw] xl:mb-[1.3vw]">
                Cultural Ambassadors
              </h3>
              <p className="xl:text-[1vw] text-[4vw] font-medium leading-[4vw] xl:leading-[1.5vw] w-full xl:w-[14vw]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam non voluptatum aperiam magnam!
              </p>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="w-full xl:flex xl:flex-row flex-col  justify-between  mt-[2vh]  xl:mt-[28vh] px-[2vw]">
          <div className="xl:w-[21vw] py-[6vw]  xl:mt-[-10vh] xl:py-5 xl:h-[21vw] w-full h-[40vh] bg-white flex flex-col justify-between p-[2vw]">
            <FaReact className="xl:text-[3vw] text-[20vw] text-[#00D0D2]" />
            <div>
              <h3 className="xl:text-[1.3vw] text-[8vw] font-bold leading-[1.6vw] mb-[6vw] xl:mb-[1.3vw]">
                Cultural Ambassadors
              </h3>
              <p className="xl:text-[1vw] text-[4vw] font-medium leading-[4vw] xl:leading-[1.5vw] w-full xl:w-[14vw]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam non voluptatum aperiam magnam!
              </p>
            </div>
          </div>
          <div className="xl:w-[21vw] py-[6vw] mt-[2vw] xl:mt-[0vh] xl:py-5 xl:h-[21vw] w-full h-[40vh] bg-white flex flex-col justify-between p-[2vw]">
            <FaReact className="xl:text-[3vw] text-[20vw] text-[#00D0D2]" />
            <div>
              <h3 className="xl:text-[1.3vw] text-[8vw] font-bold leading-[1.6vw] mb-[6vw] xl:mb-[1.3vw]">
                Cultural Ambassadors
              </h3>
              <p className="xl:text-[1vw] text-[4vw] font-medium leading-[4vw] xl:leading-[1.5vw] w-full xl:w-[14vw]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam non voluptatum aperiam magnam!
              </p>
            </div>
          </div>
          <div className="xl:w-[21vw] py-[6vw] mt-[2vw] xl:mt-[0vh] xl:py-5 xl:h-[21vw] w-full h-[40vh] bg-white flex flex-col justify-between p-[2vw]">
            <FaReact className="xl:text-[3vw] text-[20vw] text-[#00D0D2]" />
            <div>
              <h3 className="xl:text-[1.3vw] text-[8vw] font-bold leading-[1.6vw] mb-[6vw] xl:mb-[1.3vw]">
                Cultural Ambassadors
              </h3>
              <p className="xl:text-[1vw] text-[4vw] font-medium leading-[4vw] xl:leading-[1.5vw] w-full xl:w-[14vw]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam non voluptatum aperiam magnam!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection4;
