import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  sku:null
};


export const getSingleSku = createAsyncThunk(
    "get/single/sku",
    async (id) => {
      try {
        console.log(id);
        
        const response = await axios.get(`/sku?${id}`);
        return response.data;
      } catch (error) {
        console.log(error);
        
      }
    }
  );



  const getSingleSkuSlice = createSlice({
    name: "getAllProductsSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(getSingleSku.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getSingleSku.fulfilled, (state, action) => {
          state.isLoading = false;
          state.sku = action.payload?.success?action.payload?.sku:null;
        })
        .addCase(getSingleSku.rejected, (state, action) => {
          state.isLoading = false;
          state.sku = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default getSingleSkuSlice.reducer;
  