import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews:null
};


export const getAllReviewsAdmin = createAsyncThunk(
    "get/all/reviews/admin",
    async () => {
      try {
        const response = await axios.get("/get/all/reviews/admin",{
            withCredentials:true
        });
        return response.data;
      } catch (error) {
        console.log(error);
        
      }
    }
  );




  const getAllAdminReviewsSlice = createSlice({
    name: "getAllAdminReviewsSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllReviewsAdmin.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllReviewsAdmin.fulfilled, (state, action) => {
          state.isLoading = false;
          state.reviews = action.payload?.success?action.payload?.reviews:null;
        })
        .addCase(getAllReviewsAdmin.rejected, (state, action) => {
          state.isLoading = false;
          state.reviews = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default getAllAdminReviewsSlice.reducer;
  