import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../auth/operations";
import { toast } from "react-toastify";
import { toastConfig } from "../auth/operations";

axios.defaults.baseURL = "https://connections-api.goit.global";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      toast.error(`Error: ${error.message}`, toastConfig);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contactData, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", contactData);
      toast.success("Contact add successfully!", toastConfig);
      return response.data;
    } catch (error) {
      toast.error(`Error: ${error.message}`, toastConfig);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      toast.success(`${contactId} deleted!`, toastConfig);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ contactId, contactData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      setAuthHeader(`Bearer ${token}`);

      const response = await axios.patch(
        `/contacts/${contactId}`,
        contactData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`${contactData.name} updated successfully!`, toastConfig);
      return response.data;
    } catch (error) {
      toast.error(`Error: ${error.message}`, toastConfig);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
