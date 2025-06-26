// 3rd Party Modules
import PropTypes from "prop-types";

// Local Modules
import styles from "./index.module.css";

// Exportable Component
export const Button = ({ onClick, name, children }) => {
  if (!name && !children) {
    return new Error("One of props 'name' or 'children' has to be specified!");
  }

  return (
    <button
      className={`${styles.button} ${!!children && !name && styles.buttonPaddingSmall}`}
      onClick={onClick}
    >
      {children}
      {!!name && <span className={styles.span}>{name}</span>}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string,
  children: PropTypes.func,
};
