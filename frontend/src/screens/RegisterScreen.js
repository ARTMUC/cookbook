import "./RegisterScreen.css";

import { useEffect, useState } from "react";

function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isMessageShown, setIsMessageShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    console.log(email);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    console.log(email);
  };

  const handleRepeatPasswordChange = (e) => {
    e.preventDefault();
    setRepeatPassword(e.target.value);
    console.log(email);
  };

  const handleRegister = async (e) => {
    setIsMessageShown(false)
    setIsLoading(true)
    
    if (password === repeatPassword) {
      e.preventDefault();
      let r = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      setMessage(await r.json());
      setIsLoading(false)
    } else {
      console.log("type your password again");
    }

    setEmail("");
    setPassword("");
    setRepeatPassword("");

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
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />
        <div className="message">
          {" "}
          {isMessageShown && <p>{message}</p>}{" "}
          {" "}
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

        <label for="psw-repeat">
          <b>Repeat Password</b>
        </label>
        <input
          type="password"
          placeholder="Repeat Password"
          name="psw-repeat"
          id="psw-repeat"
          required
          value={repeatPassword}
          onChange={handleRepeatPasswordChange}
        />
        <hr />
        <p>
          By creating an account you agree to our{" "}
          <a href="#">Terms & Privacy</a>.
        </p>

        <button className="registerbtn" onClick={handleRegister}>
          Register
        </button>
      </div>

      <div className="container--register signin">
        <p>
          Already have an account? <a href="#">Sign in</a>.
        </p>
      </div>
    </form>
  );
}

export default RegisterScreen;
