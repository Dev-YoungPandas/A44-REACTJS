import  { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../css/ImageGallery.css";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1608319984133-1d0e5e20988e?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1591920689160-ee83654e464a?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1621252792374-2b79e3fcf295?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1507767439269-2c64f107e609?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1580274437636-1c384e59e9b5?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1608319984133-1d0e5e20988e?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1591920689160-ee83654e464a?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1621252792374-2b79e3fcf295?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1507767439269-2c64f107e609?w=600&auto=format&fit=crop&q=60",
];

const WheelSlider = () => {
  const wheelRef = useRef(null);

  useEffect(() => {
    const wheel = wheelRef.current;
    const items = wheel.children;
    const total = items.length;

    // Function to position the cards in a circular layout
    const setPositions = () => {
      const wheelWidth = wheel.offsetWidth;
      const radius = wheelWidth / 2;
      const center = wheelWidth / 2;
      const slice = (2 * Math.PI) / total;

      Array.from(items).forEach((item, i) => {
        const angle = i * slice;
        const x = center + radius * Math.sin(angle);
        const y = center + radius * Math.cos(angle);

        gsap.set(item, {
          rotation: angle,
          xPercent: -50,
          yPercent: -50,
          x: x,
          y: y,
        });
      });
    };

    // Set the initial positions
    setPositions();

    // GSAP animation for pinning and scrolling
    gsap.from(".ImageMain", {
      scrollTrigger: {
        trigger: ".ImageMain",
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 1,
      },
    });

    // Rotate the wheel as you scroll
    gsap.to(wheel, {
      rotate: -360,
      ease: "none",
      duration: total,
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: 1,
        // snap: 1 / total,
        invalidateOnRefresh: true,
      },
    });

    // Recalculate positions on window resize
    const handleResize = () => {
      setPositions();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="slider-section">
      <div className="wheel" ref={wheelRef}>
        {images.map((src, index) => (
          <div className="wheel__card" key={index}>
            <img src={src} alt="Car" />
          </div>
        ))}
      </div>
    </section> 

  );
};

const App = () => {
  return (
    <div className="ImageMain h-[150vh]  overflow-hidden relative w-[100%] bg-white text-black">
      <div className="header">
        <h1 className="text-[7vw] font-semibold mt-[6vh] uppercase xl:mt-2 leading-[7vw] text-center">
          human stories <br /> Superhuman audiovisuals
        </h1>
      </div>
      <WheelSlider />
      
    </div>
  );
};

export default App;
