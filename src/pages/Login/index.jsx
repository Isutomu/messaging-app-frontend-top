// 3rd Party Modules
import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Local Modules
import { TextInput } from "../../components/InputFields/TextInput";
import styles from "./index.module.css";
import { Button } from "../../components/Button";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
          size="clamp(15rem, 40vw, 30rem)"
        />
        <TextInput
          label="password"
          value={password}
          setValue={setPassword}
          minLength={6}
          maxLength={20}
          size="clamp(15rem, 40vw, 30rem)"
        />
        <div className={styles.linkDiv}>
          <RedirectLink name="forgot password" url="/forgot-password" />
          <RedirectLink name="sign up" url="/sign-up" />
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
