import { createBrowserRouter } from "react-router-dom";
import * as Pages from "../pages";
import { MainLayout } from "../components";
import { pathName } from "../enums";
import { PrivateRoute } from "./PrivateRoute";

export const router = createBrowserRouter([
  { path: pathName.login, element: <Pages.LoginPage /> },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      { path: pathName.home, element: <Pages.HomePage /> },
      { path: pathName.orders, element: <Pages.OrdersPage /> },
      { path: pathName.notifications, element: <Pages.NotificationsPage /> },
      { path: pathName.tracking, element: <Pages.TrackingPage /> },
      { path: pathName.reviews, element: <Pages.WIPPage /> },
      { path: pathName.analytics, element: <Pages.WIPPage /> },
      { path: pathName.blackList, element: <Pages.WIPPage /> },
      { path: pathName.couriers, element: <Pages.CourierPage /> },
      { path: pathName.other, element: <Pages.NotFound /> },
      { path: pathName.cancelOders, element: <Pages.CancelOrdersPage /> },
    ],
  },
]);
