import { Action, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ContactsState } from "../types/types";
import { addContact, deleteContact, getContacts } from "./thunk";

const initialState: ContactsState = {
  contacts: [],
  isLoading: false,
  isError: null,
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.unshift(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (el) => el.id !== action.payload.id
        );
      })
      .addMatcher(isLoading, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addMatcher(isFulfilled, (state) => {
        state.isLoading = false;
        state.isError = null;
      });
  },
});
export const contactReducer = contactSlice.reducer;
function isLoading(action: Action) {
  return action.type.endsWith("pending");
}
function isError(action: Action) {
  return action.type.endsWith("rejected");
}
function isFulfilled(action: Action) {
  return action.type.endsWith("fulfilled");
}
