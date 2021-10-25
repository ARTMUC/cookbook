import "./App.css";
import "./screens/UserScreen";

//components

import UserScreen from "./screens/UserScreen";
import HomeScreen from "./screens/HomeScreen";
import Navbar from "./components/Navbar";

import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
     
      <div>
        <Navbar />
      </div>
      <main className='container--text'>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/user-screen" component={UserScreen} />
        </Switch>
      </main>
   
    </Router>
  );
}

export default App;
