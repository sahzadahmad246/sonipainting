import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./Components/pages/Home.jsx";
import Gallery from "./Components/pages/Gallery.jsx";
import Quote from "./Components/pages/Quote.jsx";
import Contact from "./Components/pages/Contact.jsx";
import Nav from "./Components/header/Nav.jsx";
import Services from "./Components/pages/Services.jsx";
import Callback from "./Components/pages/Callback.jsx";
import Admin from "./Components/other/Admin.jsx";
import Login from "./Components/other/Login.jsx";
import Register from "./Components/other/Register.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/quote",
        element: <Quote />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/call-back",
        element: <Callback />,
      },
      {
        path: "/admin/login",
        element: <Login />,
      },
      {
        path: "/admin/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
