import React from 'react'
import '@/app/globals.css'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
export const Gallery = () => {
  return (
    <div className='absolute left-0 top-0 z-50 bg-black bg-opacity-90 backdrop-blur-md w-[100vw] h-[100vh]  flex justify-center items-center toTop'>
      {/* <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={3}
      >
        <Slider>
          <Slide index={0}>I am the first Slide.</Slide>
          <Slide index={1}>I am the second Slide.</Slide>
          <Slide index={2}>I am the third Slide.</Slide>
        </Slider>
      </CarouselProvider> */}
    </div>
  )
}
