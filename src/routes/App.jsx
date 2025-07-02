// 3rd Party Modules
import { AnimatePresence } from "motion/react";
import React, { createContext, useEffect, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { FiAlertOctagon } from "react-icons/fi";
import { motion } from "motion/react";
import loadingIcon from "../assets/loading.gif";

// Local Modules
import styles from "./App.module.css";

// Exportable Constants
export const FetchingStatusContext = createContext(null);

// Exportable Component
export const App = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <>
      <AnimatePresence mode="wait">
        {error ? (
          <motion.div
            key={styles.error}
            className={styles.error}
            exit={{ top: 0, transform: "translateX(-50%) translateY(-160%)" }}
            transition={{ duration: 0.8 }}
          >
            <FiAlertOctagon size="1.3rem" />
            <span>{error}</span>
          </motion.div>
        ) : (
          loading && (
            <motion.div
              key={styles.loadingContainer}
              className={styles.loadingContainer}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <motion.div
                className={styles.loading}
                exit={{
                  top: 0,
                  transform: "translateX(-50%) translateY(-160%)",
                }}
                transition={{ duration: 0.8 }}
              >
                <img className={styles.loadingIcon} src={loadingIcon} alt="" />
                <span>Loading</span>
              </motion.div>
            </motion.div>
          )
        )}
      </AnimatePresence>
      <FetchingStatusContext.Provider
        value={{
          error,
          setError: (value) => {
            setError(value);
            setTimeout(() => setError(null), "4000");
          },
          loading,
          setLoading,
        }}
      >
        <AnimatePresence mode="wait">
          {outlet && React.cloneElement(outlet, { key: location.pathname })}
        </AnimatePresence>
      </FetchingStatusContext.Provider>
    </>
  );
};
