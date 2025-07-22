// Local Modules
import PropTypes from "prop-types";
import { TextInput } from "../../../components/InputFields/TextInput";

export const PasswordInput = ({
  value,
  setValue,
  error,
  setError,
  showError,
  label = "password",
  equals = undefined,
}) => {
  return (
    <TextInput
      label={label}
      value={value}
      setValue={setValue}
      minLength={6}
      maxLength={20}
      error={error}
      setError={setError}
      placeholder="password"
      showError={showError}
      size="clamp(15rem, 40vw, 30rem)"
      equals={equals}
    />
  );
};

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  setError: PropTypes.string.isRequired,
  showError: PropTypes.string.isRequired,
  label: PropTypes.string,
  equals: PropTypes.string,
};
