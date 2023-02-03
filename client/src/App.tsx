import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home";
import Navigation from "./components/navigation";
import { Provider } from "react-redux";
import store from "./store";

const Layout = () => {
  return (
    <div className="md:w-8/12 mx-auto">
      <Navigation />
      <Outlet></Outlet>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    // errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "/profile/:id",
      //   element: <Profile />,
      // },
      // {
      //   path: "/explore",
      //   element: <Explore />,
      // },
      // {
      //   path: "/signin",
      //   element: <Signin />,
      // },
      // {
      //   path: "/signout",
      //   element: <Signin />,
      // },
    ],
  },
]);

function App() {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </div>
  );
}

export default App;
