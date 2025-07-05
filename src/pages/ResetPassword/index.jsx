// 3rd Party Modules
import { useContext, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
export const ResetPassword = () => {
  const notificationContext = useContext(NotificationContext);
  const userStatusContext = useContext(UserStatusContext);
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(" ");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(" ");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const [searchparams, setSearchParams] = useSearchParams();
  const resetPasswordToken = searchparams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for input errors
    if (!showError) {
      setShowError(true);
    }
    if (errorPassword || errorConfirmPassword) {
      notificationContext.setError("Invalid form input(s)");
      return;
    }

    notificationContext.setLoading(true);
    // Try to login
    fetchRequest(
      import.meta.env.VITE_API_URL +
        `/reset-password?token=${resetPasswordToken}`,
      {
        method: "POST",
        body: { password },
      },
    ).then((data) => {
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
      <h1 className={styles.header}>Reset Password</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
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
        <Button name="reset password" type="submit" />
      </form>
    </main>
  );
};

RedirectLink.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
