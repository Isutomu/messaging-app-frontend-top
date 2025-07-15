// 3rd Party Modules
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Local Modules
import styles from "./index.module.css";
import { Button } from "../Button";

export const Header = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <span>{title}</span>
      <Button
        name="X"
        padding="var(--padding-xs) var(--padding-lg)"
        onClick={() => navigate("/app")}
      />
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
