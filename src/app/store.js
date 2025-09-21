import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import authReducer from "./features/auth";

const store = configureStore( {
  reducer: {
    [ authApi.reducerPath ]: authApi.reducer,
    auth: authReducer,
  },
  middleware: ( getDefaultMiddleware ) => {
    return getDefaultMiddleware().concat( authApi.middleware );
  },
} );

export default store;