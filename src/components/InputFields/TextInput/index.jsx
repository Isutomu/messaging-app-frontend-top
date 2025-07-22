// 3rd Party Modules
import PropTypes from "prop-types";
import { motion } from "motion/react";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

// Local Modules
import styles from "./index.module.css";

// Exportable component
export const TextInput = ({
  label = "",
  placeholder = "",
  value,
  setValue,
  minLength = 0,
  maxLength = 999,
  regex = new RegExp(/^.*$/),
  regexError = "",
  error,
  setError,
  size = "50vw",
  equals = undefined,
  showError = true,
  withOcclusion = false,
}) => {
  const [show, setShow] = useState(!withOcclusion);
  const handleClick = () => {
    setShow((prev) => !prev);
  };

  // Input Validation
  const validateValue = (inputValue) => {
    if (!inputValue) {
      setError("required");
    } else if (inputValue.length < minLength) {
      setError(`Minimum ${minLength} characters`);
    } else if (inputValue.length > maxLength) {
      setError(`Maximum ${maxLength} characters`);
    } else if (!new RegExp(regex).test(inputValue)) {
      setError(regexError);
    } else if (equals && equals !== inputValue) {
      setError("Values don't match");
    } else {
      setError(null);
    }
  };

  return (
    <div className={styles.div} style={{ width: size }}>
      <label className={styles.label} htmlFor={styles.textInput}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          className={`${styles.input} ${withOcclusion ? styles.inputWithOclusion : ""}`}
          type={show ? "text" : "password"}
          id={styles.textInput}
          name={styles.textInput}
          value={value}
          onChange={(e) => {
            validateValue(e.target.value);
            setValue(e.target.value);
          }}
          placeholder={placeholder}
        />
        {withOcclusion && (
          <button className={styles.eye} onClick={handleClick} type="button">
            {show ? (
              <BiSolidShow size="1.3rem" />
            ) : (
              <BiSolidHide size="1.3rem" />
            )}
          </button>
        )}
      </div>
      <AnimatePresence>
        {showError && error && (
          <motion.span
            key={styles.error}
            className={styles.error}
            initial={{ opacity: 0.2, height: 0 }}
            animate={{ opacity: 1, height: "fit-content" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
          >
            {error}
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
  regex: PropTypes.instanceOf(RegExp),
  regexError: PropTypes.string,
  error: PropTypes.array.isRequired,
  setError: PropTypes.func.isRequired,
  size: PropTypes.string,
  equals: PropTypes.string,
  withOcclusion: PropTypes.bool,
};
