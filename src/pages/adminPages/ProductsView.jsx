import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaList, FaSlidersH } from 'react-icons/fa';
import { IoMdGrid } from 'react-icons/io';
import ProductList from '../../components/productList/ProductList';
import ProductListAdmin from '../../components/productList/ProductListAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/productSlice/getAllProducts';
import { MoonLoader } from 'react-spinners';

const ProductView = () => {


  let dispatch=useDispatch();
  let {isLoading,products}=useSelector((state)=>state.getAllProducts)
  const [sort,setSort]=useState("asc")
  const [catagory,setCatagory]=useState("")


  useEffect(() => {
    let obj={
      "sort":sort
    };
    if (catagory.length>0) {
      obj={
        "sort":sort,
        "catagory":catagory
      }
    }
    dispatch(getAllProducts(obj)).then((res)=>{
      console.log(res);
    })
  }, [sort,catagory]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  console.log(sort);
  

  const sortOptions = [
    { value: 'asc', label: 'Price: Low to High' },
    { value: 'desc', label: 'Price: High to Low' },
    { value: 'aToz', label: 'Name: A to Z' },
    { value: 'zToa', label: 'Name: Z to A' },
  ];

  const filters = {
    category: ['All', 'Scssiors', 'Razors', 'Acsesories','Pets'],
    availability: ['In Stock', 'Out of Stock'],
  };

  const catagoryF=[
    { value: '', label: 'All' },
    { value: 'Scissors', label: 'Scissors' },
    { value: 'Accessories', label: 'Accessories' },
    { value: 'Razors', label: 'Razors' },
    { value: 'Pets', label: 'Pets' },
  ]

  console.log(catagory);
  
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>
      </div>

      {/* Filters and Sorting Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 mb-8">
        {/* Mobile Filter Button */}
        <button
          className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <FaSlidersH  className="w-4 h-4" />
          <span>Filters</span>
        </button>

        {/* Desktop Filters */}
        <div className="hidden lg:flex items-center space-x-6">
        <select onChange={(e)=>{setCatagory(e.target.value)}} className="form-select w-full lg:w-auto pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900">
            {catagoryF.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* View Options and Sort */}
        <div className="flex items-center space-x-4 w-full lg:w-auto">
          
          <select onChange={(e)=>{setSort(e.target.value)}} className="form-select w-full lg:w-auto pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900">
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile Filters Panel */}
      {isFilterOpen && (
        <div className="lg:hidden mb-6 border rounded-lg p-4 space-y-4">
          <select onChange={(e)=>{setCatagory(e.target.value)}} className="form-select w-full lg:w-auto pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900">
            {catagoryF.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Products Grid/List Container */}
    {isLoading? <div className="sweet-loading w-screen h-screen flex justify-center items-center">
      <MoonLoader
      color="#ff0000"
      cssOverride={{}}
      loading={isLoading}
      size={60}
      speedMultiplier={2}
      /> 
</div>:<ProductListAdmin products={products}/>}
    </div>
  );
};

export default ProductView;