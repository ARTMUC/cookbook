import "./App.css";

//components

import UserScreen from "./screens/UserScreen";
import HomeScreen from "./screens/HomeScreen";
import Navbar from "./components/Navbar";
import SideDrawer from "./components/SideDrawer";
import BackDrop from "./components/BackDrop";
import SingleRecipe from "./screens/SingleRecipe";
import EditRecipe from "./screens/EditRecipe";
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
  const dispatch = useDispatch(); // I'm not using dispatch here but for now I won't be deleting this just for learning process
  const auth = useSelector((state) => state.auth);
  //
  const isAuth = auth.user;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

function App() {
  const [sideToggle, setSideToggle] = useState(false);

  const handleShowDrawer = () => {
    setSideToggle((prev) => !prev);
  };

  return (
    <Router>
      <div>
        <Navbar showDrawer={handleShowDrawer} />
        <SideDrawer show={sideToggle} showDrawer={handleShowDrawer} />
        <BackDrop show={sideToggle} showDrawer={handleShowDrawer} />
      </div>

      <main className="container--text">
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/login-screen" component={LoginScreen} />
          <Route exact path="/register-screen" component={RegisterScreen} />
          <PrivateRoute path="/user-screen" component={UserScreen} />
          <PrivateRoute path="/recipe/:recipe_id" component ={SingleRecipe} />
          <PrivateRoute path="/edit-recipe/:recipe_id" component ={EditRecipe} />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
