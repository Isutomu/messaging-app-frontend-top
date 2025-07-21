// 3rd Party Modules
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Local Modules
import styles from "./index.module.css";
import { Button } from "../../components/Button";
import { ErrorContext } from "../../routes/App";
import { fetchRequest } from "../../lib/fetchRequest";
import { Loading } from "../../components/Loading";
import { UsernameInput } from "../../containers/InputFields/UsernameInput";
import { PasswordInput } from "../../containers/InputFields/PasswordInput";

// Local Component
const RedirectLink = ({ name, url }) => {
  return (
    <Link className={styles.link} to={url}>
      {name}
    </Link>
  );
};

// Exportable Component
export const Login = () => {
  const errorContext = useContext(ErrorContext);
  const [username, setUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState(" ");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(" ");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for input errors
    if (!showError) {
      setShowError(true);
    }
    if (errorUsername || errorPassword) {
      errorContext.setError(
        errorUsername && errorPassword
          ? "Invalid username and password"
          : errorUsername
            ? "Invalid username"
            : "Invalid password",
      );
      return;
    }

    setLoading(true);
    // Try to login
    fetchRequest(import.meta.env.VITE_API_URL + "/login", {
      method: "POST",
      body: { username, password },
    }).then((data) => {
      setLoading(false);
      if (data.status === "error") {
        errorContext.setError(data.message);
      } else {
        navigate("/app");
      }
    });
  };

  return (
    <main className={styles.main} onSubmit={handleSubmit}>
      <Loading loading={loading} />
      <h1 className={styles.header}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <UsernameInput
          value={username}
          setValue={setUsername}
          error={errorUsername}
          setError={setErrorUsername}
          showError={showError}
        />
        <PasswordInput
          value={password}
          setValue={setPassword}
          error={errorPassword}
          setError={setErrorPassword}
          showError={showError}
        />
        <div className={styles.linkDiv}>
          <RedirectLink
            name="forgot password"
            url="/send-reset-password-link"
          />
          <RedirectLink name="sign up" url="/signup" />
        </div>
        <Button name="login" type="submit" />
      </form>
    </main>
  );
};

RedirectLink.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
