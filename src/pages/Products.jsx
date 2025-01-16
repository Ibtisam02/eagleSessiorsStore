import React, { useEffect } from 'react'
import ShopCategories from '../components/sections/Catagory'
import HeroSection from '../components/sections/HeroSEction'
import { useDispatch, useSelector } from 'react-redux';

function products() {
 useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div>
      <ShopCategories  />
      <HeroSection/>
    </div>
  )
}

export default products