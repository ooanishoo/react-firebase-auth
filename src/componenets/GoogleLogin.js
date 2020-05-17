import React from "react";
import { Typography, Button } from "@material-ui/core";
import { loginWithGoogle } from "../auth";


function GoogleLogin() {
  const handleOnClick = (e) => {
    e.preventDefault();
    loginWithGoogle();
  };
  return (
    <div>
      <Typography variant="h5">React Firebase Auth</Typography>
      Hello
      <br/>
      <Button variant="contained" onClick={handleOnClick}>
        Login with Google
      </Button>
    </div>
  );
}

export default GoogleLogin;
