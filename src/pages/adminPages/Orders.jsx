import React, { useState, useEffect } from "react";
import {
  FaChevronRight,
  FaCreditCard,
  FaTimes,
  FaMapPin,
  FaBox,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/orderSice/getAllOrders";
import { cancleOrder, changeOrderStatus } from "../../redux/orderSice/changeOrderStatus";
import toast from "react-hot-toast";
import { MoonLoader } from "react-spinners";

const Orders = () => {
  let dispatch = useDispatch();
  const [selectedOrder, setSelectedOrder] = useState(null);
  let {isLoadingOrders, orders } = useSelector((state) => state.getAllOrdersAdmin);
  let { message, isLoading } = useSelector(
    (state) => state.changeOrderStatusAdmin
  );
  let [change,setChange]=useState(false)
  console.log(isLoadingOrders);
  
  useEffect(() => {
    dispatch(getAllOrders()).then((res) => {
      console.log(res);
    });
  }, [change]);

  useEffect(() => {
    if (selectedOrder) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedOrder]);

  const handleStatusChange = (orderId) => {
    dispatch(changeOrderStatus(orderId)).then((res) => {
      if (res?.payload?.success) {
        setChange(!change)
        setSelectedOrder(null)
        return toast.success(res.payload?.message);
      }
    });
  };
  const handleOrderCancel = (orderId) => {
    dispatch(cancleOrder(orderId)).then((res) => {
      if (res?.payload?.success) {
        setChange(!change)
        setSelectedOrder(null)
        return toast.success(res?.payload?.message);
      }
    });
  };

  const getPaymentStatusBadge = (status) => (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${
        status === "paid"
          ? "bg-green-100 text-green-800"
          :status==="canceled"?"bg-red-100 text-red-800": "bg-yellow-100 text-yellow-800"
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );

  const getOrderStatusBadge = (status) => (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${
        status === "pending"
          ? "bg-yellow-100 text-yellow-800"
          : status === "shipped"
          ? "bg-blue-100 text-blue-800"
          : status === "canceled"
          ? "bg-red-100 text-red-800"
          : "bg-green-100 text-green-800"
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );

  const PriceTooltip = ({ itemsPrice, taxPrice, shippingPrice }) => (
    <div className="absolute hidden group-hover:block bg-gray-900 text-white p-2 rounded-md text-sm -mt-20 z-50">
      <div>Items: &pound;{itemsPrice?.toLocaleString()}</div>
      <div>Tax: &pound;{taxPrice?.toLocaleString()}</div>
      <div>Shipping: &pound;{shippingPrice?.toLocaleString()}</div>
    </div>
  );

  const OrderTable = () => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr className="whitespace-nowrap">
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">
                Order ID
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">
                Payment
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">
                Details
              </th>
            </tr>
          </thead>
          {isLoadingOrders? <div className="sweet-loading w-screen h-screen flex justify-center items-center">
      <MoonLoader
      color="#ff0000"
      cssOverride={{}}
      loading={isLoadingOrders}
      size={60}
      speedMultiplier={2}
      /> 
</div>:<tbody className="divide-y divide-gray-200">
            {orders?.map((order) => (
              <tr
                key={order?._id}
                className="hover:bg-gray-50 transition-colors duration-150 ease-in-out whitespace-nowrap"
              >
                <td className="py-3 px-4 text-sm">#{order?._id}</td>
                <td className="py-3 px-4">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">
                      {order?.shippingInfo?.firstName}{" "}
                      {order?.shippingInfo?.lastName}
                    </p>
                    <p className="text-gray-500">
                      {order?.shippingInfo?.email}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-4 font-medium text-sm group relative">
                  &pound;{order?.totalPrice?.toLocaleString()}
                  <PriceTooltip
                    itemsPrice={order?.itemsPrice}
                    taxPrice={order?.taxPrice}
                    shippingPrice={order?.shippingPrice}
                  />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {order?.paymentInfo?.method?.toUpperCase()}
                    </span>
                    {getPaymentStatusBadge(order?.paymentInfo?.status)}
                  </div>
                </td>
                <td className="py-3 px-4">
                  {getOrderStatusBadge(order?.orderStatus)}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <FaChevronRight className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>}
        </table>
      </div>
    </div>
  );

  return (
    <div className="w-full pl-4 pr-4 md:pl-0 md:pr-6 transition-all duration-300 ease-in-out">
      <div className="overflow-x-auto">
        <OrderTable />
      </div>

      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-start md:items-center justify-center p-0 md:p-4 z-50 transition-opacity duration-200 ease-in-out overflow-y-auto"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-t-2xl md:rounded-2xl w-full max-w-4xl mt-20 md:mt-0 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gray-50 p-4 md:p-6 border-b sticky top-0 z-10">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl md:text-2xl font-semibold">
                    Order #{selectedOrder?._id}
                  </h2>
                  {getOrderStatusBadge(selectedOrder?.orderStatus)}
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-160px)] md:max-h-[70vh]">
              <div className="space-y-6 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                      <FaBox className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="group relative">
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-lg font-semibold">
                        &pound;{selectedOrder?.totalPrice?.toLocaleString()}
                      </p>
                      <PriceTooltip
                        itemsPrice={selectedOrder?.itemsPrice}
                        taxPrice={selectedOrder?.taxPrice}
                        shippingPrice={selectedOrder?.shippingPrice}
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg shrink-0">
                      <FaCreditCard className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="text-lg font-semibold">
                        {selectedOrder?.paymentInfo?.method?.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg shrink-0">
                      <FaMapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Shipping To</p>
                      <p className="text-lg font-semibold">
                        {selectedOrder?.shippingInfo?.city}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                  <h3 className="text-lg font-semibold mb-4">Products</h3>
                  <div className="space-y-4">
                    {selectedOrder?.orderItems?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white p-4 rounded-lg flex-wrap md:flex-nowrap gap-4"
                      >
                        <div className="flex items-center gap-4 w-full md:w-auto">
                          <img
                            src={item?.image}
                            alt={item?.name}
                            className="w-16 h-16 rounded-lg object-cover shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="font-medium truncate">
                              {item?.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              Category: {item?.catagory}
                            </p>
                            <p className="text-sm text-gray-500">
                              Sku: {item?.skuPhrase}
                            </p>
                            {item?.productDetails?.barnd && (
                              <p className="text-sm text-gray-500">
                                Brand: {item?.barnd}
                              </p>
                            )}
                            <p className="text-sm text-gray-500">
                              Quantity: {item?.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold w-full md:w-auto text-right">
                          &pound;{item.price?.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FaUser className="w-5 h-5 text-gray-600 shrink-0" />
                      <h3 className="text-lg font-semibold">
                        Customer Details
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <p>
                        <span className="text-gray-500">Name:</span>{" "}
                        {selectedOrder?.shippingInfo?.firstName}{" "}
                        {selectedOrder?.shippingInfo?.lastName}
                      </p>
                      <p>
                        <span className="text-gray-500">Email:</span>{" "}
                        {selectedOrder?.shippingInfo?.email}
                      </p>
                      <p>
                        <span className="text-gray-500">Phone:</span>{" "}
                        {selectedOrder?.shippingInfo?.phone}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FaMapPin className="w-5 h-5 text-gray-600 shrink-0" />
                      <h3 className="text-lg font-semibold">
                        Shipping Address
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <p>
                        <span className="text-gray-500">Address:</span>{" "}
                        {selectedOrder?.shippingInfo?.address}
                      </p>
                      <p>
                        <span className="text-gray-500">City:</span>{" "}
                        {selectedOrder?.shippingInfo?.city}
                      </p>
                      <p>
                        <span className="text-gray-500">State:</span>{" "}
                        {selectedOrder?.shippingInfo?.state}
                      </p>
                      <p>
                        <span className="text-gray-500">Country:</span>{" "}
                        {selectedOrder?.shippingInfo?.country}
                      </p>
                      <p>
                        <span className="text-gray-500">ZIP Code:</span>{" "}
                        {selectedOrder?.shippingInfo?.zipCode}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedOrder.orderStatus !== "delivered" &&
                  selectedOrder.orderStatus !== "cancelled" && (
                    <div className="flex justify-end pt-4 border-t sticky bottom-0 bg-white p-4">
                      {isLoading ? (
                        <div className="flex items-center justify-center w-full">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                      ) : (
                        <div >
                          {selectedOrder.orderStatus === "canceled"||selectedOrder.orderStatus === "deliverd"?null:<div className="flex gap-4 w-full md:w-auto">
                          {selectedOrder.orderStatus==="pending"?<button
                            onClick={() => handleOrderCancel(selectedOrder._id)}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full md:w-auto"
                          >
                            Cancel Order
                          </button>:null}
                          <button
                            onClick={() =>
                              handleStatusChange(selectedOrder._id)
                            }
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto"
                          >
                            {selectedOrder.orderStatus === "pending"
                              ? "Proceed to Shipped"
                              : "Proceed to Delivered"}
                          </button>
                          </div>}
                        </div>
                      )}
                    </div>
                  )}

                {(selectedOrder.orderStatus === "deliverd" ||
                  selectedOrder.orderStatus === "canceled") && (
                  <div className="flex justify-center pt-4 border-t">
                    <span className="flex items-center gap-2 text-lg font-medium">
                      {selectedOrder.orderStatus === "canceled" ? (
                        <>
                          <span className="text-red-600">Order Cancelled</span>
                        </>
                      ) : (
                        <>
                          <span className="text-green-600">
                            Order Delivered
                          </span>
                        </>
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
