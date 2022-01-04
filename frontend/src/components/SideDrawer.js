import "./SideDrawer.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";

const SideDrawer = ({ show, showDrawer }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const isAuth = auth.user;

  const handleLogout = async () => {
    await dispatch(logout());
    showDrawer();
  };

  return (
    show && (
      <>
        <ul className="sidedrawer">
          {isAuth && (
            <li className="sidedrawer__menu-item">
              <NavLink
                className="sidedrawer__menu-link"
                activeClassName="sidedrawer__menu-active"
                to="/user-screen"
                onClick={showDrawer}
              >
                User screen
              </NavLink>
            </li>
          )}
          {isAuth ? (
            <li className="sidedrawer__menu-item">
              <div className="sidedrawer__menu-logout" onClick={handleLogout}>
                log out
              </div>
            </li>
          ) : (
            <>
              <li className="sidedrawer__menu-item">
                <NavLink
                  className="sidedrawer__menu-login"
                  to="/login-screen"
                  onClick={showDrawer}
                >
                  login
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <div className="backdrop" onClick={showDrawer}></div>
      </>
    )
  );
};

export default SideDrawer;
