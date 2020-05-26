import React, { useContext } from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";
import { loginWithProvider } from "../auth";
import { DispatchContext } from "../contexts";
import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFailure,
} from "../actionTypes";
import { Facebook as FacebookIcon } from "mdi-material-ui";
import { Google as GoogleIcon } from "mdi-material-ui";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

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
        style={{ backgroundColor: "#4267B2" }}
        className={classes.social}
        onClick={() => handleLogin("facebook.com")}
        startIcon={<FacebookIcon />}
      >
        Sign in with Facebook
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="default"
        style={{ backgroundColor: "white" }}
        className={classes.social}
        onClick={() => handleLogin("google.com")}
        startIcon={<GoogleIcon />}
      >
        Sign in with Google
      </Button>
    </div>
  );
}

export default SocialLogin;
