import React from 'react'
import ShopCategories from '../components/sections/Catagory'
import HeroSection from '../components/sections/HeroSEction'
import { useDispatch, useSelector } from 'react-redux';

function products() {
 
  return (
    <div>
      <ShopCategories  />
      <HeroSection/>
    </div>
  )
}

export default products