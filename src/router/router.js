import { createBrowserRouter } from "react-router-dom";
import * as Pages from "../pages";
import { MainLayout } from "../components";
import { pathName } from "../enums";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: pathName.home, element: <Pages.HomePage /> },
      { path: pathName.orders, element: <Pages.OrdersPage /> },
      { path: pathName.notifications, element: <Pages.WIPPage /> },
      { path: pathName.tracking, element: <Pages.TrackingPage /> },
      { path: pathName.reviews, element: <Pages.WIPPage /> },
      { path: pathName.analytics, element: <Pages.WIPPage /> },
      { path: pathName.blackList, element: <Pages.WIPPage /> },
      { path: pathName.couriers, element: <Pages.CourierPage /> },
      { path: pathName.other, element: <Pages.NotFound /> },
    ],
  },
]);
