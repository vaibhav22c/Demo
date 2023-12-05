import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useUserContext } from '../context/provider.tsx';

const PrivateRoutes = () => {
  const { data } = useUserContext();

  // private router check is user login or not
  // if not login then redirect to login
  return (
    data && data.id ? <Outlet /> : <Navigate to="/login" />
  )
}

export default PrivateRoutes