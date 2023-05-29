import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const nameValidate = (name) => name.trim() !== "";
  const emailValidate = (email) => email.includes("@");
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameValueBlurHandler,
    reset: nameInputReset,
  } = useInput(nameValidate);
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailValueBlurHandler,
    reset: emailInputReset,
  } = useInput(emailValidate);

  let formValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formValid = true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!enteredNameIsValid || !enteredEmailIsValid){
      return;
    }
    nameInputReset();
    emailInputReset();
  };

  const formClass = nameInputHasError
    ? "form-control invalid"
    : "form-control ";
  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={handleSubmit}>
      <div className={formClass}>
        <label htmlFor="name">Your Name!!!</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          value={enteredName}
          onBlur={nameValueBlurHandler}
        />
        {nameInputHasError && <p className="error-text">Name is not valid</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">Email</label>
        <input
          type="text"
          id="email"
          onChange={emailChangeHandler}
          value={enteredEmail}
          onBlur={emailValueBlurHandler}
        />
        {emailInputHasError && <p className="error-text">Email is not valid</p>}
      </div>

      <div className="form-actions">
        <button disabled={!formValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
