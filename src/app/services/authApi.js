import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_LINKS } from "../constants";

export const authApi = createApi( {
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery( { baseUrl: API_LINKS.AUTH } ),
  tagTypes: [ "User" ],
  endpoints: ( builder ) => ( {
    signinUser: builder.mutation( {
      query: ( credentials ) => ( {
        url: "/signin",
        method: "POST",
        body: credentials,
      } ),

    } ),
    signupUser: builder.mutation( {
      query: ( credentials ) => ( {
        url: "/signup",
        method: "POST",
        body: credentials,
      } ),
    } ),
  } ),
} );

export const { useSigninUserMutation, useSignupUserMutation } = authApi;
