// Local Modules
import PropTypes from "prop-types";
import { TextInput } from "../../../components/InputFields/TextInput";

export const UsernameInput = ({
  value,
  setValue,
  error,
  setError,
  showError = true,
}) => {
  return (
    <TextInput
      label="username"
      value={value}
      setValue={setValue}
      minLength={3}
      maxLength={20}
      regex={new RegExp(/^[a-zA-Z0-9]*$/)}
      regexError="Must be letters or numbers"
      error={error}
      setError={setError}
      placeholder="username"
      showError={showError}
      size="clamp(15rem, 40vw, 30rem)"
    />
  );
};

UsernameInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  setError: PropTypes.string.isRequired,
  showError: PropTypes.string,
};
