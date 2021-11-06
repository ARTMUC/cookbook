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
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMessageShown(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [isMessageShown]);

  return (
    <form className="container--form">
      <div className="container--register">
        <h1>Login</h1>
        <p>Type in your credentials to login.</p>
        <hr />
        <div className="message">
          {" "}
          {isMessageShown && authMessage}{" "}
          {isLoading && <div class="loader"></div>}{" "}
        </div>
        <hr />
        <label for="email">
          <b>Email</b>
        </label>
        <input
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
          type="password"
          placeholder="Enter Password"
          name="psw"
          id="psw"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <hr />

        <button className="registerbtn" onClick={handleLogin}>
          Login
        </button>
        <div className="container--register signin">
          <p>
            You don't have an account?
            <Link to="/register-screen">{"  "} Register now {"  "}</Link>
          </p>
        </div>
      </div>
    </form>
  );
}

export default LoginScreen;
