// 3rd Party Modules
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Local Modules
import styles from "./index.module.css";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/InputFields/TextInput";
import { NotificationContext } from "../../routes/App";
import { fetchRequest } from "../../lib/fetchRequest";

const ChangeForm = ({ title, actionName, children, field, value, error }) => {
  const notificationContext = useContext(NotificationContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!!error) {
      notificationContext.setError("Invalid input(s)");
      return;
    }

    const body = {};
    body[field] = value;

    fetchRequest(import.meta.env.VITE_API_URL + `/settings/${field}`, {
      method: "POST",
      body,
    }).then((data) => {
      if (data.status === "error") {
        notificationContext.setError(data.message);
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
            size="clamp(15rem, 40vw, 30rem)"
          />
        </ChangeForm>

        <ChangeForm
          title="Change Email"
          actionName="change"
          field="username"
          value={username}
          error={errorUsername}
        >
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
            size="clamp(15rem, 40vw, 30rem)"
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
              size="clamp(15rem, 40vw, 30rem)"
            />
            <TextInput
              label="confirmPassword"
              value={confirmPassword}
              setValue={setConfirmPassword}
              error={errorConfirmPassword}
              setError={setErrorConfirmPassword}
              placeholder="confirm password"
              size="clamp(15rem, 40vw, 30rem)"
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
