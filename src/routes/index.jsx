// 3rd Party Modules
import { createBrowserRouter } from "react-router-dom";

// Local Modules
import { Login } from "../pages/Login";
import { App } from "./App";
import { PageNotFound } from "../pages/PageNotFound";
import { Homepage } from "../pages/Homepage";
import { Signup } from "../pages/Signup";
import { SendPasswordResetLink } from "../pages/SendPasswordResetLink";
import { ResetPassword } from "../pages/ResetPassword";
import { Chat } from "../pages/Chat";
import { Settings } from "../pages/Settings";
import { Search } from "../pages/Search";

export const routes = new createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/send-reset-password-link", element: <SendPasswordResetLink /> },
      { path: "/reset-password", element: <ResetPassword /> },
      {
        path: "/app",
        element: <Homepage />,
        children: [
          { path: "/app/chat/:username", element: <Chat /> },
          { path: "/app/settings", element: <Settings /> },
          { path: "/app/search", element: <Search /> },
        ],
      },
    ],
  },
]);
