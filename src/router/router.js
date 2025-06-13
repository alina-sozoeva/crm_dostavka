import { createBrowserRouter, Outlet } from "react-router-dom";
import * as Pages from "../pages";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{ path: "/", element: <Pages.HomePage /> }],
  },
]);
