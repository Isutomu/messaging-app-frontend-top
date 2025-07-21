// Local Modules
import PropTypes from "prop-types";
import { TextInput } from "../../../components/InputFields/TextInput";

export const EmailInput = ({
  value,
  setValue,
  error,
  setError,
  showError = true,
}) => {
  return (
    <TextInput
      label="email"
      value={value}
      setValue={setValue}
      minLength={5}
      maxLength={45}
      regex={
        new RegExp(
          /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        )
      }
      regexError="Must be a valid email"
      error={error}
      setError={setError}
      placeholder="email"
      size="clamp(15rem, 40vw, 30rem)"
      showError={showError}
    />
  );
};

EmailInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  setError: PropTypes.string.isRequired,
  showError: PropTypes.string,
};
