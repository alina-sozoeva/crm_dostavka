import { createBrowserRouter, Outlet } from "react-router-dom";
import * as Pages from "../pages";
import { Header, MainLayout } from "../components";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [{ path: "/", element: <Pages.HomePage /> }],
  },
]);
