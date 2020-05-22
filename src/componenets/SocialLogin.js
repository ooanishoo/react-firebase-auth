import React, { useContext } from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";
import { loginWithProvider } from "../auth";
import { DispatchContext } from "../contexts";
import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFailure,
} from "../actionTypes";
import history from "../history";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  social: {
    margin: theme.spacing(2, 0, 0),
  },
}));

function SocialLogin() {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);

  const handleLogin = async (providerId) => {
    dispatch(userLoginRequest());
    loginWithProvider(providerId)
      .then((user) => {
        dispatch(userLoginSuccess(user));
        history.push("/dashboard");
      })
      .catch((err) => dispatch(userLoginFailure(err)));
  };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="body1">
        OR
      </Typography>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.social}
        onClick={() => handleLogin("facebook.com")}
      >
        Sign in with Facebook
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="default"
        className={classes.social}
        onClick={() => handleLogin("google.com")}
      >
        Sign in with Google
      </Button>
    </div>
  );
}

export default SocialLogin;
