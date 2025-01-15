
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  isLoadingUpdate: false,
  messages:null
};


export const updateProduct = createAsyncThunk(
    "update/product",
    async (formData, { rejectWithValue }) => {
      try {
        const response = await axios.put(`/admin/product/update/${formData.id}`, formData, {
            withCredentials:true,
          });
        return response.data;
      } catch (error) {
          rejectWithValue(error);
        return toast.error(error.response.data.message)
      }
    }
  );



  const updateProductSlice = createSlice({
    name: "updateProductSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(updateProduct.pending, (state) => {
          state.isLoadingUpdate = true;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
          state.isLoadingUpdate = false;
          state.messages = action.payload?.success?"Product Updated!":"Product Not Updated";
        })
        .addCase(updateProduct.rejected, (state, action) => {
          state.isLoadingUpdate = false;
          state.messages = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default updateProductSlice.reducer;
  