import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './redux/authSlice';
import { MoonLoader } from 'react-spinners';
import CheckAuth from './common/CheckAuth';
import UseLayout from './layouts/UseLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from "./pages/Products"
import About from './pages/About';
import Contact from './pages/Contact';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminHome from './pages/adminPages/AdminHome';
import AddAProduct from './pages/adminPages/AddAProduct';
import ProductsView from './pages/adminPages/ProductsView';
import ForgetPassword from './pages/ForgetPassword';
import ResetPasssword from './pages/ResetPasssword';
import { Route, Routes } from 'react-router-dom';
import ShopByCatagory from './pages/ShopByCatagory';
import UserOrders from './pages/UserOrders';
import Orders from './pages/adminPages/Orders';
import UpdateProduct from './pages/adminPages/UpdateProduct';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Reviews from './pages/Reviews';
import AllRevies from './pages/adminPages/AllRevies';
import ReviewOrder from './pages/ReviewOrder';
import Testimonials from './pages/Testimonials';
import { Toaster } from 'react-hot-toast';
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';
import Success from './pages/Success';
import Cancle from './pages/Cancle';
import NotFoundPage from './pages/FourOFour';
import "./App.css"

function App() {
  let dispatch=useDispatch();
  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])
  const {user,isAuthenticated,isLoading}=useSelector(state=>state.auth)

  const GoogleAuthWraper=()=>{
    return (
      <GoogleOAuthProvider clientId='86406764343-g6hbgcgne1f6u7nbna9fpctpq5hv9s1d.apps.googleusercontent.com'>
        <Login/>
      </GoogleOAuthProvider>
    )
  }
  return (
    <>
    <Toaster />
    <WhatsAppWidget message="Hello! How can I help you?"   phoneNumber="+44 7758 136346" />
      {isLoading? <div className="sweet-loading w-screen h-screen flex justify-center items-center">
      <MoonLoader
      color="#ff0000"
      cssOverride={{}}
      loading={isLoading}
      size={60}
      speedMultiplier={1}
      /> 
</div>:<Routes>
    <Route path="/" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><UseLayout/></CheckAuth>}>
      <Route path="home" element={<Home/>}/>
      <Route path="login" element={<GoogleAuthWraper />} />
      <Route path="login/forgetPassword" element={<ForgetPassword />} />
      <Route path="login/passwordReset/:token" element={<ResetPasssword />} />
      <Route path="singup" element={<Register />} />
      <Route path="products" element={<Products />} />
      <Route path="productsBYCatagory/:catagory" element={<ShopByCatagory />} />
      <Route path="about" element={<About />} /> 
      <Route path="contact" element={<Contact />} />
      <Route  path="product/:id" element={<SingleProduct />} />
      <Route  path="testimonials" element={<Testimonials />} />
      <Route  path="cart" element={<Cart />} />
      <Route  path="productsCat/:catagory" element={<ShopByCatagory />} />
      <Route  path="checkout" element={<Checkout />} />
      <Route  path="user/orders" element={<UserOrders />} />
      <Route  path="user/orders/:id" element={<ReviewOrder />} />
      <Route  path="cancel" element={<Cancle />} />
      <Route  path="success" element={<Success />} />
      <Route  path="reviews" element={<Reviews />} />
      <Route  path="*" element={<NotFoundPage />} />
    </Route>
    <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout/></CheckAuth>}>
    <Route path="home" element={<AdminHome/>}/>
    <Route path="orders" element={<Orders />} />
    <Route path="products" element={<ProductsView />} />
    <Route path="add-a-product" element={<AddAProduct/>} />
    <Route path="upDateProduct/:id" element={<UpdateProduct/>} />
    <Route path="product/:id" element={<SingleProduct/>} />
    <Route path="reviews" element={<AllRevies/>} />
  </Route>
  </Routes>
  }

    </>
  )
}

export default App
