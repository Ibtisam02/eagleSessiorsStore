import React, { useState } from "react";
import {
  FaPlus,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
  FaImage,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/productSlice/CreateProductSlic";

const AddProduct = () => {
  let dispatch=useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [errors, setErrors] = useState({});
  let {isLoading}=useSelector((state)=>state.createProduct)

  // Basic Details State
  const [basicDetails, setBasicDetails] = useState({
    name: "",
    discount:"",
    brand:"",
    basePrice: "",
    category: "",
    colors: [],
    sizes: [],
    variants: [],
    baseImage1: null,
    baseImage2: null,
  });

  // New Color and Size inputs
  const [newColor, setNewColor] = useState("");
  const [newSize, setNewSize] = useState("");

  // SKUs State
  const [skus, setSkus] = useState([]);
  const [skuImages,setSkuImages]=useState([]);
  const [images1,setImages1]=useState(null);
  const [images2,setImages2]=useState(null);

  // Description State
  const [description, setDescription] = useState("");

  // New Category Form State
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([
    "Scissors",
    "Razors",
    "Accessories",
  ]);

  const variants = ["Cutting", "Thinning", "Set", "Set With Case"];

  // Generate SKUs based on combinations
  /*const generateSkus = () => {
    const combinations = [];
    basicDetails.colors.forEach((color) => {
      basicDetails.sizes.forEach((size) => {
        basicDetails.variants.forEach((variant) => {
          combinations.push({
            id: `${color}-${size}-${variant}`
              .toLowerCase()
              .replace(/\s+/g, "-"),
            color,
            size,
            variant,
            price: basicDetails.basePrice,
            stock: 0,
            image: null,
          });
        });
      });
    });
    setSkus(combinations);
    setActiveTab(1);
  };*/

  const generateSkus = () => {
    const combinations = [];
    
    // If only colors are present
    if (basicDetails.colors.length && !basicDetails.sizes.length && !basicDetails.variants.length) {
      basicDetails.colors.forEach((color) => {
        combinations.push({
          id: color.toLowerCase().replace(/\s+/g, ""),
          color,
          size: null,
          variant: null,
          price: basicDetails.basePrice,
          stock: 0,
          image: null,
        });
      });
    }
    // If only sizes are present
    else if (!basicDetails.colors.length && basicDetails.sizes.length && !basicDetails.variants.length) {
      basicDetails.sizes.forEach((size) => {
        combinations.push({
          id: size.toLowerCase().replace(/\s+/g, ""),
          color: null,
          size,
          variant: null,
          price: basicDetails.basePrice,
          stock: 0,
          image: null,
        });
      });
    }
    // If only variants are present
    else if (!basicDetails.colors.length && !basicDetails.sizes.length && basicDetails.variants.length) {
      basicDetails.variants.forEach((variant) => {
        combinations.push({
          id: variant.toLowerCase().replace(/\s+/g, ""),
          color: null,
          size: null,
          variant,
          price: basicDetails.basePrice,
          stock: 0,
          image: null,
        });
      });
    }
    // If colors and sizes are present
    else if (basicDetails.colors.length && basicDetails.sizes.length && !basicDetails.variants.length) {
      basicDetails.colors.forEach((color) => {
        basicDetails.sizes.forEach((size) => {
          combinations.push({
            id: `${color}${size}`.toLowerCase().replace(/\s+/g, ""),
            color,
            size,
            variant: null,
            price: basicDetails.basePrice,
            stock: 0,
            image: null,
          });
        });
      });
    }
    // If colors and variants are present
    else if (basicDetails.colors.length && !basicDetails.sizes.length && basicDetails.variants.length) {
      basicDetails.colors.forEach((color) => {
        basicDetails.variants.forEach((variant) => {
          combinations.push({
            id: `${color}${variant}`.toLowerCase().replace(/\s+/g, ""),
            color,
            size: null,
            variant,
            price: basicDetails.basePrice,
            stock: 0,
            image: null,
          });
        });
      });
    }
    // If sizes and variants are present
    else if (!basicDetails.colors.length && basicDetails.sizes.length && basicDetails.variants.length) {
      basicDetails.sizes.forEach((size) => {
        basicDetails.variants.forEach((variant) => {
          combinations.push({
            id: `${size}${variant}`.toLowerCase().replace(/\s+/g, ""),
            color: null,
            size,
            variant,
            price: basicDetails.basePrice,
            stock: 0,
            image: null,
          });
        });
      });
    }
    // If colors, sizes, and variants are all present
    else if (basicDetails.colors.length && basicDetails.sizes.length && basicDetails.variants.length) {
      basicDetails.colors.forEach((color) => {
        basicDetails.sizes.forEach((size) => {
          basicDetails.variants.forEach((variant) => {
            combinations.push({
              id: `${color}${size}${variant}`.toLowerCase().replace(/\s+/g, ""),
              color,
              size,
              variant,
              price: basicDetails.basePrice,
              stock: 0,
              image: null,
            });
          });
        });
      });
    }
  
    setSkus(combinations);
    setActiveTab(1);
  };
  

  // Validation
  const validateTab = (tabIndex) => {
    const newErrors = {};

    if (tabIndex === 0) {
      if (!basicDetails.name) newErrors.name = "Name is required";
      if (!basicDetails.basePrice)
        newErrors.basePrice = "Base price is required";
      if (!basicDetails.category) newErrors.category = "Category is required";
      /*if (basicDetails.colors.length === 0)
        newErrors.colors = "At least one color is required";
      if (basicDetails.sizes.length === 0)
        newErrors.sizes = "At least one size is required";
      if (basicDetails.variants.length === 0)
        newErrors.variants = "At least one variant is required";*/
      if (!basicDetails.baseImage1)
        newErrors.baseImage1 = "First base image is required";
      if (!basicDetails.baseImage2)
        newErrors.baseImage2 = "Second base image is required";
    }

    if (tabIndex === 1) {
      const skuErrors = skus.some(
        (sku) => !sku.price || !sku.stock || !sku.image
      );
      if (skuErrors) newErrors.skus = "All SKU fields are required";
    }

    if (tabIndex === 2) {
      if (!description) newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTabChange = (newTab) => {
    if (validateTab(activeTab)) {
      if (newTab === 1 && activeTab === 0) {
        generateSkus();
      } else {
        setActiveTab(newTab);
      }
    }
  };

  const handleImagePreview = (file, type, skuId = null) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (skuId) {
        setSkus(
          skus.map((sku) =>
            sku.id === skuId ? { ...sku, image: reader.result } : sku
          )
        );
      } else {
        setBasicDetails((prev) => ({ ...prev, [type]: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };


  let addProductHandler= (e) => {
    e.preventDefault();
    if (validateTab(2)) {
      // Submit form logic here
      console.log(skus);
      
     
      let formData=new FormData();
      for (let i = 0; i < skuImages.length; i++) {
        formData.append("files",skuImages[i]);
        
      }
      let skuss=[];
      for (let i = 0; i < skus.length; i++) {
        skuss.push({price:skus[i].price,stock:skus[i].stock,skuId:skus[i].id})
        
      }
      
      formData.append("images1",images1);
      formData.append("images2",images2);
      formData.append("name",basicDetails.name);
      formData.append("brand",basicDetails.brand);
      formData.append("basePrice",basicDetails.basePrice);
      formData.append("category",basicDetails.category);
      formData.append("colors",JSON.stringify(basicDetails.colors));
      formData.append("sizes",JSON.stringify(basicDetails.sizes));
      formData.append("variants",JSON.stringify(basicDetails.variants));
      formData.append("discount",basicDetails.discount);
      formData.append("description",description);
      formData.append("skus",JSON.stringify(skuss));
      
      dispatch(createProduct(formData)).then((res)=>{
        console.log(res);
        
      })
    }
  }
  return (
    <div className="lg:ml-72 min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Add New Product
        </h1>
        
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {["Basic Details", "SKUs", "Description"].map((tab, index) => (
                <button
                  key={tab}
                  className={`py-4 px-1 border-b-2 font-medium text-sm
                    ${
                      activeTab === index
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  onClick={() => handleTabChange(index)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* Basic Details Tab */}
          {activeTab === 0 && (
            <div className="space-y-6">
              {/* Name and Base Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name*
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500
            ${errors.name ? "border-red-500" : ""}`}
                    value={basicDetails.name}
                    onChange={(e) =>
                      setBasicDetails({ ...basicDetails, name: e.target.value })
                    }
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Base Price*
                  </label>
                  <input
                    type="number"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500
            ${errors.basePrice ? "border-red-500" : ""}`}
                    value={basicDetails.basePrice}
                    onChange={(e) =>
                      setBasicDetails({
                        ...basicDetails,
                        basePrice: e.target.value,
                      })
                    }
                  />
                  {errors.basePrice && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.basePrice}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Discount (%) <span className="text-[9px]">This will be applied on all skus</span>
                  </label>
                  <input
                    type="number"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500
            ${errors.discount ? "border-red-500" : ""}`}
                    value={basicDetails.discount}
                    onChange={(e) =>
                      setBasicDetails({
                        ...basicDetails,
                        discount: e.target.value,
                      })
                    }
                  />
                  {errors.discount && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.discount}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Brand 
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500
            ${errors.brand ? "border-red-500" : ""}`}
                    value={basicDetails.brand}
                    onChange={(e) =>
                      setBasicDetails({
                        ...basicDetails,
                        brand: e.target.value,
                      })
                    }
                  />
                  {errors.brand && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.brand}
                    </p>
                  )}
                </div>
              </div>

              {/* Category Selection */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Category*
                  </label>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                    onClick={() => setShowCategoryForm(!showCategoryForm)}
                  >
                    <FaPlus className="mr-2" />
                    Add New Category
                  </button>
                </div>

                {showCategoryForm ? (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Enter new category"
                    />
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => {
                        if (newCategory) {
                          setCategories([...categories, newCategory]);
                          setNewCategory("");
                          setShowCategoryForm(false);
                        }
                      }}
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <select
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500
            ${errors.category ? "border-red-500" : ""}`}
                    value={basicDetails.category}
                    onChange={(e) =>
                      setBasicDetails({
                        ...basicDetails,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                )}
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                )}
              </div>

              {/* Colors and Sizes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Colors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Colors*
                  </label>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      placeholder="Enter color"
                    />
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => {
                        if (newColor) {
                          setBasicDetails({
                            ...basicDetails,
                            colors: [...basicDetails.colors, newColor],
                          });
                          setNewColor("");
                        }
                      }}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {basicDetails.colors.map((color, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100"
                      >
                        {color}
                        <button
                          type="button"
                          className="ml-2 text-gray-400 hover:text-gray-600"
                          onClick={() => {
                            setBasicDetails({
                              ...basicDetails,
                              colors: basicDetails.colors.filter(
                                (_, i) => i !== index
                              ),
                            });
                          }}
                        >
                          <FaTimes />
                        </button>
                      </span>
                    ))}
                  </div>
                  {errors.colors && (
                    <p className="mt-1 text-sm text-red-500">{errors.colors}</p>
                  )}
                </div>

                {/* Sizes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sizes*
                  </label>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      placeholder="Enter size"
                    />
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => {
                        if (newSize) {
                          setBasicDetails({
                            ...basicDetails,
                            sizes: [...basicDetails.sizes, newSize],
                          });
                          setNewSize("");
                        }
                      }}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {basicDetails.sizes.map((size, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100"
                      >
                        {size}
                        <button
                          type="button"
                          className="ml-2 text-gray-400 hover:text-gray-600"
                          onClick={() => {
                            setBasicDetails({
                              ...basicDetails,
                              sizes: basicDetails.sizes.filter(
                                (_, i) => i !== index
                              ),
                            });
                          }}
                        >
                          <FaTimes />
                        </button>
                      </span>
                    ))}
                  </div>
                  {errors.sizes && (
                    <p className="mt-1 text-sm text-red-500">{errors.sizes}</p>
                  )}
                </div>
              </div>

              {/* Variants */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Variants*
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {variants.map((variant) => (
                    <label key={variant} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        checked={basicDetails.variants.includes(variant)}
                        onChange={(e) => {
                          const updatedVariants = e.target.checked
                            ? [...basicDetails.variants, variant]
                            : basicDetails.variants.filter(
                                (v) => v !== variant
                              );
                          setBasicDetails({
                            ...basicDetails,
                            variants: updatedVariants,
                          });
                        }}
                      />
                      <span className="ml-2">{variant}</span>
                    </label>
                  ))}
                </div>
                {errors.variants && (
                  <p className="mt-1 text-sm text-red-500">{errors.variants}</p>
                )}
              </div>

              {/* Base Images */}
              <div className="mt-2">
                <div className="flex items-center justify-center w-full">
                  <label className="w-full h-48 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    {basicDetails.baseImage1 ? (
                      <div className="w-full h-full relative">
                        <img
                          src={basicDetails.baseImage1}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          onClick={() =>
                            setBasicDetails({
                              ...basicDetails,
                              baseImage1: null,
                            })
                          }
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaImage className="w-10 h-10 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Click to upload base image 1
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          setImages1(e.target.files[0])
                          handleImagePreview(e.target.files[0], "baseImage1");
                        }
                      }}
                    />
                  </label>
                </div>
                {errors.baseImage1 && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.baseImage1}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Base Image 2*
                </label>
                <div className="mt-2">
                  <div className="flex items-center justify-center w-full">
                    <label className="w-full h-48 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      {basicDetails.baseImage2 ? (
                        <div className="w-full h-full relative">
                          <img
                            src={basicDetails.baseImage2}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            onClick={() =>
                              setBasicDetails({
                                ...basicDetails,
                                baseImage2: null,
                              })
                            }
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FaImage className="w-10 h-10 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">
                            Click to upload base image 2
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            setImages2(e.target.files[0])
                            handleImagePreview(e.target.files[0], "baseImage2");
                          }
                        }}
                      />
                    </label>
                  </div>
                  {errors.baseImage2 && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.baseImage2}
                    </p>
                  )}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => handleTabChange(1)}
                >
                  Next: SKUs
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* SKUs Tab */}
          {activeTab === 1 && (
            <div>
              <div className="space-y-6">
                {skus.map((sku, index) => (
                  <div
                    key={sku.id}
                    className="border rounded-lg p-4 bg-gray-50"
                  >
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {sku.color} - {sku.size} - {sku.variant}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Price*
                        </label>
                        <input
                          type="number"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          value={sku.price}
                          onChange={(e) => {
                            const newSkus = [...skus];
                            newSkus[index] = { ...sku, price: e.target.value };
                            setSkus(newSkus);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Stock*
                        </label>
                        <input
                          type="number"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          value={sku.stock}
                          onChange={(e) => {
                            const newSkus = [...skus];
                            newSkus[index] = { ...sku, stock: e.target.value };
                            setSkus(newSkus);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Image*
                        </label>
                        <div className="mt-1">
                          <div className="flex items-center justify-center">
                            <label className="w-full h-32 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50">
                              {sku.image ? (
                                <div className="w-full h-full relative">
                                  <img
                                    src={sku.image}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                  <button
                                    type="button"
                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                    onClick={(e) => {
                                      const newSkus = [...skus];
                                      newSkus[index] = { ...sku, image: null };
                                      setSkus(newSkus);
                                    }}
                                  >
                                    <FaTimes />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <FaImage className="w-8 h-8 text-gray-400" />
                                  <p className="mt-1 text-sm text-gray-500">
                                    Upload image
                                  </p>
                                </div>
                              )}
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                  if (e.target.files[0]) {
                                    setSkuImages([...skuImages,e.target.files[0]])
                                    handleImagePreview(
                                      e.target.files[0],
                                      "image",
                                      sku.id
                                    );
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {errors.skus && (
                  <p className="text-sm text-red-500">{errors.skus}</p>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    onClick={() => setActiveTab(0)}
                  >
                    <FaArrowLeft className="mr-2" />
                    Back: Basic Details
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => handleTabChange(2)}
                  >
                    Next: Description
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Description Tab */}
          {activeTab === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Description*
                </label>
                <textarea
                  rows={10}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500
                    ${errors.description ? "border-red-500" : ""}`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter detailed product description..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Navigation and Submit Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => setActiveTab(1)}
                >
                  <FaArrowLeft className="mr-2" />
                  Back: SKUs
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
                  onClick={addProductHandler}
                >
                  Save Product
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
