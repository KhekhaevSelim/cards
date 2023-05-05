import React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import App from "../app/App";
import Login from "../features/auth/login/Login";
import Register from "../features/auth/register/Register";
import SetNewPassword from "../features/auth/forgotPassword/setNewPassword/SetNewPassword";
import Profile from "features/auth/profile/Profile";
import Cards from "features/cards/Cards";
import Learn from "../features/packs/Learn";
import ForgotPassword from "../features/auth/forgotPassword/ForgotPassword";
import CheckEmail from "features/auth/forgotPassword/checkEmail/CheckEmail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "checkEmail",
        element: <CheckEmail />
      },
      {
        path: "setNewPassword/:token",
        element: <SetNewPassword />
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "cards",
        element: <Cards />
      },
      {
        path: "learn",
        element: <Learn />
      }
    ]
  }
])
