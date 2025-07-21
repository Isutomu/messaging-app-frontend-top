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
import { EmailInput } from "../../containers/InputFields/EmailInput";

// Local Component
const RedirectLink = ({ name, url }) => {
  return (
    <Link className={styles.link} to={url}>
      {name}
    </Link>
  );
};

// Exportable Component
export const SendPasswordResetLink = () => {
  const errorContext = useContext(ErrorContext);
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(" ");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for input errors
    if (!showError) {
      setShowError(true);
    }
    if (errorEmail) {
      errorContext.setError("Invalid email");
      return;
    }

    setLoading(true);
    // Try to login
    fetchRequest(import.meta.env.VITE_API_URL + "/send-reset-password-link", {
      method: "POST",
      body: { email },
    }).then((data) => {
      setLoading(false);
      if (data.status === "error") {
        setError(data.message);
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
        <EmailInput
          value={email}
          setValue={setEmail}
          error={errorEmail}
          setError={setErrorEmail}
          showError={showError}
        />
        <div className={styles.linkDiv}>
          <RedirectLink name="Go back to login" url="/login" />
        </div>
        <Button name="send reset link" type="submit" />
      </form>
    </main>
  );
};

RedirectLink.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
