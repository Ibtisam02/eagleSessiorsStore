import React from 'react';
import UserCard from '../cards/UserCard';
import AdminCard from '../cards/AdminCard';


const ProductListAdmin = ({products}) => {
    
      
      

  return (
    <div className="mt-14 px-10">
        <h1 className="text-4xl font-bold mb-12 tracking-wide opacity-0 animate-fade-in-up">
          BEST SALERS
        </h1>
      <div className='flex justify-around items-start flex-wrap gap-y-5'>
        {products?.map((product, index) => (

            <AdminCard key={index} id={product?._id} currency='£' image1={product?.images?.[0]?.url} image2={product?.images?.[1]?.url} isSpecial={product?.discount?true:false} title={product?.name} rating={product?.rating} reviews={product?.numberOfReviews} originalPrice={product?.basePprice} salePrice={(product?.basePprice-(product?.basePprice/100*product?.discount))}                                        />
        ))}
        </div>
      
    </div>
  );
};

export default ProductListAdmin;
