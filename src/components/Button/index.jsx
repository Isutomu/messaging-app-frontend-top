// 3rd Party Modules
import PropTypes from "prop-types";

// Local Modules
import styles from "./index.module.css";

// Exportable Component
export const Button = ({ onClick, name, children, type }) => {
  if (!name && !children) {
    return new Error("One of props 'name' or 'children' has to be specified!");
  }

  return (
    <button
      className={`${styles.button} ${!!children && !name && styles.buttonPaddingSmall}`}
      onClick={onClick}
      type={type}
    >
      {children}
      {!!name && <span className={styles.span}>{name}</span>}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string,
  children: PropTypes.func,
  type: PropTypes.oneOf(["button", "reset", "submit"]),
};
