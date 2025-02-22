import React from 'react';
import AboutSection1 from './AboutSection1';
import AboutSection2 from './AboutSection2';
import AboutSection3 from './AboutSection3';
import AboutSection4 from './AboutSection4';
import Footer from '../Home/Footer';

const About = () => {
  return (
    <div className=''>
      <AboutSection1 />

      <div className="relative z-10 ">
        <AboutSection2 />
        <AboutSection3 />
        <AboutSection4/>
        <Footer/>
      </div>
    </div>
  );
};

export default About;
  