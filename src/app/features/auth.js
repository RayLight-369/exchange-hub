import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";

const authSlice = createSlice( {
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    login: ( state, action ) => {
      state.user = action.payload;
    },
    logout: ( state ) => {
      state.user = null;
      authApi.util.resetApiState();
    },
  },
} );

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;