import "./RegisterScreen.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { register } from "../redux/actions/authActions";

const RegisterScreen = () => {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [isMessageShown, setIsMessageShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const authMessage = useSelector((state) => state.auth.message);
  const messageType = useSelector((state) => state.auth.messageType);

  const { email, password, repeatPassword } = registerForm;

  const handleFormChange = (e) => {
    const value = e.target.value;
    setRegisterForm((prevState) => {
      return { ...prevState, [e.target.name]: value };
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsMessageShown(false);
    setIsLoading(true);
    dispatch(register(email, password, repeatPassword));

    setRegisterForm({
      email: "",
      password: "",
      repeatPassword: "",
    });
  };

  useEffect(() => {
    setIsLoading(false);
    setIsMessageShown(true);
  }, [authMessage]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMessageShown(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isMessageShown]);

  return (
    <form className="container-register">
      <div className="container-register__header">
        <h1 className="container-register__title">Register</h1>
        <p className="container-register__subtitle">
          Please fill in this form to create an account.
        </p>
        <div
          className={
            messageType === "success"
              ? "container-register__message-success"
              : "container-register__message-fail"
          }
        >
          {isMessageShown && authMessage}
          {isLoading && (
            <div className="container-register__loader-circle"></div>
          )}
        </div>

        <label for="email">
          <b>Email</b>
        </label>
        <input
          className="form-register__input-email"
          type="text"
          placeholder="Enter Email"
          name="email"
          required
          value={email}
          onChange={handleFormChange}
        />

        <label for="password">
          <b>Password</b>
        </label>
        <input
          className="form-register__input-password"
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          value={password}
          onChange={handleFormChange}
        />

        <label for="repeatPassword">
          <b>Repeat Password</b>
        </label>
        <input
          className="form-register__input-password"
          type="password"
          placeholder="Repeat Password"
          name="repeatPassword"
          required
          value={repeatPassword}
          onChange={handleFormChange}
        />

        <p className="form-register__footer">
          Already have an account?
          <Link className="form-register__footer-link" to="/login-screen">
            LOGIN HERE
          </Link>
        </p>

        <button className="form-register__button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterScreen;
