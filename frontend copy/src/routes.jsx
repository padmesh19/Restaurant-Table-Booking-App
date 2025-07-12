import React from "react";
import { createBrowserRouter, Navigate } from "react-router";

import Admin from "./pages/Admin";
import Hotel from "./pages/Hotel";

import {
  HotelMenuList,
  OffersList,
  ViewHotelTables,
  BookingCalender,
  BookedTables,
  HotelUserComments,
} from "./pages/Hotel/pages";

import {
  HotelList,
  ViewHotel,
  CommentsList,
  MenuAndOfferHotel,
  BookingTable,
  HistoryList,
} from "./pages/Admin/pages-new";

import { LoginRoute, PrivateRoute } from "./PrivateRoute"; // Assuming this is your wrapper for auth routes
import ForgotPasswordOld from "./pages/ForgotPasswordOld";
import ResetPassword from "./pages/PasswordReset";
import RegisterSuccess from "./pages/RegisterSuccess";
import ActivateUser from "./pages/ActivateUser";
import { ForgotPassword, Login, Register } from "./pages/Auth/pages";
import Root from "./App";
import HotelListView from "./pages/Admin/pages-new/HotelListView";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: "/customer",
        element: <PrivateRoute element={<Admin />} allowCustomer={true} />,
        children: [
          {
            path: "",
            element: <HotelListView />,
            children: [
              { index: true, element: <HotelList /> },
              { path: ":hotelId/view", element: <ViewHotel /> },
              { path: ":hotelId/view-comments", element: <CommentsList /> },
              { path: ":hotelId/menu-offer", element: <MenuAndOfferHotel /> },
              { path: ":hotelId/book-table", element: <BookingTable /> },
            ],
          },
          { path: "history", element: <HistoryList /> },
        ],
      },
      {
        path: "/admin",
        element: <PrivateRoute element={<Hotel />} allowHotel={true} />,
        children: [
          { index: true, element: <HotelMenuList /> },
          { path: "offers", element: <OffersList /> },
          { path: "tables", element: <ViewHotelTables /> },
          { path: "reservations/calender", element: <BookingCalender /> },
          { path: "reservations", element: <BookedTables /> },
          { path: "comments", element: <HotelUserComments /> },
        ],
      },
      {
        path: "/verify/:id",
        element: <LoginRoute element={<ActivateUser />} />,
      },
      {
        path: "/password-reset/:id",
        element: <LoginRoute element={<ResetPassword />} />,
      },
      {
        path: "/forgot-password",
        element: <LoginRoute element={<ForgotPassword />} />,
      },
      {
        path: "/login",
        element: <LoginRoute element={<Login />} />,
      },
      {
        path: "/reset-password-confirmation",
        element: <LoginRoute element={<ForgotPasswordOld />} />,
      },
      {
        path: "/register",
        element: <LoginRoute element={<Register />} />,
      },
      {
        path: "/register-success",
        element: <LoginRoute element={<RegisterSuccess />} />,
      },
    ],
  },
]);

export default router;
