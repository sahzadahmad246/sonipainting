import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Nav from "./Components/header/Nav";
import Home from "./Components/pages/Home";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Provider } from "react-redux";
// import store from './store/store'
function App() {
  return (
    <>
      {/* <Provider store={store} > */}
        <Nav />
        <ToastContainer />
        <Outlet />
      {/* </Provider> */}
    </>
  );
}

export default App;
