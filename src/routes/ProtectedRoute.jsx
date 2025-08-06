// 3rd Party Modules
import { useQuery } from "@tanstack/react-query";
import { Outlet, Navigate } from "react-router-dom";
import { createContext } from "react";

// Local Modules
import { fetchRequest } from "../lib/fetchRequest";

// Exportable Constants
export const UserContext = createContext(null);

export const ProtectedRoute = () => {
  const { data, error } = useQuery({
    queryKey: ["session"],
    queryFn: () =>
      fetchRequest(import.meta.env.VITE_API_URL + "/verify-session"),
  });

  if (data?.status === "success") {
    return (
      <UserContext.Provider
        value={{
          username: data.data.username,
        }}
      >
        <Outlet />
      </UserContext.Provider>
    );
  }
  if (data?.status === "error") {
    return <Navigate to={"/login"} />;
  }
  return;
};
