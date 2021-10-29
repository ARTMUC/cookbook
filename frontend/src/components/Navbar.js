import "./Navbar.css";
import mainLogo from "./OIP.jpg";
import { SiCodechef } from "react-icons/si";
import { Link } from "react-router-dom";

import { useState } from "react";

function Navbar() {
  return (
    <div>
      <div className="App">
        <div>
          <header className="header">
            <ul className="container">
              <SiCodechef className="container__item--logo" />

              <div className="container__item--center">
                <li>
                  <Link to="/" className="button button2">
                    Home
                  </Link>
                </li>

                <li>

                <Link to="/user-screen" className="button button2">
                User screen
                  </Link>
                 
                </li>

                <li>
                <Link to="/login-screen" className="button button2">
                login screen
                  </Link>
                                </li>

                <li>
                <Link to="/register-screen" className="button button2">
                register screen
                  </Link>
                
                </li>
              </div>
              <li className="container__item--right">
                <a className="button " href="https://www.google.com">
                  google it
                </a>
              </li>
            </ul>
          </header>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
