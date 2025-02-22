import React from 'react'
import GallerySection1 from './GallerySection1'
import GallerySection2 from './GallerySection2'
import GallerySection3 from './GallerySection3'
import Section6 from '../Home/Section6'
import Footer from '../Home/Footer'

const Gallery = () => {
  return (
    <div >
      <GallerySection1 />

      <div className='relative z-10'>
        <GallerySection2 />
        <GallerySection3 />
        <Section6 />
        <Footer />
      </div>

    </div>
  )
}

export default Gallery
