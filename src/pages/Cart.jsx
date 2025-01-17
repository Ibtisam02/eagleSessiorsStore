import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSkusForCart } from "../redux/cartSlice/getItemsInCart";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { MoonLoader } from 'react-spinners';
import { toggle } from "../redux/cartSlice/addToCartToggle";

function Cart() {
  let dispatch = useDispatch();
  let {isLoading, cart } = useSelector((state) => state.itemsInCart);
  let [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("order")) || []
  );
  let [change, setChange] = useState(false);

  // Fetch cart items whenever orders change
  console.log(cart);
  
  useEffect(() => {
    if (orders.length > 0) {
      let data = {
        cart: orders,
      };
      dispatch(getAllSkusForCart(data)).then((res)=>{
        console.log(res);
        
      });
    }
  }, [orders, dispatch]);

  // Update orders when localStorage changes
  useEffect(() => {
    const newOrders = JSON.parse(localStorage.getItem("order") || "[]");
    setOrders(newOrders);
    
    // If orders are empty, refresh cart data
    if (newOrders.length === 0) {
      dispatch(getAllSkusForCart({ cart: [] }));
    }
  }, [change, dispatch]);

  const updateQuantity = (_id, newQuantity, stock) => {
    if (newQuantity <= 0) {
      return toast.error("Quantity must be greater than 0.");
    }
    if (stock < newQuantity) {
      return toast.error("Not Enough Stock!");
    }

    try {
      let order = JSON.parse(localStorage.getItem("order")) || [];
      let existingIndex = order.findIndex(
        (orderr) => orderr._id === _id
      );

      if (existingIndex !== -1) {
        order[existingIndex].quantity = newQuantity;
        localStorage.setItem("order", JSON.stringify(order));
        setOrders(order);
        setChange(!change);
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = (_id) => {
    try {
      let order = JSON.parse(localStorage.getItem("order")) || [];
      let updatedOrder = order.filter(
        (orderr) => !(orderr._id === _id)
      );
      
      localStorage.setItem("order", JSON.stringify(updatedOrder));
      setOrders(updatedOrder);
      setChange(!change);
      toast.success("Item removed from cart");
      dispatch(toggle())
    } catch (error) {
      console.error("Failed to remove product from cart:", error);
      toast.error("Failed to remove item");
    }
  };

  const calculateTotal = () => {
    if (!cart || cart?.length === 0) return 0;
    return cart?.reduce((total, item) => {
      const orderItem = orders.find(
        order => order._id === item?._id 
      );
      return total + item.priceAfterDiscount * (orderItem?.quantity);
    }, 0);
  };


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

        {isLoading? <div className="sweet-loading  h-screen flex justify-center items-center">
      <MoonLoader
      color="#ff0000"
      cssOverride={{}}
      loading={isLoading}
      size={60}
      speedMultiplier={2}
      /> 
</div>:<div className="space-y-4">
          {cart?.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <img
                    src={item?.image?.url}
                    alt={item?.skuId}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-grow space-y-2">
                    <p className="font-medium text-lg">SKU: {item?.skuId}</p>
                    <div className="flex items-center space-x-4">
                      {item?.price===item.priceAfterDiscount?null:<span className="text-gray-500 line-through">
                        £{item?.price?.toLocaleString()}
                      </span>}
                      <span className="text-black font-semibold">
                      £{item?.priceAfterDiscount?.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => {
                          const currentOrder = orders.find(
                            order => order._id === item?._id 

                          );
                          console.log(currentOrder);
                          
                          updateQuantity(
                            item?._id,
                            (currentOrder?.quantity) - 1,
                            item?.stock
                          );
                        }}
                        disabled={
                          orders.find(
                            order => order._id === item?._id
                          )?.quantity <= 1
                        }
                      >
                        <FiMinus className="h-4 w-4" />
                      </button>

                      <span className="w-12 text-center">
                        {orders.find(
                            order => order._id === item?._id 

                          )?.quantity}
                      </span>

                      <button
                        className="p-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => {
                          const currentOrder = orders.find(
                            order => order._id === item?._id
                          );
                          updateQuantity(
                            item?._id,
                            (currentOrder?.quantity) + 1,
                            item?.stock
                          );
                        }}
                        disabled={
                          orders.find(
                            order => order._id === item?._id
                          )?.quantity >= item.stock
                        }
                      >
                        <FiPlus className="h-4 w-4" />
                      </button>

                      <button
                        className="p-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                        onClick={() => removeItem(item?._id)}
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-lg">
                    £{(item.priceAfterDiscount * (orders.find(
                        order => order._id === item._id
                      )?.quantity || 1)).toLocaleString()}
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>}
          <input onClick={()=>{localStorage.removeItem("order");setChange(!change);toast.success("Cart Cleared Successfully!");dispatch(toggle())}} className="mt-4 cursor-pointer py-3 px-4 bg-black hover:bg-primary text-white rounded-lg transition-colors" type="button" value="Clear Cart" />

        {cart?.length > 0 ? (
          <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">SubTotal</span>
              <span className="text-2xl font-bold">
              £{calculateTotal().toLocaleString()}
              </span>
            </div>
            <Link to={"/checkout"}>
            <button className="w-full py-3 px-4 bg-black hover:bg-primary text-white rounded-lg transition-colors">
              Checkout
            </button>
            </Link>

            <p className="text-center text-sm text-gray-500 mt-4">
              Shipping and taxes calculated at checkout
            </p>
            
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <button onClick={()=>{localStorage.removeItem("order");dispatch(toggle())}} className="w-full py-3 px-4 bg-black hover:bg-primary text-white rounded-lg transition-colors">
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;