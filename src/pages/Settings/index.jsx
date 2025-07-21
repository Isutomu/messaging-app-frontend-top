// 3rd Party Modules
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Local Modules
import styles from "./index.module.css";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { ErrorContext } from "../../routes/App";
import { fetchRequest } from "../../lib/fetchRequest";
import { UsernameInput } from "../../containers/InputFields/UsernameInput";
import { PasswordInput } from "../../containers/InputFields/PasswordInput";
import { EmailInput } from "../../containers/InputFields/EmailInput";

const ChangeForm = ({ title, actionName, children, field, value, error }) => {
  const errorContext = useContext(ErrorContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!!error) {
      errorContext.setError("Invalid input(s)");
      return;
    }

    const body = {};
    body[field] = value;

    fetchRequest(import.meta.env.VITE_API_URL + `/settings/${field}`, {
      method: "POST",
      body,
    }).then((data) => {
      if (data.status === "error") {
        errorContext.setError(data.message);
      } else {
        navigate(`/app`);
      }
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <div className={styles.formDiv}>
        {children}
        <span>
          <Button name={actionName} type="submit" />
        </span>
      </div>
    </form>
  );
};

export const Settings = () => {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(" ");
  const [username, setUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState(" ");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(" ");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(" ");

  return (
    <section className={styles.mainSection}>
      <Header title="Settings" />
      <section className={styles.formsSection}>
        <ChangeForm
          title="Change Email"
          actionName="change"
          field="email"
          value={email}
          error={errorEmail}
        >
          <EmailInput
            value={email}
            setValue={setEmail}
            error={errorEmail}
            setError={setErrorEmail}
          />
        </ChangeForm>

        <ChangeForm
          title="Change Username"
          actionName="change"
          field="username"
          value={username}
          error={errorUsername}
        >
          <UsernameInput
            value={username}
            setValue={setUsername}
            error={errorUsername}
            setError={setErrorUsername}
          />
        </ChangeForm>

        <ChangeForm
          title="Change Password"
          actionName="change"
          field="password"
          value={password}
          error={errorPassword || errorConfirmPassword}
        >
          <div>
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
          </div>
        </ChangeForm>
      </section>
    </section>
  );
};

ChangeForm.propTypes = {
  title: PropTypes.string.isRequired,
  actionName: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};
