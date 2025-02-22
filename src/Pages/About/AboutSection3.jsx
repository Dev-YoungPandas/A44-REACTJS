import React from 'react'

const AboutSection3 = () => {
  return (
    <div className='w-full h-[90vh] md:h-[110vh] bg-cover bg-top  pt-[26.8vw] pr-0 pb-[8.9vw] pl-0'
      style={{
        backgroundImage:
          "url('https://hype-tattoo.com/wp-content/themes/HYPE_studio/img/about-page/our-mission-bg.jpg')"
      }}>


      <div className='w-[94vw] flex-col  md:flex-row md:flex mt-[30vh] md:mt-0 justify-between text-white items-end py-0 px-[.5vw] mx-auto'>
        <h3 className='md:text-[4.5vw] text-[7vw] font-bold leading-[8vw] md:leading-[5vw]  w-[50vw] text-left tracking-[-0.03em]'>
          Our mission <br /> IS TO BECOME <br />A TEMPLE OF ART AND <br /> SELF-EXPRESSION
        </h3>



        <p className='md:text-[1.6vw] text-[3.5vw] md:ml-0 ml-[55vw] font-medium leading-[4vw] md:leading-[1.8vw] tracking-[-0.03em] w-[40vw] md:w-[25vw] text-left '>

          Approach our goals. We set goals that others are afraid to imagine

        </p>
      </div>

    </div>
  )
}

export default AboutSection3
