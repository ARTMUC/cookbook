import "./Navbar.css";
import mainLogo from "./OIP.jpg";
import { SiCodechef } from "react-icons/si";

import { useState } from "react";

function Navbar() {
  return (
    <div className="App">
      <div>
        <header className="header">
          <ul className="container">
            <SiCodechef className="container__item--logo" />

            <li className="container__item--center">
              <a className="button button1" href="/">
                home screen
              </a>

              <a className="button button1" href="/user-screen">
                user screen
              </a>
            </li>

            <li className="container__item--right">
              <a className="button button1" href="https://www.google.com">
                google it
              </a>
            </li>
          </ul>
        </header>
      </div>
    </div>
  );
}

export default Navbar;
