import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // Make sure axios is imported

// 🔸 Initial state for auth
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

// 🔹 Async thunk to register a user
export const registerUser = createAsyncThunk(
  "auth/register", // action type
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        { withCredentials: true }
      );
      return response.data; // becomes the payload
    } catch (error) {
      return rejectWithValue(error.response.data); // handle error properly
    }
  }
);

// 🔸 Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

// 🔸 Export actions and reducer
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
