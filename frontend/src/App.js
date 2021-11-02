import "./App.css";


//components

import UserScreen from "./screens/UserScreen";
import HomeScreen from "./screens/HomeScreen";
import Navbar from "./components/Navbar";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";

import { useState } from "react";

// react - redux
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./redux/actions/authActions";
// 



import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";

function NotFound() {
  return <>You have landed on a page that doesn't exist</>;
}

function PrivateRoute({ component: Component, ...rest }) {

// react - redux
const dispatch = useDispatch();   // I'm not using dispatch here but for now I won't be deleting this just for learning process
const auth = useSelector((state) => state.auth);
// 



  const isAuth = auth.user

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/login-screen" />
      }
    />
  );
}



function App() {





  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <br />
      <main className="container--text">
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/login-screen" component={LoginScreen} />
          <Route exact path="/register-screen" component={RegisterScreen} />
          <PrivateRoute path="/user-screen" component={UserScreen} />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
