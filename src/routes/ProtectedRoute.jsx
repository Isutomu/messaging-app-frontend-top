// 3rd Party Modules
import { useQuery } from "@tanstack/react-query";
import { Outlet, Navigate } from "react-router-dom";

// Local Modules
import { fetchRequest } from "../lib/fetchRequest";

export const ProtectedRoute = () => {
  const { data, error } = useQuery({
    queryKey: ["session"],
    queryFn: () =>
      fetchRequest(import.meta.env.VITE_API_URL + "/verify-session"),
  });

  if (data?.status === "success") {
    return <Outlet />;
  }
  if (data?.status === "error") {
    return <Navigate to={"/login"} />;
  }
  return;
};
