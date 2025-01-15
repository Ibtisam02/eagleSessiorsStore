import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  message:null
};


export const changeOrderStatus = createAsyncThunk(
    "change/order/status",
    async (id) => {
      try {
        const response = await axios.put("/change/order/status",{id},{
            withCredentials:true
        });
        return response.data;
      } catch (error) {
        console.log(error);
        
      }
    }
  );
export const cancleOrder = createAsyncThunk(
    "change/order/cancle",
    async (id) => {
      try {
        const response = await axios.put("/cancle/order",{id},{
            withCredentials:true
        });
        return response.data;
      } catch (error) {
        console.log(error);
        return toast.error(error.response.data.message)
      }
    }
  );



  const changeOrderStatusSlice = createSlice({
    name: "changeOrderStatusSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(changeOrderStatus.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(changeOrderStatus.fulfilled, (state, action) => {
          state.isLoading = false;
          state.message = action.payload?.success?action.payload?.message:null;
        })
        .addCase(changeOrderStatus.rejected, (state, action) => {
          state.isLoading = false;
          state.message = null;
        })
        .addCase(cancleOrder.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(cancleOrder.fulfilled, (state, action) => {
          state.isLoading = false;
          state.message = action.payload?.success?action.payload?.message:null;
        })
        .addCase(cancleOrder.rejected, (state, action) => {
          state.isLoading = false;
          state.message = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default changeOrderStatusSlice.reducer;
  