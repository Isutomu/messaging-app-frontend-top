// 3rd Party Modules
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Local Modules
import { useFetchRequest } from "./useFetchRequest";

export const useVerifySession = (setIsUserLogged) => {
  const navigate = useNavigate();
  const { data, error, loading } = useFetchRequest(
    import.meta.env.VITE_API_URL + "/verify-session",
  );

  useEffect(() => {
    if (data) {
      setIsUserLogged(true);
      navigate("/app");
    }
  }, [data, error, loading]);

  return { data, error, loading };
};
