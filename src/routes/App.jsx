// 3rd Party Modules
import { AnimatePresence } from "motion/react";
import React, { createContext, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";

// Local Modules
import { useVerifySession } from "../lib/hooks/useVerifySession";
import { Error } from "../components/Error";

// Exportable Constants
export const ErrorContext = createContext(null);
export const UserContext = createContext(null);

// Exportable Component
export const App = () => {
  const [error, setError] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const location = useLocation();
  const outlet = useOutlet();
  const sessionResponse = useVerifySession(setIsLogged);

  const simplifiedLocation = location.pathname.split("/")[1];

  return (
    <>
      <Error error={error} />
      <ErrorContext.Provider
        value={{
          error,
          setError: (value) => {
            setError(value);
            setTimeout(() => setError(null), "4000");
          },
        }}
      >
        <UserContext.Provider value={{ isLogged, setIsLogged }}>
          <AnimatePresence mode="wait">
            {outlet && React.cloneElement(outlet, { key: simplifiedLocation })}
          </AnimatePresence>
        </UserContext.Provider>
      </ErrorContext.Provider>
    </>
  );
};
