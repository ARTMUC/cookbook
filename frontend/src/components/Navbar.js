import "./Navbar.css";
import mainLogo from "./OIP.jpg";
import { SiCodechef } from "react-icons/si";
import { Link } from "react-router-dom";

import { useState } from "react";

// react - redux
import { useSelector, useDispatch } from "react-redux";
import { login, logout, confirmLoggedIn } from "../redux/actions/authActions";
//

function Navbar() {
// react - redux
const dispatch = useDispatch();
const auth = useSelector((state) => state.auth); // I'm not using selector here but for now I won't be deleting this just for learning process
//

const isAuth = auth.user


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
{isAuth &&  <li>
                  <Link to="/user-screen" className="button button2">
                    User screen
                  </Link>
                </li>}
               
              </div>


{isAuth? 
(<li>
  <button
    className="button button2 container__item--right"
    onClick={() => dispatch(logout())}
  >
    log out{" "}
  </button>
  </li>) :(<><li>
<Link
  to="/login-screen"
  className="button button2 container__item--right"
>
  login screen
</Link>
</li>

<li>
<Link
  to="/register-screen"
  className="button button2 container__item--right"
>
  register screen
</Link>
</li></>)

}

             

            
            </ul>
          </header>
        </div>
      </div>
    </div>
  );
}

export default Navbar;



