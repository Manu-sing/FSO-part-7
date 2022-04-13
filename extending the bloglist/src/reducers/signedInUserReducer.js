import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = {};

const signedInUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const { createUser } = signedInUserSlice.actions;

export const initializeUser = (user) => {};

export default signedInUserSlice.reducer;
