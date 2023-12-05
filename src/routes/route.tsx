import React from "react";
import { createBrowserRouter } from 'react-router-dom';
import TaskBoard from "../Page/taskBoard/task-board.tsx";
import Login from "../Page/login/login.tsx";
import Register from "../Page/Register/Register.tsx";
import ResetPassword from "../Page/ResetPassword/ResetPassword.tsx";
import PrivateRoutes from "./PrivateRoutes.tsx";

export const router = createBrowserRouter([
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Register />,
    path: "/register",
  },
  {
    element: <ResetPassword />,
    path: "/reset-password",
  },
  {
    element: <PrivateRoutes />,
    path: "/",
    children: [
      {
        path: '/board',
        element: <TaskBoard />,
      }
    ]
  },
]);