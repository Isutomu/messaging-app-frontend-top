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
export const Signup = () => {
  const notificationContext = useContext(NotificationContext);
  const userStatusContext = useContext(UserStatusContext);
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(" ");
  const [username, setUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState(" ");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(" ");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(" ");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for input errors
    if (!showError) {
      setShowError(true);
    }
    if (errorEmail || errorUsername || errorPassword || errorConfirmPassword) {
      notificationContext.setError("Invalid form input(s)");
      return;
    }

    notificationContext.setLoading(true);
    // Try to login
    fetchRequest(import.meta.env.VITE_API_URL + "/signup", {
      method: "POST",
      body: { email, username, password },
    }).then((data) => {
      notificationContext.setLoading(false);
      if (data.status === "error") {
        notificationContext.setError(data.message);
      } else {
        userStatusContext.setIsUserLogged(true);
        navigate("/login");
      }
    });
  };

  return (
    <main className={styles.main} onSubmit={handleSubmit}>
      <h1 className={styles.header}>Signup</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextInput
          label="email"
          value={email}
          setValue={setEmail}
          minLength={5}
          maxLength={45}
          regex={
            new RegExp(
              /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            )
          }
          regexError="Must be a valid email"
          error={errorEmail}
          setError={setErrorEmail}
          placeholder="email"
          showError={showError}
          size="clamp(15rem, 40vw, 30rem)"
        />
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
          setValue={(value) => {
            setPassword(value);
            if (value !== confirmPassword) {
              setErrorConfirmPassword("Values don't match");
            } else {
              setErrorConfirmPassword("");
            }
          }}
          minLength={6}
          maxLength={20}
          error={errorPassword}
          setError={setErrorPassword}
          placeholder="password"
          showError={showError}
          size="clamp(15rem, 40vw, 30rem)"
        />
        <TextInput
          label="confirmPassword"
          value={confirmPassword}
          setValue={setConfirmPassword}
          error={errorConfirmPassword}
          setError={setErrorConfirmPassword}
          placeholder="confirm password"
          showError={showError}
          size="clamp(15rem, 40vw, 30rem)"
          equals={password}
        />
        <div className={styles.linkDiv}>
          <RedirectLink name="Go back to login" url="/login" />
        </div>
        <Button name="signup" type="submit" />
      </form>
    </main>
  );
};

RedirectLink.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
