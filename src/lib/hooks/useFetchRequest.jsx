// 3rd Party Modules
import { useEffect, useState } from "react";

/**
 * Request data from an API.
 *
 * Returns three variables indicating the stage of the fetching process bundled in an object.
 * In case the request is successful sets 'data' with the returned json.
 *
 * @param {String} apiUrl The endpoint to which to request the data.
 *
 * @return {Object} An object with the properties 'data', 'error' and 'loading'. The last two
 * are binaries indicating a status, while 'data' also returns the data requested if it is successful.
 */
export const useFetchRequest = (apiUrl, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = {
      method: "GET",
      ...options,
      body: JSON.stringify(options?.body),
      mode: "cors",
      credentials: "include",
    };

    fetch(apiUrl, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setData(data);
        } else {
          setError(data.message);
        }
      })
      .finally(() => setLoading(false));

    return () => {
      setData(null);
      setError(null);
      setLoading(true);
    };
  }, [apiUrl]);

  return { data, error, loading };
};
