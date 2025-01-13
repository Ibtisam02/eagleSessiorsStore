import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  messages:null
};


export const createProduct = createAsyncThunk(
    "create/product",
    async (formData, { rejectWithValue }) => {
      try {
        const response = await axios.post("/admin/product/new", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials:true,
          });
        return response.data;
      } catch (error) {
        rejectWithValue(error);
      }
    }
  );



  const createProductSlice = createSlice({
    name: "createProductSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(createProduct.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
          state.isLoading = false;
          state.messages = action.payload?.success?"Product Created!":"Product Not Created";
        })
        .addCase(createProduct.rejected, (state, action) => {
          state.isLoading = false;
          state.messages = false;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default createProductSlice.reducer;
  