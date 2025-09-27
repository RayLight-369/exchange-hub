import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_LINKS } from "../constants";
import { logout } from "../features/auth";

export const api = createApi( {
  reducerPath: "api",
  baseQuery: fetchBaseQuery( {
    baseUrl: API_LINKS.BASE, // 👈 set your common base (or use a function for dynamic)
    credentials: "include",
  } ),
  tagTypes: [ "User", "Book" ],
  endpoints: ( builder ) => ( {
    // -------- AUTH --------
    getCurrentUser: builder.query( {
      query: () => `${ API_LINKS.AUTH }/me`,
      providesTags: [ { type: "User", id: "ME" } ],
    } ),

    signinUser: builder.mutation( {
      query: ( credentials ) => ( {
        url: `${ API_LINKS.AUTH }/signin`,
        method: "POST",
        body: credentials,
      } ),
      invalidatesTags: [ { type: "User", id: "ME" } ],
    } ),

    signupUser: builder.mutation( {
      query: ( credentials ) => ( {
        url: `${ API_LINKS.AUTH }/signup`,
        method: "POST",
        body: credentials,
      } ),
      invalidatesTags: [ { type: "User", id: "ME" } ],
    } ),

    signoutUser: builder.mutation( {
      query: () => ( {
        url: `${ API_LINKS.AUTH }/signout`,
        method: "POST",
      } ),
      invalidatesTags: [ { type: "User", id: "ME" } ],
      async onQueryStarted( arg, { dispatch, queryFulfilled } ) {
        try {
          await queryFulfilled;
          // ✅ Clear Redux state on success
          dispatch( logout() );
        } catch {
          // optional: handle error
        }
      },
    } ),

    // -------- BOOKS --------
    fetchBooks: builder.query( {
      query: () => `${ API_LINKS.BOOKS }/`,
      providesTags: ( result ) =>
        result
          ? [
            { type: "Book", id: "LIST" },
            ...result.map( ( book ) => ( { type: "Book", id: book.id } ) ),
          ]
          : [ { type: "Book", id: "LIST" } ],
    } ),

    fetchBook: builder.query( {
      query: ( id ) => `${ API_LINKS.BOOKS }/${ id }`,
      providesTags: ( _, __, id ) => [ { type: "Book", id } ],
    } ),

    addBook: builder.mutation( {
      query: ( newBook ) => ( {
        url: `${ API_LINKS.BOOKS }/`,
        method: "POST",
        body: newBook,
      } ),
      invalidatesTags: [
        { type: "Book", id: "LIST" },
        { type: "User", id: "ME" },
      ],
    } ),

    updateBook: builder.mutation( {
      query: ( { id, data } ) => ( {
        url: `${ API_LINKS.BOOKS }/${ id }`,
        method: "PUT",
        body: data,
      } ),
      invalidatesTags: ( _, __, { id } ) => [
        { type: "Book", id },
        { type: "User", id: "ME" },
      ],
    } ),

    deleteBook: builder.mutation( {
      query: ( id ) => ( {
        url: `${ API_LINKS.BOOKS }/${ id }`,
        method: "DELETE",
      } ),
      invalidatesTags: ( _, __, id ) => [
        { type: "Book", id },
        { type: "Book", id: "LIST" },
        { type: "User", id: "ME" },
      ],
    } ),
  } ),
} );

export const {
  // Auth
  useGetCurrentUserQuery,
  useSigninUserMutation,
  useSignupUserMutation,
  useSignoutUserMutation,
  // Books
  useFetchBooksQuery,
  useFetchBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = api;
