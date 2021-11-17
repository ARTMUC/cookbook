import "./SideDrawer.css";
import { SiCodechef } from "react-icons/si";
import { NavLink, Link } from "react-router-dom";

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


const handleLogout = async () => {
  await dispatch(logout())
  showDrawer()
}



if (show) {
    


    return (
   
    <ul className="sidedrawer">
  
      {isAuth && (
        <li className="sidedrawer__menu-item">
          <NavLink className="sidedrawer__menu-link" activeClassName="sidedrawer__menu-active" to="/user-screen" onClick={showDrawer}>
            User screen
          </NavLink>
        </li>
      )}
      {isAuth ? (
        <li className="sidedrawer__menu-item">
          <div
            className="sidedrawer__menu-logout"
            onClick={ handleLogout} 
          >
            log out
          </div>
        </li>
      ) : (
        <>
          <li className="sidedrawer__menu-item">
            <NavLink className="sidedrawer__menu-login" to="/login-screen" onClick={showDrawer}>
              login
            </NavLink>
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