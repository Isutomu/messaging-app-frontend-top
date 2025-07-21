// 3rd Party Modules
import { AnimatePresence } from "motion/react";
import React, { createContext, useState } from "react";
import { Navigate, useLocation, useOutlet } from "react-router-dom";

// Local Modules
import { Error } from "../components/Error";

// Exportable Constants
export const ErrorContext = createContext(null);

// Exportable Component
export const App = () => {
  const [error, setError] = useState(null);
  const location = useLocation();
  const outlet = useOutlet();

  const simplifiedLocation = location.pathname.split("/")[1];
  if (simplifiedLocation === "") {
    return <Navigate to="/app" />;
  }

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
        <AnimatePresence mode="wait">
          {outlet && React.cloneElement(outlet, { key: simplifiedLocation })}
        </AnimatePresence>
      </ErrorContext.Provider>
    </>
  );
};
