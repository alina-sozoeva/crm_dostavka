import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ToastContainer } from "react-toastify";
import { useGetOrdersQuery } from "./store";
import "./App.css";

function GlobalPolling() {
  const { data } = useGetOrdersQuery(
    {},
    {
      pollingInterval: 15000,
    }
  );

  return null;
}

function App() {
  return (
    <>
      <GlobalPolling />
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
