import React, { useEffect } from 'react'
import UserCard from '../components/cards/UserCard'
import HeroSection from '../components/sections/HeroSEction'
import BannerSlider from '../components/sections/Banner'
import ProductList from '../components/productList/ProductList'
import Catagory from '../components/sections/Catagory'
import ContactForm from '../components/sections/Forme'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/productSlice/getAllProducts'
import { Link } from 'react-router-dom'

function Home() {
   useEffect(() => { window.scrollTo(0, 0); }, []);
  let dispatch=useDispatch();
  let {isLoading,products}=useSelector((state)=>state.getAllProducts)
  useEffect(()=>{
    dispatch(getAllProducts({"catagory":"Scissors"})).then((res)=>{
            console.log(res);
    })
  },[])
  return (
    <div>
      <BannerSlider/>
      <Catagory/>
      <div className='px-4'>
      <ProductList products={products}/>
      </div>
      <div className="w-full flex justify-center mt-5">
      <Link to={"/productsBYCatagory/CUTTING%20&%20THINNING%20SCISSORS"} className="bg-black text-white px-8 py-3 rounded-full font-medium transform transition-transform hover:scale-105 active:scale-95">
              View More
            </Link>
      </div>
      
      <HeroSection/>
      <ContactForm/>
    </div>
  )
}

export default Home