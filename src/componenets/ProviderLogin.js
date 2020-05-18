import React, { useContext, useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { loginWithProvider, useIsLoggedIn } from "../auth";
import { DispatchContext, StateContext } from "../contexts";
import { auth } from "../firebase";

function ProviderLogin() {
  const dispatch = useContext(DispatchContext);
  const { isLoading } = useContext(StateContext);
  const isLoggedIn = useIsLoggedIn();

  const handleLogout = (e) => {
    e.preventDefault();
    auth
      .signOut()
      .then(() => dispatch({ type: "USER_LOGOUT" }))
      .catch((err) => alert(err));
  };

  const handleLogin = async (e, providerId) => {
    e.preventDefault();
    dispatch({ type: "USER_LOGIN_REQUEST" });
    loginWithProvider(providerId)
      .then((user) => {
        dispatch({
          type: "USER_LOGIN_SUCCESS",
          payload: user,
        });
      })
      .catch((err) => dispatch({ type: "USER_LOGIN_FAILURE", payload: err }));
  };

  return (
    <div>
      <Button
        color="primary"
        variant="outlined"
        onClick={(e) => {
          isLoggedIn ? handleLogout(e) : handleLogin(e, "google.com");
        }}
      >
        {isLoggedIn
          ? "Logout"
          : isLoading
          ? "Logging in..."
          : "Login with Google"}
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={(e) => {
          isLoggedIn ? handleLogout(e) : handleLogin(e, "facebook.com");
        }}
      >
        {isLoggedIn
          ? "Logout"
          : isLoading
          ? "Logging in..."
          : "Login with Facebook"}
      </Button>
    </div>
  );
}

export default ProviderLogin;
