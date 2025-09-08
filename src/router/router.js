import { createBrowserRouter } from "react-router-dom";
import * as Pages from "../pages";
import { MainLayout } from "../components";
import { pathName } from "../enums";
import { PrivateRoute } from "./PrivateRoute";

const withPrivateRoute = (element, allowedRoles) => (
  <PrivateRoute allowedRoles={allowedRoles}>{element}</PrivateRoute>
);

export const router = createBrowserRouter([
  { path: pathName.login, element: <Pages.LoginPage /> },
  {
    element: withPrivateRoute(<MainLayout />, ["1", "9"]),
    children: [
      {
        path: pathName.home,
        element: withPrivateRoute(<Pages.HomePage />, ["1", "9"]),
      },
      {
        path: pathName.orders,
        element: withPrivateRoute(<Pages.OrdersPage />, ["1"]),
      },
      {
        path: pathName.notifications,
        element: withPrivateRoute(<Pages.NotificationsPage />, ["1"]),
      },
      {
        path: pathName.tracking,
        element: withPrivateRoute(<Pages.TrackingPage />, ["1"]),
      },
      {
        path: pathName.reviews,
        element: withPrivateRoute(<Pages.WIPPage />, ["1"]),
      },
      {
        path: pathName.analytics,
        element: withPrivateRoute(<Pages.WIPPage />, ["1"]),
      },
      {
        path: pathName.blackList,
        element: withPrivateRoute(<Pages.WIPPage />, ["1"]),
      },
      {
        path: pathName.couriers,
        element: withPrivateRoute(<Pages.CourierPage />, ["1"]),
      },
      {
        path: pathName.cancelOders,
        element: withPrivateRoute(<Pages.CancelOrdersPage />, ["1"]),
      },
      {
        path: pathName.clients,
        element: withPrivateRoute(<Pages.ClientsPage />, ["1"]),
      },

      {
        path: pathName.applications,
        element: withPrivateRoute(<Pages.ApplicationsPage />, ["1", "9"]),
      },

      {
        path: pathName.other,
        element: withPrivateRoute(<Pages.NotFound />, ["1", "9"]),
      },
    ],
  },
]);
