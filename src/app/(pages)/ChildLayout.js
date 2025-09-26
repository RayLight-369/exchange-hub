"use client";

import { Provider } from 'react-redux';
import store from '../store';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "@/app/features/auth";
// import { useRouter } from 'next/navigation';
import { useGetCurrentUserQuery } from '../services/api';


const AuthProvider = ( { children } ) => {

  const dispatch = useDispatch();
  // const router = useRouter();

  // This fires automatically when component mounts
  const { data: user, error } = useGetCurrentUserQuery();

  useEffect( () => {
    if ( user ) {
      dispatch( login( user ) );
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