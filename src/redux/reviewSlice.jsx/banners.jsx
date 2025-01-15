import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  isLoading: false,
  message:null
};


export const addBannerAdmin = createAsyncThunk(
    "add/admin/banner",
    async (data) => {
      try {
        const response = await axios.post("/add/a/banner",data,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
              withCredentials:true,
        });
        return response.data;
      } catch (error) {
        console.log(error);
        return toast.error(error.response.data.message)
      }
    }
  );
export const deleteBannerAdmin = createAsyncThunk(
    "delete/admin/banner",
    async (id) => {
      try {
        const response = await axios.delete(`/delete/a/banner/${id}`,{
              withCredentials:true,
        });
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
      }
    }
  );




  const bannerSlice = createSlice({
    name: "bannerSlice",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(addBannerAdmin.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(addBannerAdmin.fulfilled, (state, action) => {
          state.isLoading = false;
          state.message = action.payload?.success?action.payload?.message:null;
        })
        .addCase(addBannerAdmin.rejected, (state, action) => {
          state.isLoading = false;
          state.message = null;
        })
        .addCase(deleteBannerAdmin.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteBannerAdmin.fulfilled, (state, action) => {
          state.isLoading = false;
          state.message = action.payload?.success?action.payload?.message:null;
        })
        .addCase(deleteBannerAdmin.rejected, (state, action) => {
          state.isLoading = false;
          state.message = null;
        })
    },
  });
  
  //export const { setUser } = authSlice.actions;
  export default bannerSlice.reducer;
  