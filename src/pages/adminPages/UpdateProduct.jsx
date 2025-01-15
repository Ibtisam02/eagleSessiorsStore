import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/productSlice/CreateProductSlic";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../redux/productSlice/getsingleProductSlice";

const AddProduct = () => {
  let { id } = useParams();
  let dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState({});
  const { isLoading } = useSelector((state) => state.createProduct);
  const { product, skus } = useSelector((state) => state.getSingleProduct);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  // Basic Details State
  const [basicDetails, setBasicDetails] = useState({
    name: "",
    discount: "",
    brand: "",
    basePrice: "",
    category: "",
  });

  // SKUs State
  const [skusToSend, setSkusToSend] = useState([]);

  // Description State
  const [description, setDescription] = useState("");

  // New Category Form State
  const [categories] = useState(["Scissors", "Razors", "Accessories"]);

  useEffect(() => {
    if (product) {
      setBasicDetails({
        name: product?.name || "",
        discount: product?.discount || "",
        brand: product?.brand || "",
        basePrice: product?.basePprice || "",
        category: product?.catagory || "",
      });
      setDescription(product?.description || "");
    }
  }, [product]);

  const handleTabChange = (newTab) => setActiveTab(newTab);

  const addProductHandler = (e) => {
    e.preventDefault();

    // Filter SKUs where stock or price has changed
    console.log(basicDetails);
    console.log(skus);
    const updatedSkus = skus?.map((sku, index) => {
      
      
      const updatedSku = skusToSend[index] || {};
      return (
        updatedSku.price !== undefined || updatedSku.stock !== undefined
      )
        ? { ...sku, ...updatedSku }
        : null;
    }).filter(Boolean);
    console.log(updatedSkus);
    const formData = new FormData();
    formData.append("name", basicDetails.name);
    formData.append("brand", basicDetails.brand);
    formData.append("basePrice", basicDetails.basePrice);
    formData.append("category", basicDetails.category);
    formData.append("discount", basicDetails.discount);
    formData.append("description", description);
    formData.append("skus", JSON.stringify(updatedSkus));

    dispatch(createProduct(formData)).then((res) => {
      if (res.payload.success) {
        toast.success(res.payload.message);
      }
    });
  };

  return (
    <div className="lg:ml-72 min-h-screen bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-black mb-8">Update Product</h1>

        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            {["Basic Details", "SKUs", "Description"].map((tab, index) => (
              <button
                key={tab}
                className={`py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === index
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                onClick={() => handleTabChange(index)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-gray-100 rounded-lg shadow p-6">
          {activeTab === 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black">
                    Product Name*
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    value={basicDetails.name}
                    onChange={(e) =>
                      setBasicDetails({ ...basicDetails, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">
                    Base Price*
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    value={basicDetails.basePrice}
                    min={1}
                    onChange={(e) =>
                      setBasicDetails({ ...basicDetails, basePrice: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    value={basicDetails.discount}
                    min={0}
                    onChange={(e) =>
                      setBasicDetails({ ...basicDetails, discount: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">
                    Brand
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    value={basicDetails.brand}
                    onChange={(e) =>
                      setBasicDetails({ ...basicDetails, brand: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black">
                  Category*
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  value={basicDetails.category}
                  onChange={(e) =>
                    setBasicDetails({ ...basicDetails, category: e.target.value })
                  }
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
                  onClick={() => handleTabChange(1)}
                >
                  Next: SKUs
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div>
              {skus?.map((sku, index) => (
                <div
                  key={sku?._id}
                  className="border rounded-lg p-4 bg-white mb-4"
                >
                  <h3 className="text-lg font-medium text-black mb-4">
                    SKU ID: {sku?.skuId}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black">
                        Price*
                      </label>
                      <input
                        type="number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                        defaultValue={sku?.price}
                        onChange={(e) => {
                          const updated = { price: e.target.value };
                          setSkusToSend((prev) => {
                            const newSkus = [...prev];
                            newSkus[index] = { ...newSkus[index], ...updated };
                            return newSkus;
                          });
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black">
                        Stock*
                      </label>
                      <input
                        type="number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                        defaultValue={sku?.stock}
                        onChange={(e) => {
                          const updated = { stock: e.target.value };
                          setSkusToSend((prev) => {
                            const newSkus = [...prev];
                            newSkus[index] = { ...newSkus[index], ...updated };
                            return newSkus;
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
                  onClick={() => handleTabChange(0)}
                >
                  <FaArrowLeft className="mr-2" /> Back: Basic Details
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
                  onClick={() => handleTabChange(2)}
                >
                  Next: Description
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Product Description*
                </label>
                <textarea
                  rows={10}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter detailed product description..."
                />
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
                  onClick={() => handleTabChange(1)}
                >
                  <FaArrowLeft className="mr-2" /> Back: SKUs
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
