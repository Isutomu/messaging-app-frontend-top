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
export const SendPasswordResetLink = () => {
  const notificationContext = useContext(NotificationContext);
  const userStatusContext = useContext(UserStatusContext);
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(" ");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for input errors
    if (!showError) {
      setShowError(true);
    }
    if (errorEmail) {
      notificationContext.setError("Invalid email");
      return;
    }

    notificationContext.setLoading(true);
    // Try to login
    fetchRequest(import.meta.env.VITE_API_URL + "/send-reset-password-link", {
      method: "POST",
      body: { email },
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
      <h1 className={styles.header}>Reset Password</h1>
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
