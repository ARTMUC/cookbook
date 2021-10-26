import "./App.css";
import "./screens/UserScreen";

//components

import UserScreen from "./screens/UserScreen";
import HomeScreen from "./screens/HomeScreen";
import Navbar from "./components/Navbar";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";

import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
     
      <div>
        <Navbar />
      </div>
      <br/>
      <main className='container--text'>
        <Switch>
          
          <Route exact path="/home-screen" component={HomeScreen} />
          <Route exact path="/user-screen" component={UserScreen} />
          <Route exact path="/login-screen" component={LoginScreen} />
          <Route exact path="/register-screen" component={RegisterScreen} />
        </Switch>
      </main>
   
    </Router>
  );
}

export default App;
