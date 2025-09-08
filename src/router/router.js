import { createBrowserRouter } from "react-router-dom";
import * as Pages from "../pages";
import { MainLayout } from "../components";
import { pathName } from "../enums";
import { PrivateRoute } from "./PrivateRoute";

const withPrivateRoute = (element) => <PrivateRoute>{element}</PrivateRoute>;

export const router = createBrowserRouter([
  { path: pathName.login, element: <Pages.LoginPage /> },
  {
    element: withPrivateRoute(<MainLayout />),
    children: [
      { path: pathName.home, element: withPrivateRoute(<Pages.HomePage />) },
      {
        path: pathName.orders,
        element: withPrivateRoute(<Pages.OrdersPage />),
      },
      {
        path: pathName.notifications,
        element: withPrivateRoute(<Pages.NotificationsPage />),
      },
      {
        path: pathName.tracking,
        element: withPrivateRoute(<Pages.TrackingPage />),
      },
      { path: pathName.reviews, element: withPrivateRoute(<Pages.WIPPage />) },
      {
        path: pathName.analytics,
        element: withPrivateRoute(<Pages.WIPPage />),
      },
      {
        path: pathName.blackList,
        element: withPrivateRoute(<Pages.WIPPage />),
      },
      {
        path: pathName.couriers,
        element: withPrivateRoute(<Pages.CourierPage />),
      },
      {
        path: pathName.cancelOders,
        element: withPrivateRoute(<Pages.CancelOrdersPage />),
      },
      {
        path: pathName.clients,
        element: withPrivateRoute(<Pages.ClientsPage />),
      },
      { path: pathName.other, element: withPrivateRoute(<Pages.NotFound />) },
      {
        path: pathName.applications,
        element: withPrivateRoute(<Pages.ApplicationsPage />),
      },
    ],
  },
]);
