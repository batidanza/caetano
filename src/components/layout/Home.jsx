import React from 'react'
import Navbar from './Navbar'
import ImageCarousel from '../ImageCarousel'
import "./Home.css"

const Home = () => {
  return (
    <div className='home-container' >
        <Navbar/>
      <ImageCarousel/>
    </div>
  )
}

export default Home
