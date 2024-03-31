import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Contact, ContactInfo } from "../types/types";

// https://65f4c46ef54db27bc0224e8d.mockapi.io/phoneBook/contacts
axios.defaults.baseURL =
  "https://65f4c46ef54db27bc0224e8d.mockapi.io/phoneBook/";

export const getContacts = createAsyncThunk<
  Contact[],
  void,
  { rejectValue: string }
>("allContacts", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("contacts");
    return data;
  } catch (error) {
    let errorMessage = "Something that from";
    if (axios.isAxiosError(error)) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});

export const addContact = createAsyncThunk<
  Contact,
  ContactInfo,
  { rejectValue: string }
>("addContact", async (contact, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("contacts", contact);
    return data;
  } catch (error) {
    let errorMessage = "Something that from";
    if (axios.isAxiosError(error)) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});
export const deleteContact = createAsyncThunk<
  Contact,
  string,
  { rejectValue: string }
>("deleteContact", async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`contacts/${id}`);
    return data;
  } catch (error) {
    let errorMessage = "Something that from";
    if (axios.isAxiosError(error)) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});
