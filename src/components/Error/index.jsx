// 3rd Party Modules
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import PropTypes from "prop-types";
import { FiAlertOctagon } from "react-icons/fi";

// Local Modules
import styles from "./index.module.css";

export const Error = ({ error }) => {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          key={styles.error}
          className={styles.error}
          exit={{ top: 0, transform: "translateX(-50%) translateY(-160%)" }}
          transition={{ duration: 0.25 }}
        >
          <FiAlertOctagon size="1.3rem" />
          <span>{error}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Error.propTypes = {
  error: PropTypes.string,
};
