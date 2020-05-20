import React, { useState, useEffect, useContext } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import { loginWithoutPassword, confirmSignInWithEmailLink } from "../auth";
import { DispatchContext } from "../contexts";

function PasswordlessLogin() {
  const [email, setEmail] = useState("");
  const dispatch = useContext(DispatchContext);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "USER_LOGIN_REQUEST" });
    loginWithoutPassword(email)
      .then(() => {
        dispatch({ type: "EMAIL_SENT" });
        setEmail("");
        alert("email sent");
      })
      .catch((err) => dispatch({ type: "USER_LOGIN_FAILURE", payload: err }));
  };

  // Check if the url is redirect from an email for sign in with email method
  useEffect(() => {
    console.log("call confirmSignIn");
    confirmSignInWithEmailLink()
      .then((user) => {
        console.log(user);
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });
      })
      .catch((err) => {
        dispatch({ type: "USER_LOGIN_FAILURE", payload: err.message });
      });
  }, []);

  return (
    <form onSubmit={(e) => handleOnSubmit(e)}>
      <Grid container direction="column" alignItems="center">
        <TextField
          placeholder="Enter email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          //required
        />
        <Button type="submit" color="secondary" variant="contained">
          Passwordless login
        </Button>
      </Grid>
    </form>
  );
}

export default PasswordlessLogin;
