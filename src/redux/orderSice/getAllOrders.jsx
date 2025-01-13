import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  isLoadingOrders: false,
  orders:null
};


export const getAllOrders = createAsyncThunk(
    "get/all/orders",
    async () => {
      try {
        const response = await axios.get("/get/all/orders",{
          withCredentials:true
        });
        return response.data;
      } catch (error) {
        console.log(error);
        return toast.error(error.response.data.message)
      }
    }
  );



  const getAllOrdersCodSlice = createSlice({
    name: "getAllOrdersCodSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllOrders.pending, (state) => {
          state.isLoadingOrders = true;
        })
        .addCase(getAllOrders.fulfilled, (state, action) => {
          state.isLoadingOrders = false;
          state.orders = action.payload?.success?action.payload?.orders:null;
        })
        .addCase(getAllOrders.rejected, (state, action) => {
          state.isLoadingOrders = false;
          state.orders = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default getAllOrdersCodSlice.reducer;
  