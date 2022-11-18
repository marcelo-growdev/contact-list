import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "../config/layout/Default";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout page={<Home />} />,
  },
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
