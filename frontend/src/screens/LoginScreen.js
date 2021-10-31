import "./LoginScreen.css";


import { useEffect, useState } from "react";


// react - redux
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../redux/actions/authActions";
// 

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMessageShown, setIsMessageShown] = useState(false);
  const [message, setMessage] = useState("");

// react - redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
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
    if (email && password) {
      let r = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (r.status === 401) {
        setMessage("Wrong email or password.");
      } else {
        setMessage(await r.json());

       // react - redux
        dispatch(login(true));
      // later I can pass the whole fetch to the dispatch (i'm using thunk), for now I'll pass just the required value

      }
    } else {
      setMessage("Email and password required.");
    }

    setEmail("");
    setPassword("");

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
        <div className="message"> {isMessageShown && <p>{message}</p>} </div>
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
      </div>
    </form>
  );
}

export default LoginScreen;
