import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

const tokenUser = localStorage.getItem("tokenUser");
const userPos = localStorage.getItem("userPos");

if (tokenUser && !userPos) {
  localStorage.removeItem("tokenUser");
  localStorage.removeItem("userId");
  localStorage.removeItem("userPos");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
