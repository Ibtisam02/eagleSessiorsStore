import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const registerUser = createAsyncThunk(
  "singup/user",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/register", formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "login/user",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/login", formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const loginWithGoogle = createAsyncThunk(
  "login/with/google/user",
  async (code,) => {
    try {
      const response = await axios.get(`/login/google?code=${code}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      
    }
  }
);
export const logoutUser = createAsyncThunk(
  "logout/user",
  async () => {
    try {
      const response = await axios.get("/logout", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
);
export const checkAuth = createAsyncThunk(
  "check/auth",
  async () => {
      const response = await axios.get("/check/auth", {
        headers: {
          "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
        withCredentials: true,
      });
      return response.data;
    
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.success?action.payload?.user:null;
        state.isAuthenticated =action.payload?.success?true:false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.success?action.payload?.user:null;
        state.isAuthenticated =action.payload?.success?true:false;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.success?action.payload?.user:null;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
