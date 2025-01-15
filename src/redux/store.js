import {configureStore} from '@reduxjs/toolkit';
import authReducers from "./authSlice"
import createProductReducer from "./productSlice/CreateProductSlic"
import getAllProductsReducer from "./productSlice/getAllProducts"
import getSingleProductReducer from "./productSlice/getsingleProductSlice"
import getSingleSkuReducer from "./productSlice/getSingleSkuSlice"
import getItemsInCartReducer from "./cartSlice/getItemsInCart"
import getAllOrdersReducer from "./orderSice/getAllOrders"
import changeOrderStatusReducer from "./orderSice/changeOrderStatus"
import getAllMyOrdersReducer from "./orderSice/getMyAllOrders"
import getAllReviewsReducer from "./reviewSlice.jsx/getAllReviews"
import getAllReviewsAdminReducer from "./reviewSlice.jsx/getAllReviewsAdmin"
import addUserReviewReducer from "./reviewSlice.jsx/addUserReview"
import getAllTestimonialsReducer from "./reviewSlice.jsx/getAllTestmonials"
import getAllBannersReducer from "./reviewSlice.jsx/getAllBanners"
import sendEmailForMsgReducer from "./reviewSlice.jsx/sendMsgEmail"
import placeOrderReducer from "./orderSice/placeOrderSlice"
import getLogoReducer from "./reviewSlice.jsx/getLogo"
import stripePaywithCardReducer from "./orderSice/stripePayment"
import updateProductReducer from "./productSlice/updateProductSlice"


 const store = configureStore({
    reducer:{
        auth:authReducers,
        createProduct:createProductReducer,
        getAllProducts:getAllProductsReducer,
        getSingleProduct:getSingleProductReducer,
        getSingleSku:getSingleSkuReducer,
        itemsInCart:getItemsInCartReducer,
        getAllOrdersAdmin:getAllOrdersReducer,
        changeOrderStatusAdmin:changeOrderStatusReducer,
        getAllMyOrders:getAllMyOrdersReducer,
        getAllReviewsUser:getAllReviewsReducer,
        getAllReviewsAdmin:getAllReviewsAdminReducer,
        addUserReview:addUserReviewReducer,
        getAllTestimonialss:getAllTestimonialsReducer,
        getAllBanners:getAllBannersReducer,
        sendMsgEmail:sendEmailForMsgReducer,
        placeOrder:placeOrderReducer,
        getLogoAll:getLogoReducer,
        payWithStripeCard:stripePaywithCardReducer,
        updateProduct:updateProductReducer
    }
})

export default store