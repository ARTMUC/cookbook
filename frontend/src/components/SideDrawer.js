import "./SideDrawer.css";
import { SiCodechef } from "react-icons/si";
import { Link } from "react-router-dom";

import { useState } from "react";

// react - redux
import { useSelector, useDispatch } from "react-redux";
import { login, logout, confirmLoggedIn } from "../redux/actions/authActions";
//



const SideDrawer = ({show, showDrawer}) => {


  // react - redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth); // I'm not using selector here but for now I won't be deleting this just for learning process
  //

  const isAuth = auth.user;

if (show) {
    


    return (
   
    <ul className="sidedrawer">
      <li className="sidedrawer__menu-item">
        <Link className="sidedrawer__menu-link" to="/">
          Home
        </Link>
      </li>
      {isAuth && (
        <li className="sidedrawer__menu-item">
          <Link className="sidedrawer__menu-link" to="/user-screen">
            User screen
          </Link>
        </li>
      )}
      {isAuth ? (
        <li className="sidedrawer__menu-item">
          <div
            className="sidedrawer__menu-logout"
            onClick={() => dispatch(logout())}
          >
            log out
          </div>
        </li>
      ) : (
        <>
          <li className="sidedrawer__menu-item">
            <Link className="sidedrawer__menu-login" to="/login-screen">
              login
            </Link>
          </li>
        </>
      )}

      
    </ul>
   
      
    );
   
} else{
    return (
        <></>
    )
}
};

export default SideDrawer;