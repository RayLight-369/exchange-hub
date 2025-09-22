"use client";

import { Provider } from 'react-redux';
import store from '../store';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetCurrentUserQuery } from "@/app/services/authApi";
import { login, logout } from "@/app/features/auth";


const AuthProvider = ( { children } ) => {

  const dispatch = useDispatch();

  // This fires automatically when component mounts
  const { data: user, error } = useGetCurrentUserQuery();

  useEffect( () => {
    if ( user ) {
      dispatch( login( user ) );
    } else {
      dispatch( logout() );
    }
  }, [ user, error ] );

  return children;
};

const ChildLayout = ( { children } ) => {

  return (
    <Provider store={ store }>
      <AuthProvider>
        { children }
      </AuthProvider>
    </Provider>
  );
};

export default ChildLayout;