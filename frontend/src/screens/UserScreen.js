import "./UserScreen.css";
import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";
// react - redux
import { useSelector, useDispatch } from "react-redux";
import { login, logout, confirmLoggedIn } from "../redux/actions/authActions";
//



function UserScreen() {
  // react - redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth); // I'm not using selector here but for now I won't be deleting this just for learning process
  //

  useEffect(async () => {
    await dispatch(confirmLoggedIn());
    console.log("check if logged in");
  }, []);

  return (
    <div>
     
      <img src="https://www.history.com/.image/t_share/MTU3ODc4NjAxOTA2MjY3ODcx/gettyimages-758308751.jpg"></img>
    </div>
  );
}

export default UserScreen;
