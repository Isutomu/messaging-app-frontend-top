// 3rd Party Modules
import { useContext, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

// Local Modules
import styles from "./index.module.css";
import { Button } from "../../components/Button";
import { ErrorContext } from "../../routes/App";
import { fetchRequest } from "../../lib/fetchRequest";
import { Loading } from "../../components/Loading";
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
export const ResetPassword = () => {
  const errorContext = useContext(ErrorContext);
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(" ");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(" ");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const [searchparams, setSearchParams] = useSearchParams();
  const resetPasswordToken = searchparams.get("token");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for input errors
    if (!showError) {
      setShowError(true);
    }
    if (errorPassword || errorConfirmPassword) {
      errorContext.setError("Invalid form input(s)");
      return;
    }

    setLoading(true);
    // Try to login
    fetchRequest(
      import.meta.env.VITE_API_URL +
        `/reset-password?token=${resetPasswordToken}`,
      {
        method: "POST",
        body: { password },
      },
    ).then((data) => {
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
      <h1 className={styles.header}>Reset Password</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
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
        <Button name="reset password" type="submit" />
      </form>
    </main>
  );
};

RedirectLink.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
