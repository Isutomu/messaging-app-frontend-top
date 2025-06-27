// 3rd Party Modules
import { motion } from "motion/react";

// Local Modules
import PropTypes from "prop-types";
import styles from "./index.module.css";
import { AnimatePresence } from "motion/react";

// Exportable component
export const TextInput = ({
  label = "",
  placeholder = "",
  value,
  setValue,
  minLength = 0,
  maxLength = 99,
  errors = [],
  size = "50vw",
}) => {
  return (
    <div className={styles.div} style={{ width: size }}>
      <label className={styles.label} htmlFor={styles.textInput}>
        {label}
      </label>
      <input
        className={styles.input}
        type="text"
        id={styles.textInput}
        name={styles.textInput}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
      />
      <AnimatePresence>
        {!!errors.length && (
          <motion.span
            key={styles.error}
            className={styles.error}
            initial={{ opacity: 0.2, height: 0 }}
            animate={{ opacity: 1, height: "fit-content" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
          >
            {errors[0]}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  errors: PropTypes.array,
  size: PropTypes.string,
};
