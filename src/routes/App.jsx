// 3rd Party Modules
import { AnimatePresence } from "motion/react";
import React, { createContext, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { FiAlertOctagon } from "react-icons/fi";
import { motion } from "motion/react";

// Local Modules
import styles from "./App.module.css";

// Exportable Constants
export const ErrorContext = createContext(null);

// Exportable Component
export const App = () => {
  const [error, setError] = useState(null);
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <>
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            className={styles.error}
            exit={{ top: 0, transform: "translateX(-50%) translateY(-160%)" }}
            transition={{ duration: 0.8 }}
          >
            <FiAlertOctagon size="1.3rem" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
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
          {outlet && React.cloneElement(outlet, { key: location.pathname })}
        </AnimatePresence>
      </ErrorContext.Provider>
    </>
  );
};
