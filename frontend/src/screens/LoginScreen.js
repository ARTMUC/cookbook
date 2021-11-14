import "./LoginScreen.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// react - redux
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../redux/actions/authActions";
//

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMessageShown, setIsMessageShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // react - redux
  const dispatch = useDispatch();
  const authMessage = useSelector((state) => state.auth.message);
  const authUser = useSelector((state) => state.auth.user);
  //

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await dispatch(login(email, password));

    setEmail("");
    setPassword("");
    setIsLoading(false);
    setIsMessageShown(true);
    // if (authUser) {
    //   setTimeout(() => {
    //     window.location.href = "/user-screen";
    //   }, 1000);
    // }   this does not work ----> I need to find another way to redirect without mesing with other timeouts
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMessageShown(false);
    }, 6000);

    return () => clearTimeout(timeout);
  }, [isMessageShown]);

  return (
    <form className="container-login">
      <div className="container-login__header">
        <h1 className="container-login__title">Login</h1>
        <p className="container-login__subtitle">Type in your credentials to login.</p>

        <div className={authUser ? "container-login__message-success" : "container-login__message-fail"}>
          {isMessageShown && authMessage}
          {isLoading && <div className="container-login__loader-circle"></div>}
        </div>

        <label for="email">
          <b>Email</b>
        </label>
        <input
        className="form-login__input-email"
          type="text"
          placeholder="Enter Email"
          name="email"
          id="email"
          required
          value={email}
          onChange={handleEmailChange}
        />

        <label for="psw">
          <b>Password</b>
        </label>
        <input
        className="form-login__input-password"
          type="password"
          placeholder="Enter Password"
          name="psw"
          id="psw"
          required
          value={password}
          onChange={handlePasswordChange}
        />

        <button className="form-login__button" onClick={handleLogin}>
          Login
        </button>
        <div className="form-login__footer">
          <p>
            You don't have an account?
            <Link className="form-login__footer-link" to="/register-screen">REGISTER NOW!</Link>
          </p>
        </div>
      </div>
    </form>
  );
}

export default LoginScreen;
