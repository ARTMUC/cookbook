import "./Navbar.css";
import mainLogo from "./OIP.jpg";
import { SiCodechef } from "react-icons/si";

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
                  <a className="button button2" href="/home-screen">
                    home screen
                  </a>
                </li>

                <li>
                  <a className="button button2" href="/user-screen">
                    user screen
                  </a>
                </li>

                <li>
                  <a className="button button2" href="/login-screen">
                    login screen
                  </a>
                </li>

                <li>
                  <a className="button button2" href="/register-screen">
                    register screen
                  </a>
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
