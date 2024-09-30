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
import Registration from "./Components/User/Register.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import Login from "./Components/User/Login.jsx";
import QuotationReview from "./quotation/QuotationReview.jsx";
import SignQuotation from "./quotation/SignQuotation.jsx";
import TakeSign from "./quotation/TakeSign.jsx";
import UpdateQuotation from "./quotation/UpdateQuotation.jsx";
import DisplayReviews from "./Components/other/DisplayReviews.jsx";
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
        path: "/reviews",
        element: <DisplayReviews />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/dashboard",
        element: <Admin />,
      },
      {
        path: "/quotation/review/:id",
        element: <QuotationReview />,
      },
      {
        path: "/sign/quotation/:id",
        element: <SignQuotation />,
      },
      {
        path: "/taking/sign-of/:id",
        element: <TakeSign />,
      },
      {
        path: "/edit/quotation/:id",
        element: <UpdateQuotation />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
