// 3rd Party Modules
import { createBrowserRouter } from "react-router-dom";

// Local Modules
import { Login } from "../pages/Login";
import App from "../App";
import { PageNotFound } from "../pages/PageNotFound";

export const routes = new createBrowserRouter([
  { path: "/", element: <App />, errorElement: <PageNotFound /> },
  {
    path: "/login",
    element: <Login />,
  },
]);
