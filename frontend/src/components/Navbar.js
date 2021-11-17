import "./Navbar.css";
import { SiCodechef } from "react-icons/si";
import { NavLink, Link } from "react-router-dom";

import { useState } from "react";

// react - redux
import { useSelector, useDispatch } from "react-redux";
import { login, logout, confirmLoggedIn } from "../redux/actions/authActions";
//

function Navbar({ showDrawer }) {
  // react - redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth); // I'm not using selector here but for now I won't be deleting this just for learning process
  //

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

    // <div>
    // <div className="App">
    //   <div>
    //     <header className="header">
    //       <ul className="container">
    //         <li>
    //           <SiCodechef className="logo" />
    //         </li>

    //         <li className="container__item--center">
    //           <ul>
    //             <li>
    //               <Link to="/" className="button button2">
    //                 Home
    //               </Link>
    //             </li>
    //             {isAuth && (
    //               <li>
    //                 <Link to="/user-screen" className="button button2">
    //                   User screen
    //                 </Link>
    //               </li>
    //             )}
    //           </ul>
    //         </li>

    //         {isAuth ? (
    //           <li
    //             className="button button2 container__item--right"
    //             onClick={() => dispatch(logout())}
    //           >
    //             log out{" "}
    //           </li>
    //         ) : (
    //           <>
    //             <li className="container__item--right">
    //               >
    //               <Link className="button button2" to="/login-screen">
    //                 login
    //               </Link>
    //             </li>
    //           </>
    //         )}
    //       </ul>
    //     </header>
    //   </div>
    // </div>
    // </div>
  );
}

export default Navbar;
