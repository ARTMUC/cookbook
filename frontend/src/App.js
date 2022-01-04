import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import UserScreen from "./screens/UserScreen";
import HomeScreen from "./screens/HomeScreen";
import Navbar from "./components/Navbar";
import SideDrawer from "./components/SideDrawer";

import SingleRecipe from "./screens/SingleRecipe";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";

import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

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
      </div>

      <main className="container--text">
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/login-screen" component={LoginScreen} />
          <Route exact path="/register-screen" component={RegisterScreen} />
          <PrivateRoute path="/user-screen" component={UserScreen} />
          <PrivateRoute path="/recipe/:recipe_id" component={SingleRecipe} />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
