import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_LINKS } from "../constants";

export const authApi = createApi( {
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery( { baseUrl: API_LINKS.AUTH, credentials: "include" } ),
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
    getCurrentUser: builder.query( {
      query: () => "/me", // backend checks cookie + returns user
    } ),
    signoutUser: builder.mutation( {
      query: () => ( {
        url: "/signout",
        method: "POST",
      } ),
    } ),
  } ),
} );

export const {
  useSigninUserMutation,
  useSignupUserMutation,
  useGetCurrentUserQuery,
  useSignoutUserMutation,
} = authApi;
