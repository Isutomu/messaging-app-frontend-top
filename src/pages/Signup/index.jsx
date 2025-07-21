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
import { PasswordInput } from "../../containers/InputFields/PasswordInput";
import { EmailInput } from "../../containers/InputFields/EmailInput";
import { UsernameInput } from "../../containers/InputFields/UsernameInput";

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
  const errorContext = useContext(ErrorContext);
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(" ");
  const [username, setUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState(" ");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(" ");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(" ");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for input errors
    if (!showError) {
      setShowError(true);
    }
    if (errorEmail || errorUsername || errorPassword || errorConfirmPassword) {
      errorContext.setError("Invalid form input(s)");
      return;
    }

    setLoading(true);
    // Try to login
    fetchRequest(import.meta.env.VITE_API_URL + "/signup", {
      method: "POST",
      body: { email, username, password },
    }).then((data) => {
      setLoading(false);
      if (data.status === "error") {
        errorContext.setError(data.message);
      } else {
        navigate("/login");
      }
    });
  };

  return (
    <main className={styles.main} onSubmit={handleSubmit}>
      <Loading loading={loading} />
      <h1 className={styles.header}>Signup</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <EmailInput
          value={email}
          setValue={setEmail}
          error={errorEmail}
          setError={setErrorEmail}
          showError={showError}
        />
        <UsernameInput
          value={username}
          setValue={setUsername}
          error={errorUsername}
          setError={setErrorUsername}
          showError={showError}
        />
        <PasswordInput
          value={password}
          setValue={(value) => {
            setPassword(value);
            if (value !== confirmPassword) {
              setErrorConfirmPassword("Values don't match");
            } else {
              setErrorConfirmPassword("");
            }
          }}
          error={errorPassword}
          setError={setErrorPassword}
          showError={showError}
        />
        <PasswordInput
          value={confirmPassword}
          setValue={setConfirmPassword}
          error={errorConfirmPassword}
          setError={setErrorConfirmPassword}
          showError={showError}
          label="confirmPassword"
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
