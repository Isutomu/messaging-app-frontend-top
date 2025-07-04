// 3rd Party Modules
import { createBrowserRouter } from "react-router-dom";

// Local Modules
import { Login } from "../pages/Login";
import { App } from "./App";
import { PageNotFound } from "../pages/PageNotFound";
import { Homepage } from "../pages/Homepage";
import { Signup } from "../pages/Signup";

export const routes = new createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/home", element: <Homepage /> },
    ],
  },
]);
