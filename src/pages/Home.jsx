import React from 'react'
import UserCard from '../components/cards/UserCard'
import HeroSection from '../components/sections/HeroSEction'
import BannerSlider from '../components/sections/Banner'
import ProductList from '../components/productList/ProductList'
import Catagory from '../components/sections/Catagory'
import ContactForm from '../components/sections/Forme'

function Home() {
  return (
    <div>
      <BannerSlider/>
      <Catagory/>
      <ProductList/>
      <div className="w-full flex justify-center mt-5">
      <button className="bg-black text-white px-8 py-3 rounded-full font-medium transform transition-transform hover:scale-105 active:scale-95">
              View More
            </button>
      </div>
      <HeroSection/>
      <ContactForm/>
    </div>
  )
}

export default Home