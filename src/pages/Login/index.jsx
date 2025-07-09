// 3rd Party Modules
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Local Modules
import { TextInput } from "../../components/InputFields/TextInput";
import styles from "./index.module.css";
import { Button } from "../../components/Button";
import { NotificationContext, UserStatusContext } from "../../routes/App";
import { fetchRequest } from "../../lib/fetchRequest";

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
  const notificationContext = useContext(NotificationContext);
  const userStatusContext = useContext(UserStatusContext);
  const [username, setUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState(" ");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(" ");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for input errors
    if (!showError) {
      setShowError(true);
    }
    if (errorUsername || errorPassword) {
      notificationContext.setError(
        errorUsername && errorPassword
          ? "Invalid username and password"
          : errorUsername
            ? "Invalid username"
            : "Invalid password",
      );
      return;
    }

    notificationContext.setLoading(true);
    // Try to login
    fetchRequest(import.meta.env.VITE_API_URL + "/login", {
      method: "POST",
      body: { username, password },
    }).then((data) => {
      notificationContext.setLoading(false);
      if (data.status === "error") {
        notificationContext.setError(data.message);
      } else {
        userStatusContext.setIsUserLogged(true);
        navigate("/app");
      }
    });
  };

  return (
    <main className={styles.main} onSubmit={handleSubmit}>
      <h1 className={styles.header}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextInput
          label="username"
          value={username}
          setValue={setUsername}
          minLength={3}
          maxLength={20}
          regex={new RegExp(/^[a-zA-Z0-9]*$/)}
          regexError="Must be letters or numbers"
          error={errorUsername}
          setError={setErrorUsername}
          placeholder="username"
          showError={showError}
          size="clamp(15rem, 40vw, 30rem)"
        />
        <TextInput
          label="password"
          value={password}
          setValue={setPassword}
          minLength={6}
          maxLength={20}
          error={errorPassword}
          setError={setErrorPassword}
          placeholder="password"
          showError={showError}
          size="clamp(15rem, 40vw, 30rem)"
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
