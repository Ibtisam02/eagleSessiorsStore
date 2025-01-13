import React from 'react';
import UserCard from '../cards/UserCard';
import { MoonLoader } from 'react-spinners';


const ProductList = ({products,isLoading}) => {
    
      
      
      

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
</div>:<div className="mt-14 px-10">
        <h1 className="text-4xl font-bold mb-12 tracking-wide opacity-0 animate-fade-in-up">
          BEST SALERS
        </h1>
      <div className='flex justify-around items-center flex-wrap gap-y-5'>
        {products?.map((product, index) => (

            <UserCard key={index} id={product?._id} currency='£' image1={product?.images?.[0]?.url} image2={product?.images?.[1]?.url} isSpecial={product?.discount?true:false} title={product?.name} rating={product?.rating} reviews={product?.numberOfReviews} originalPrice={product?.basePprice} salePrice={(product?.basePprice-(product?.basePprice/100*product?.discount)).toFixed(0)} />
        ))}
        </div>
      
    </div>}
    </>
  );
};

export default ProductList;
