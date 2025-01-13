import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPaypal, FaCreditCard, FaTruck, FaUniversity } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getAllSkusForCart } from '../redux/cartSlice/getItemsInCart';
import { placeOrderWithCod } from '../redux/orderSice/placeOrderSlice';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { stripePaymentCard } from '../redux/orderSice/stripePayment';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.itemsInCart);
  const { isLoading } = useSelector((state) => state.placeOrder);
  const { payLoading } = useSelector((state) => state.payWithStripeCard);
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("order")) || []
  );
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
console.log(process.env.STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {
    if (orders.length > 0) {
      let data = { cart: orders };
      dispatch(getAllSkusForCart(data));
    }
  }, [orders, dispatch]);

  const SHIPPING_FEE = 50;
  const TAX_RATE = 0.1;

  const calculateTotal = () => {
    if (!cart || cart?.length === 0) return 0;
    return cart?.reduce((total, item) => {
      const orderItem = orders.find(
        order => order._id===item?._id
      );
      return total + item.priceAfterDiscount * (orderItem?.quantity || 1);
    }, 0);
  };

  const handleShippingInput = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async () => {
    
    try {
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'country'];
      const missingFields = requiredFields.filter(field => !shippingData[field]);
      
      if (missingFields.length > 0) {
        alert('Please fill in all required shipping information');
        return;
      }
      if (paymentMethod==="card") {
        let stripe=await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)
        dispatch(stripePaymentCard({orders})).then((res)=>{
          console.log(res);
          let result=stripe.redirectToCheckout({
            sessionId:res.payload.id
          })
          
        })
      }
      else if (paymentMethod==="cod") {
        dispatch(placeOrderWithCod({
          shippingData,
          orders
        })).then((res)=>{
          console.log(res);

          if (res?.payload?.success) {
            return toast.success(res.payload?.message)
          }
          
        });
      }
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } 
  };



  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {orders.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Shipping Form */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={shippingData.firstName}
                    onChange={handleShippingInput}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={shippingData.lastName}
                    onChange={handleShippingInput}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={shippingData.email}
                    onChange={handleShippingInput}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingData.phone}
                    onChange={handleShippingInput}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={shippingData.address}
                    onChange={handleShippingInput}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingData.city}
                    onChange={handleShippingInput}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State/Province *</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingData.state}
                    onChange={handleShippingInput}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ZIP/Postal Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingData.zipCode}
                    onChange={handleShippingInput}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={shippingData.country}
                    onChange={handleShippingInput}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Payment Methods and Invoice */}
            <div className="space-y-6">
              {/* Payment Methods */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className={`p-4 border rounded-lg flex items-center justify-center gap-2 transition-all
                      ${paymentMethod === 'card' ? 'border-black bg-black text-white' : 'hover:bg-gray-50'}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <FaCreditCard />
                    <span>Credit Card</span>
                  </button>
                  <button
                    type="button"
                    className={`p-4 border rounded-lg flex items-center justify-center gap-2 transition-all
                      ${paymentMethod === 'paypal' ? 'border-black bg-black text-white' : 'hover:bg-gray-50'}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <FaPaypal />
                    <span>PayPal</span>
                  </button>
                  <button
                    type="button"
                    className={`p-4 border rounded-lg flex items-center justify-center gap-2 transition-all
                      ${paymentMethod === 'bank' ? 'border-black bg-black text-white' : 'hover:bg-gray-50'}`}
                    onClick={() => setPaymentMethod('bank')}
                  >
                    <FaUniversity />
                    <span>Bank Transfer</span>
                  </button>
                  <button
                    type="button"
                    className={`p-4 border rounded-lg flex items-center justify-center gap-2 transition-all
                      ${paymentMethod === 'cod' ? 'border-black bg-black text-white' : 'hover:bg-gray-50'}`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <FaTruck />
                    <span>Cash on Delivery</span>
                  </button>
                </div>
              </div>

              {/* Invoice */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4">
                  {cart?.map((item, index) => {
                    const orderItem = orders.find(
                      order => order._id === item?._id
                    );
                    const quantity = orderItem?.quantity;
                    
                    return (
                      <div key={index} className="flex justify-between items-center py-4 border-b">
                        <div className="flex items-center gap-4">
                          <img
                            src={item?.image?.url}
                            alt={item?.skuId}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium">SKU: {item?.skuId}</p>
                            <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                          </div>
                        </div>
                        <p className="font-semibold">
                          £{(item?.priceAfterDiscount * quantity).toLocaleString()}
                        </p>
                      </div>
                    );
                  })}

                  <div className="space-y-3 pt-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>£{calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping Fee</span>
                      <span>£{SHIPPING_FEE.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between font-bold text-lg pt-4 border-t">
                      <span>Total</span>
                      <span>£{(calculateTotal()+SHIPPING_FEE).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={payLoading ||isLoading}
                    className="w-full py-4 px-6 mt-6 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-lg font-medium"
                  >
                    {payLoading||isLoading  ? 'Processing...' : 'Place Order'}
                  </button>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    By placing your order, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Link
            to="/products"
            className="inline-block py-4 px-6 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors text-lg font-medium"
          >
            Continue Shopping
          </Link>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;