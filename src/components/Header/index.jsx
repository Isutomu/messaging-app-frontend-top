// 3rd Party Modules
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Local Modules
import styles from "./index.module.css";

export const Header = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <span>{title}</span>
      <button className={styles.button} onClick={() => navigate("/app")}>
        X
      </button>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
