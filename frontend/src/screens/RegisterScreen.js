import "./RegisterScreen.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isMessageShown, setIsMessageShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

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
    setIsMessageShown(false);
    setIsLoading(true);

    try {
      if (password === repeatPassword) {
        e.preventDefault();
        let r = await fetch("http://localhost:5000/api/v1/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        });
        setServerMessage(await r.json());
        setIsLoading(false);
      } else {
        setServerMessage({
          message: 'Both passwords must be identical',
          statusCode: 400,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setServerMessage({ message: "something went wrong", statusCode: 400 });
      setIsLoading(false);
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

  const { message, statusCode } = serverMessage;

  return (
    <form className="container-register">
      <div className="container-register__header">
        <h1 className="container-register__title">Register</h1>
        <p className="container-register__subtitle">
          Please fill in this form to create an account.
        </p>
        <div
          className={
            !statusCode
              ? "container-register__message-success"
              : "container-register__message-fail"
          }
        >
          {isMessageShown && message}
          {isLoading && <div className="container-register__loader-circle"></div>}
        </div>
      
        <label for="email">
          <b>Email</b>
        </label>
        <input
         className="form-register__input-email"
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
        className="form-register__input-password"
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
        className="form-register__input-password"
          type="password"
          placeholder="Repeat Password"
          name="psw-repeat"
          id="psw-repeat"
          required
          value={repeatPassword}
          onChange={handleRepeatPasswordChange}
        />

        <p className="form-register__footer">
          Already have an account?
          <Link className="form-register__footer-link" to="/login-screen">
            {"  "} LOGIN HERE {"  "}
          </Link>
        </p>

        <button className="form-register__button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </form>
  );
}

export default RegisterScreen;
