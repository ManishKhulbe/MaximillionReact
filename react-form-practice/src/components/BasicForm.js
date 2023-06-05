import useInput from "../hooks/use-input";

const validateName = (name) => name.trim() !== "";
const validateEmail = (email) => email.includes("@");

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameValueBlurHandler,
    reset: firstNameInputReset,
  } = useInput(validateName);
  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameValueBlurHandler,
    reset: lastNameInputReset,
  } = useInput(validateName);
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailValueBlurHandler,
    reset: emailInputReset,
  } = useInput(validateEmail);
  let isFormValid = false;

  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid
  ) {
    isFormValid = true;
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }
    emailInputReset();
    lastNameInputReset();
    firstNameInputReset();
  };

  const lastNameInputClasses = lastNameInputHasError
    ? "form-control invalid"
    : "form-control";
  const firstNameInputClasses = firstNameInputHasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="control-group">
        <div className={firstNameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={enteredFirstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameValueBlurHandler}
          />
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={enteredLastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameValueBlurHandler}
          />
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailValueBlurHandler}
        />
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
