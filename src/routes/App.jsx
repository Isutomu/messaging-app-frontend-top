// 3rd Party Modules
import { AnimatePresence } from "motion/react";
import React, { createContext, useState } from "react";
import { useLocation, useNavigate, useOutlet } from "react-router-dom";
import { FiAlertOctagon } from "react-icons/fi";
import { motion } from "motion/react";
import loadingIcon from "../assets/loading.gif";

// Local Modules
import styles from "./App.module.css";
import { useVerifySession } from "../lib/hooks/useVerifySession";

// Exportable Constants
export const NotificationContext = createContext(null);
export const UserStatusContext = createContext(null);

// Exportable Component
export const App = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const location = useLocation();
  const outlet = useOutlet();
  const sessionResponse = useVerifySession(setIsUserLogged);

  return (
    <>
      <AnimatePresence mode="wait">
        {error ? (
          <motion.div
            key={styles.error}
            className={styles.error}
            exit={{ top: 0, transform: "translateX(-50%) translateY(-160%)" }}
            transition={{ duration: 0.25 }}
          >
            <FiAlertOctagon size="1.3rem" />
            <span>{error}</span>
          </motion.div>
        ) : (
          (loading || sessionResponse.loading) && (
            <motion.div
              key={styles.loadingContainer}
              className={styles.loadingContainer}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className={styles.loading}>
                <img className={styles.loadingIcon} src={loadingIcon} alt="" />
                <span>Loading</span>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
      <NotificationContext.Provider
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
        <UserStatusContext.Provider value={{ isUserLogged, setIsUserLogged }}>
          <AnimatePresence mode="wait">
            {outlet && React.cloneElement(outlet, { key: location.pathname })}
          </AnimatePresence>
        </UserStatusContext.Provider>
      </NotificationContext.Provider>
    </>
  );
};
