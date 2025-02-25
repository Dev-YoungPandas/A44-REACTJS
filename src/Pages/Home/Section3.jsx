import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react'
import { IoMdPlay } from "react-icons/io";
import Myvideo from "../../assets/HypeCreoForm2.mp4";



gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {

  const [isOpen, setIsOpen] = useState(false);


  const sectionRef = useRef();
  const playRef = useRef();
  const reelRef = useRef();

  useEffect(() => {
    var videocon = document.querySelector("#eco1");
    var playbtn = document.querySelector("#playsCursor");

    videocon.addEventListener("mouseenter", function () {
      gsap.to(playbtn, {
        scale: 1,
        opacity: 1,
        duration: 0.5
      })
    })


    videocon.addEventListener("mouseleave", function () {
      gsap.to(playbtn, {
        scale: 0,
        opacity: 0,
        duration: 0.5

      })
    })

    videocon.addEventListener("mousemove", function (dets) {
      gsap.to(playbtn, {
        left: dets.x - 70,
        top: dets.y - 70

      })
    })
  }, [])


  useEffect(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true
      }
    });

    tl.to(playRef.current, { left: "10%", ease: "none" }, 0)
      .to(reelRef.current, { left: "75%", ease: "none" }, 0);
  }, [])



  return (
    <div ref={sectionRef} id='eco1' className='w-full flex relative text-white items-center flex-col justify-evenly h-[90vh] xl:h-[120vh] bg-[#00d0d2]'>

      <div id="playsCursor" onClick={() => setIsOpen(true)} className=' text-[3vw] text-black z-[99] w-[95px] h-[95px] flex items-center justify-center bg-white fixed scale-0 opacity-0'>
        <IoMdPlay />

      </div>

      <p className='text-[18px] font-semibold'>Work in motion</p>

      <h1 ref={playRef} id='play' className='absolute left-[29.5%] font-bold text-[8.5vw]'>PLAY</h1>
      <h1 ref={reelRef} id='reel' className='absolute left-[52%] font-bold text-[8.5vw]'>REEL</h1>
      <div className='xl:w-[36vw] w-[80vw] h-[40vh] xl:h-[54vh] bg-black'>
        <img className='xl:w-[36vw] w-[80vw] h-[40vh] xl:h-[54vh] object-cover' src="https://hype-tattoo.com/wp-content/themes/HYPE_studio/img/main-page/why-section/why-card-image/IMAGE%202024-06-16%2018_25_16%201-3.jpg" alt="" />

      </div>

      <h5 className='text-[18px] font-semibold'>Our work is best experienced in motion <br /> Don't forgot to put on your headphones</h5>


      {isOpen && (
        <div className='fixed inset-0 w-[100%] h-[100vh] bg-[#00000060]  bg-opacity-75 flex items-center justify-center z-[999]'>
          <button className='absolute top-2 right-2 text-white text-3xl font-bold '
            onClick={() => setIsOpen(false)}>
            &times;
          </button>



            <video className='xl:w-[35vw] w-[80vw] object-cover h-[80vh] xl:h-[99vh]' controls autoPlay src={Myvideo}></video>

        </div>
      )}
    </div>

  )
}

export default Section3
