import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'
import Section4 from './Section4'
import Carousel from './Carousel'
import Section5 from './Section5'
import PostSection4 from './PostSection4'
import Section6 from './Section6'
import Section7 from './Section7'
import Footer from './Footer'
import WheelSlider from "./WheelSlider";

const Home = () => {
  return (
    <div>
      <Section1/>
      <Section2/>
      <Section3/>
      <WheelSlider/>
      <Section4/>
      <Carousel/>
      <PostSection4/>
      <Section5/>
      <Section6/>
      <Section7/>
      <Footer/>
    </div>
  )
}

export default Home
