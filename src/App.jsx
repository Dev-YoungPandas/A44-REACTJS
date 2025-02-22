import React from 'react'
import Home from './Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import MouseFollow from './components/MouseFollow'
import About from './Pages/About/About'
import Nav from './components/Nav'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Gallery from './Pages/Gallery/Gallery'


const App = () => {
  return (
    <div className=''>
      <MouseFollow/>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/gallery' element={<Gallery/>} />
      </Routes>
    </div>
  )
}

export default App
