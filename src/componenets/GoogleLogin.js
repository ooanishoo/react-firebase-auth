import React, { useContext, useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { loginWithGoogle } from "../auth";
import { DispatchContext, StateContext } from "../contexts";

function GoogleLogin() {
  const dispatch = useContext(DispatchContext);
  const { isLoading } = useContext(StateContext);

  const handleOnClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "USER_LOGIN_REQUEST" });
    loginWithGoogle()
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
      <Button variant="contained" onClick={handleOnClick}>
        {isLoading ? "Logging in..." : "Login with Google"}
      </Button>
    </div>
  );
}

export default GoogleLogin;
