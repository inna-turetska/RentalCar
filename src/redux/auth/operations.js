import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const setAuthHeader = (value) => {
  axios.defaults.headers.common.Authorization = value;
};

export const toastConfig = {
  position: "top-right",
  autoClose: 3000,
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", credentials);
      setAuthHeader(`Bearer ${response.data.token}`);
      toast.success("Registration successful!", toastConfig);
      return response.data;
    } catch (error) {
      toast.error("Registration failed!", toastConfig);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", credentials);
      setAuthHeader(`Bearer ${response.data.token}`);
      toast.success("Login successful!", toastConfig);
      return response.data;
    } catch (error) {
      toast.error("Login failed!", toastConfig);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    setAuthHeader("");
    toast.success("Logout successful!", toastConfig);
  } catch (error) {
    toast.error("Logout failed!", toastConfig);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const currentUser = createAsyncThunk(
  "auth/current",
  async (_, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      setAuthHeader(`Bearer ${reduxState.auth.token}`);
      const response = await axios.get("/users/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.token !== null;
    },
  }
);
