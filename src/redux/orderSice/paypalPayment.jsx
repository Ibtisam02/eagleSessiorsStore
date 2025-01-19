import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  payLoading: false,
  session:null
};


export const paypalPaymentCard = createAsyncThunk(
    "pay/with/paypal",
    async (data) => {
      try {
        const response = await axios.post("/paypal/payments",data,{
            withCredentials:true
        });
        return response.data;
      } catch (error) {
        console.log(error);
       return toast.error(error?.response?.data?.message)
        
      }
    }
  );



  const payWithPaypalCardSlice = createSlice({
    name: "payWithPaypalCardSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(paypalPaymentCard.pending, (state) => {
          state.payLoading = true;
        })
        .addCase(paypalPaymentCard.fulfilled, (state, action) => {
          state.payLoading = false;
          state.session = action.payload?action.payload?.links:null;
        })
        .addCase(paypalPaymentCard.rejected, (state, action) => {
          state.payLoading = false;
          state.session = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default payWithPaypalCardSlice.reducer;
  