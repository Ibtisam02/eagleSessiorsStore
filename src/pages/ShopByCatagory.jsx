import React, { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import ProductList from '../components/productList/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/productSlice/getAllProducts';
import { MoonLoader } from 'react-spinners';

const ShopByCategory = () => {
  let {catagory}=useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [sortIsOpen, setSortIsOpen] = useState(false);
  let [sort, setSort] = useState("aToz");
  let [catagoryf, setCatagoryf] = useState("Scissors");
  let [showSort,setShowSort]=useState("Alphabetically, A-Z")

  let dispatch=useDispatch();
  let {isLoading,products}=useSelector((state)=>state.getAllProducts)


 /* useEffect(() => {
    
    if(catagory==="CUTTING & THINNING SCISSORS"){
      setCatagoryf("Scissors")
    }
    else if(catagory==="RAZORS"){
      setCatagoryf("Razors")
    }
    
    dispatch(getAllProducts({"catagory":catagoryf,"sort":sort})).then((res)=>{
      console.log(res);
    })
  }, [sort]);*/


  useEffect(() => {
    let obj={};
       if (catagory==="CUTTING & THINNING SCISSORS") {
         obj={
          "sort":sort,
          "catagory":catagoryf
        }
       }
       else if (catagory==="RAZORS") {
        obj={
          "sort":sort,
          "catagory":"Razors"
        }
       }
       else if (catagory==="HAIRDRESSING ACCESSORIES") {
        obj={
          "sort":sort,
          "catagory":"Accessories"
        }
       }
        console.log(obj);
        
      dispatch(getAllProducts(obj)).then((res)=>{
        console.log(res);
      })
    }, [sort,catagory]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight transform hover:scale-102 transition-transform duration-300">
            {catagory}
          </h1>
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-800">
            {catagory} COLLECTION
          </h2>
        </div>

        {/* Description Section */}
        <div className="max-w-3xl">
          <p className="text-lg text-gray-600 leading-relaxed hover:text-gray-800 transition-colors duration-300">
            Discover precision and comfort with the 
            <span className="italic font-medium"> Eagle Scissors {catagory} Collection</span>
          </p>
        </div>

        {/* Filter and Sort Section - Now in a single line */}
        <div className="flex flex-wrap items-center justify-end gap-4">
        

          {/* Sort Section */}
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Sort by:</span>
            <div className="relative">
              <button 
                onClick={() => setSortIsOpen(!sortIsOpen)}
                className="flex items-center space-x-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                <span>{showSort}</span>
                <FaChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${sortIsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {sortIsOpen && (
                <div className="absolute right-0 z-10 w-48 mt-2 bg-white border rounded-md shadow-lg animate-fade-in-down">
                  <div className="py-1">
                    <button onClick={()=>{setSort("aToz"); setSortIsOpen(false); setShowSort("Alphabetically, A-Z")}} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                      Alphabetically, A-Z
                    </button>
                    <button onClick={()=>{setSort("zToa"); setSortIsOpen(false) ; setShowSort("Alphabetically, Z-A")}}  className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                      Alphabetically, Z-A
                    </button>
                    <button onClick={()=>{setSort("asc"); setSortIsOpen(false); setShowSort("Price, low to high")}}  className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                      Price, low to high
                    </button>
                    <button onClick={()=>{setSort("desc"); setSortIsOpen(false); setShowSort("Price, high to low")}}  className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                      Price, high to low
                    </button>
                  </div>
                </div>
              )}
            </div>
            <span className="text-gray-600">{products?.length} products</span>
          </div>
        </div>
      </div>
      {isLoading? <div className="sweet-loading w-screen h-screen flex justify-center items-center">
      <MoonLoader
      color="#ff0000"
      cssOverride={{}}
      loading={isLoading}
      size={60}
      speedMultiplier={2}
      /> 
</div>:<div>
      <ProductList products={products} isLoading={isLoading}/>
      </div>}
    </div>
  );
};

export default ShopByCategory;