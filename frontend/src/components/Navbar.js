import "./Navbar.css";
import { SiCodechef } from "react-icons/si";
import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";

function Navbar({ showDrawer }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isAuth = auth.user;

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <i>
          <SiCodechef className="navbar__badge" />
        </i>
        <h1>COOKBOOK</h1>
      </div>

      <ul className="navbar__menu">
        {isAuth && (
          <li className="navbar__menu-item">
            <NavLink
              className="navbar__menu-link"
              activeClassName="navbar__menu-active"
              to="/user-screen"
            >
              User screen
            </NavLink>
          </li>
        )}
        {isAuth ? (
          <li className="navbar__menu-item">
            <div className="navbar__menu-logout" onClick={handleLogout}>
              log out
            </div>
          </li>
        ) : (
          <>
            <li className="navbar__menu-item">
              <NavLink className="navbar__menu-login" to="/login-screen">
                login
              </NavLink>
            </li>
          </>
        )}
      </ul>
      <div className="hamburger__menu" onClick={showDrawer}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
}

export default Navbar;
