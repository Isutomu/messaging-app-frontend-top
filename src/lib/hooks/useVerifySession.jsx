// 3rd Party Modules
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Local Modules
import { fetchRequest } from "../fetchRequest";

export const useVerifySession = (setIsLogged) => {
  const navigate = useNavigate();
  const {
    isPending: loading,
    data,
    error,
  } = useQuery({
    queryKey: ["session"],
    queryFn: () =>
      fetchRequest(import.meta.env.VITE_API_URL + "/verify-session"),
  });

  useEffect(() => {
    if (data?.status === "success") {
      setIsLogged(true);
      navigate("/app");
    } else {
      navigate("/login");
    }
  }, [data, error, loading]);

  return { data, error, loading };
};
