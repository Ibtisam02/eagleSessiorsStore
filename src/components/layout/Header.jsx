import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaChevronRight,
  FaSearch,
  FaShoppingBag,
  FaTimes,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../redux/productSlice/getAllProducts";
import { getLogo } from "../../redux/reviewSlice.jsx/getLogo";
import { checkAuth } from "../../redux/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  let dispatch = useDispatch();
  
  const isToggled = useSelector((state) => state.addToCartToggle.isToggled);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

//setLogos();
useEffect(()=>{
dispatch(getLogo()).then((res)=>{
  console.log(res);
  
})
},[])


  const {isAuthenticated,}=useSelector(state=>state.auth)


  let [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("order")) || []
  );

  useEffect(()=>{
    setOrders(JSON.parse(localStorage.getItem("order")) || [])
  },[isToggled])
  let { isLoading, products } = useSelector((state) => state.getAllProducts);
  let {  logo } = useSelector((state) => state.getLogoAll);
console.log(logo);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Example search results
  useEffect(() => {
    if (isSearchOpen) {
      dispatch(getAllProducts({ "keyword": searchQuery })).then((res) => {
        console.log(res);
      });
    }
  }, [searchQuery, isSearchOpen]);

  const navItems = [
    { title: "ABOUT US", href: "/about" },
    { title: "SHOP NOW", href: "/products" },
    { title: "CUSTOMER TESTIMONIALS", href: "/testimonials" },
    { title: "REVIEWS", href: "/reviews" },
    { title: "CONTACT", href: "/contact" },
    { title: "TRACK MY ORDER", href: "/user/orders" },
  ];

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      {/* Main Fixed Navbar */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500
        ${isScrolled ? "bg-black/80 backdrop-blur-xl shadow-lg" : "bg-black"}
        border-b border-white/10`}
      > 
        {/* Main Navbar Content */}
        <nav
          className={`relative text-white transition-opacity duration-300 ${
            isSearchOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
                >
                  <FaBars size={24} />
                </button>
              </div>

              {/*<div className="text-2xl font-serif tracking-wider">
                <span className="text-white">Eag</span>
                <span className="text-red-500">leTra</span>
                <span className="text-white">ders</span>
              </div>*/}
              <Link to={"/"}>
              <img src={logo||"https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"} alt="Logo" className="h-[100px]" />
              </Link>

              <div className="hidden lg:flex lg:items-center lg:space-x-1 ml-8">
                {navItems.map((item, index) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    onMouseEnter={() => setActiveItem(index)}
                    onMouseLeave={() => setActiveItem(null)}
                    className="relative px-4 py-2 rounded-lg group"
                  >
                    <span className="relative z-10">{item.title}</span>
                    {activeItem === index && (
                      <div className="absolute inset-0 bg-white/10 rounded-lg transition-all duration-300" />
                    )}
                  </Link>
                ))}
              </div>

              <div className="flex items-center space-x-6">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="hover:bg-white/10 p-2 rounded-lg transition-colors duration-300"
                >
                  <FaSearch size={20} />
                </button>
                <div className="relative group">
                  <div className="hover:bg-white/10 p-2 rounded-lg transition-colors duration-300">
                    <Link to={"/cart"}>
                      <FaShoppingBag size={20} className="cursor-pointer" />
                    </Link>
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {orders.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Search Overlay */}
        <div
          className={`absolute top-0 left-0 w-full transform transition-all duration-300 ${
            isSearchOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4 bg-white/10 rounded-lg p-2">
              <FaSearch size={20} className="text-white/70" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-2 py-2 text-white placeholder-white/70 focus:outline-none"
                autoFocus
              />
              <button
                onClick={handleSearchClose}
                className="p-2 hover:bg-white/10 rounded-full transition-all duration-300"
              >
                <FaTimes size={20} className="text-white" />
              </button>
            </div>

            {searchQuery && (
              <div className="mt-4 bg-black/25 backdrop-blur-xl rounded-lg overflow-hidden">
                {products?.map((result) => (
                  <Link
                  onClick={()=>{setIsSearchOpen(false)}}
                  to={`/product/${result?._id}`}
                    key={result?._id}
                    className="flex items-center gap-4 p-4 hover:bg-white/10 cursor-pointer transition-colors duration-200 border-b border-white/10 last:border-none"
                  >
                    <img
                      src={result?.images?.[0]?.url}
                      alt={result?.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{result?.name}</h3>
                      <div className="flex gap-2 items-center mt-1">
                      {result?.discount>0?<span className="text-white/90">
                        &pound; {(
                            result?.basePprice -
                            ((result?.basePprice / 100) * result?.discount)
                          ).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>:<span className="text-white/90">
                        &pound; {(
                            result?.basePprice
                          )?.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>}
                        {result?.discount>0?<span className="  text-white/50 line-through text-sm">
                          &pound; {result?.basePprice?.toLocaleString()}
                        </span>:null}
                        
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Width Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-black transform transition-transform duration-500 ease-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-6 border-b border-white/10">
        <Link to={"/"}><img src={logo||"https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"} alt="Logo" className="h-[100px]" /></Link>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:rotate-90 transition-all duration-300"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="py-6 px-4">
          {navItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="flex items-center justify-between py-4 px-2 text-white text-lg hover:bg-white/5 transition-all duration-300 border-b border-white/10"
              onClick={() => setIsOpen(false)}
            >
              <span>{item.title}</span>
              <FaChevronRight
                size={20}
                className="transform transition-transform duration-300"
              />
            </a>
          ))}
        </div>

        {isAuthenticated?null:<div className="absolute bottom-0 w-full p-6 border-t border-white/10 bg-black/95">
          <div className="flex items-center justify-between text-white/80">
            <Link to={"/login"} className="hover:text-white transition-colors duration-300">
              Sign In
            </Link>
            <Link to={"/singup"} className="hover:text-white transition-colors duration-300">
              Register
            </Link>
          </div>
        </div>}
      </div>

      {/* Overlay for mobile menu */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500 z-40
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;
