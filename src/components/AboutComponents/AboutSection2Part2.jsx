import React, { useEffect, useState } from 'react'

const AboutSection2Part2 = () => {

    const images = [
        "https://hype-tattoo.com/wp-content/themes/HYPE_studio/img/about-page/history-section/MIX%20(547)%201.png",
        "https://hype-tattoo.com/wp-content/themes/HYPE_studio/img/about-page/history-section/object%201.png",
        "https://hype-tattoo.com/wp-content/themes/HYPE_studio/img/about-page/history-section/Object2%201.png",
        "https://hype-tattoo.com/wp-content/themes/HYPE_studio/img/about-page/history-section/image%2031.png"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 1000);


        return () => clearInterval(interval);
    }, [images.length])



    return (
        <div className="w-full py-[5vh] flex flex-col md:flex-row p-[2vw] bg-[#F9F9F9]">
            <div className="w-full md:w-1/2 h-full flex flex-col ">
                <h3 className="text-[5vw] leading-[5vw] xl:text-[1.8vw] font-bold w-[60vw] xl:w-[35vw] mb-[2.3vw]  xl:leading-[2.2vw]">
                    Our team of talented and passionate artist is dedicated to turning your tattoo dream into reality.
                </h3>

                <p className="text-[4vw] xl:text-[1vw] font-medium xl:font-semibold leading-[4vw] xl:leading-[1.5vw] w-full xl:w-[39vw]">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa earum deserunt nihil unde laudantium
                    voluptatibus nisi ipsam beatae officiis quasi veniam quisquam cumque ad facilis recusandae voluptates,
                    voluptate quia eligendi dolore facere sint. A sit temporibus assumenda explicabo, nisi ipsa officiis, id
                    illum amet necessitatibus incidunt magni dolorum repellat vero?
                </p>

                <div className="mt-[6vw] flex  items-end justify-between">
                    <div className="MultiImages w-[40vw] md:w-[18.3vw] h-[40vw] md:h-[18.3vw] p-[3vw] border-[0.05vw] overflow-hidden flex items-center justify-center border-black rounded-full">
                        <img className="w-[138px]  duration-300 transition-all object-cover" src={images[currentIndex]} alt="" />
                    </div>
                    <div className='mr-[2vw]'>
                        <p className="xl:w-[7vw] w-[15vw] text-[3vw] leading-[3vw] xl:text-[1vw] font-medium mb-[0.5vw] text-right xl:leading-[1vw]">
                            HYPE 2024 ALL RIGHTS RESERVED
                        </p>
                        <span className="w-fit text-[6vw] md:text-[2.2vw] font-medium leading-[2.2vw] text-left ml-auto">
                            (01)
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-full mt-[4vw] xl:mt-0 xl:w-1/2 h-full">
                <img className="w-full h-full object-cover" src="https://hype-tattoo.com/wp-content/themes/HYPE_studio/img/about-page/about-hero-bg-page.jpg" alt="" />
            </div>
        </div>

    )
}

export default AboutSection2Part2
