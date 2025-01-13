import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTestimonials } from "../redux/reviewSlice.jsx/getAllTestmonials";
import { MoonLoader } from "react-spinners";

const TestimonialImages = () => {
  let dispatch = useDispatch();
  let {isLoading, testimonials } = useSelector((state) => state.getAllTestimonialss);
  console.log(testimonials);
  

  useEffect(() => {
    dispatch(getAllTestimonials()).then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <>
    {isLoading? <div className="sweet-loading w-screen h-screen flex justify-center items-center">
      <MoonLoader
      color="#ff0000"
      cssOverride={{}}
      loading={isLoading}
      size={60}
      speedMultiplier={2}
      /> 
</div>:<div className="w-full max-w-md mx-auto p-4">
      <div className="flex flex-col items-center gap-2">
        {testimonials?.map((testi) => {
          return (
            <img
              ckey={testi?._id}
              src={testi?.image?.url}
              alt={`image ${testi?._id}`}
              className="w-96 h-fit object-cover rounded-lg"
            />
          );
        })}
      </div>
    </div>}
    </>
  );
};

export default TestimonialImages;
