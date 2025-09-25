import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth";
import { api } from "./services/api";

const store = configureStore( {
  reducer: {
    [ api.reducerPath ]: api.reducer,
    auth: authReducer,
  },
  middleware: ( getDefaultMiddleware ) => {
    return getDefaultMiddleware().concat( api.middleware );
  },
} );

export default store;