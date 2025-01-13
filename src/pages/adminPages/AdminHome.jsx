import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaUsers,
  FaBox,
  FaShoppingBag,
  FaTrash,
  FaImage,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addTestimonialAdmin,
  deleteTestimonialAdmin,
} from "../../redux/reviewSlice.jsx/testimonial";
import { getAllTestimonials } from "../../redux/reviewSlice.jsx/getAllTestmonials";
import {
  addBannerAdmin,
  deleteBannerAdmin,
} from "../../redux/reviewSlice.jsx/banners";
import { getAllBanners } from "../../redux/reviewSlice.jsx/getAllBanners";
import { MoonLoader } from "react-spinners";
import { changeLogo } from "../../redux/reviewSlice.jsx/changeLogo";

const AdminHome = () => {
  let dispatch = useDispatch();
  let [change, setChange] = useState(false);
  const [logo, setLogo] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");
  const [testimonialPreview, setTestimonialPreview] = useState("");
  const [testimonialToSend, setTestimonialToSend] = useState(null);
  const [bannerToSend, setBannerToSend] = useState(null);
  const [bannerFormData, setBannerFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    buttonText: "",
    link: "",
  });

  // Example data - replace with actual data from your backend
  const stats = {
    pendingOrders: 12,
    totalUsers: 156,
    totalProducts: 89,
  };
  console.log(logo);

  let { noOfPendingOrders, noOfProducts, noOfUsers, testimonials } =
    useSelector((state) => state.getAllTestimonialss);
  let { isLoading, banners } = useSelector((state) => state.getAllBanners);
  useEffect(() => {
    dispatch(getAllTestimonials()).then((res) => {
      console.log(res);
    });

    dispatch(getAllBanners()).then((res) => {
      console.log(res);
    });
    
  }, [dispatch, change]);

  console.log(banners);

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerToSend(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTestimonialImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTestimonialToSend(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTestimonialPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerSubmit = (e) => {
    e.preventDefault();
    if (!bannerToSend) {
      return toast.error("image is required");
    }

    let formData = new FormData();
    formData.append("image", bannerToSend);
    formData.append("title", bannerFormData.title);
    formData.append("description", bannerFormData.description);
    formData.append("link", bannerFormData.link);
    formData.append("subTitle", bannerFormData.subtitle);
    formData.append("buttonText", bannerFormData.buttonText);
    dispatch(addBannerAdmin(formData)).then((res) => {
      if (res.payload?.success) {
        setBannerToSend({
          title: "",
          subtitle: "",
          description: "",
          buttonText: "",
          link: "",
        })
        setBannerToSend(null)
        setChange(!change);
        return toast.success("banner Added successfully!")
      }
      
    });
  };

  const handleTestimonialSubmit = (e) => {
    e.preventDefault();
    if (!testimonialToSend) {
      return toast.error("plz add a testimonial image");
    }
    // Add your backend submission logic here
    let formData = new FormData();
    formData.append("image", testimonialToSend);
    dispatch(addTestimonialAdmin(formData)).then((res) => {
      if (res.payload.success) {
        setChange(!change);
        setTestimonialToSend(null)
        return toast.success("Added Successfully")
        
      }
    });
  };

  let deleteTestimonials = (id) => {
    console.log(id);
    dispatch(deleteTestimonialAdmin(id)).then((res) => {
      if (res?.payload?.success) {
        setChange(!change);
        return toast.success(res?.payload?.message)
      }
      
    });
  };
  let deleteBanner = (id) => {
    dispatch(deleteBannerAdmin(id)).then((res) => {
      if (res?.payload?.success) {
        setChange(!change);
        return toast.success(res?.payload?.message)
      }
    });
  };

  let ChangeLogoHandler = (e) => {
    e.preventDefault();
    if (!logo) {
      return toast.error("Logo is Required!");
    }
    let formData=new FormData();
    formData.append("image",logo);
    dispatch(changeLogo(formData)).then((res)=>{
      console.log(res);
      if (res?.payload?.success) {
        setLogo(null)
        return toast.success(res.payload?.message)
      }
      
    })
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Pending Orders</p>
              <h3 className="text-white text-2xl font-bold">
                {noOfPendingOrders}
              </h3>
            </div>
            <FaShoppingBag className="text-white/80 text-3xl" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Total Users</p>
              <h3 className="text-white text-2xl font-bold">{noOfUsers}</h3>
            </div>
            <FaUsers className="text-white/80 text-3xl" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Total Products</p>
              <h3 className="text-white text-2xl font-bold">{noOfProducts}</h3>
            </div>
            <FaBox className="text-white/80 text-3xl" />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="sweet-loading w-screen h-screen flex justify-center items-center">
          <MoonLoader
            color="#ff0000"
            cssOverride={{}}
            loading={isLoading}
            size={60}
            speedMultiplier={2}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Banner Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Add New Banner</h2>
            <form onSubmit={handleBannerSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Banner Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerImageChange}
                  className="w-full p-2 border rounded"
                />
                {bannerPreview && (
                  <div className="mt-4">
                    <img
                      src={bannerPreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full p-2 border rounded"
                  value={bannerFormData.title}
                  onChange={(e) =>
                    setBannerFormData({
                      ...bannerFormData,
                      title: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Subtitle"
                  className="w-full p-2 border rounded"
                  value={bannerFormData.subtitle}
                  onChange={(e) =>
                    setBannerFormData({
                      ...bannerFormData,
                      subtitle: e.target.value,
                    })
                  }
                />
              </div>
              <textarea
                placeholder="Description"
                className="w-full p-2 border rounded"
                value={bannerFormData.description}
                onChange={(e) =>
                  setBannerFormData({
                    ...bannerFormData,
                    description: e.target.value,
                  })
                }
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Button Text"
                  className="w-full p-2 border rounded"
                  value={bannerFormData.buttonText}
                  onChange={(e) =>
                    setBannerFormData({
                      ...bannerFormData,
                      buttonText: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Link"
                  className="w-full p-2 border rounded"
                  value={bannerFormData.link}
                  onChange={(e) =>
                    setBannerFormData({
                      ...bannerFormData,
                      link: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Add Banner
              </button>
            </form>
          </div>

          {/* Testimonial Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Add Testimonial Image</h2>
            <form onSubmit={handleTestimonialSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Testimonial Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleTestimonialImageChange}
                  className="w-full p-2 border rounded"
                />
                {testimonialPreview && (
                  <div className="mt-4">
                    <img
                      src={testimonialPreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors disabled:opacity-55"
              >
                Add Testimonial
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Existing Items Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Existing Banners */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Existing Banners</h2>
          <div className="space-y-4">
            {banners?.map((banner) => (
              <div key={banner?._id} className="border rounded p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">{banner?.title}</h3>
                  <button
                    onClick={() => {
                      // Add delete logic here
                      deleteBanner(banner?._id);
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
                <img
                  src={banner?.image?.url}
                  alt={banner?.title}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <p className="text-sm text-gray-600">{banner?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Existing Testimonials */}
        {isLoading ? (
          <div className="sweet-loading w-screen h-screen flex justify-center items-center">
            <MoonLoader
              color="#ff0000"
              cssOverride={{}}
              loading={isLoading}
              size={60}
              speedMultiplier={2}
            />
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Existing Testimonials</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {testimonials?.length > 0 ? (
                testimonials?.map((testimonial) => (
                  <div key={testimonial?._id} className="relative group">
                    <img
                      src={testimonial?.image?.url}
                      alt={`image ${testimonial?._id}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      onClick={() => {
                        deleteTestimonials(testimonial?._id);
                      }}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))
              ) : (
                <p>No Testimonial</p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Change Logo</h2>
        <form onSubmit={ChangeLogoHandler} className="flex flex-col gap-y-4">
          <input
            type="file"
            onChange={(e) => {
              setLogo(e.target.files[0]);
            }}
          />
          <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-2 rounded hover:bg-primary transition-colors"
              >
                Add Banner
              </button>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default AdminHome;
