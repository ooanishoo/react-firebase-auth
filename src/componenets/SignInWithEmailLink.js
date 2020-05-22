import React, { useState, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SocialLogin from "./SocialLogin";
import Copyright from "./Copyright";
import { Link } from "react-router-dom";
import {
  sendSignInEmailLink,
  confirmSignInWithEmailLink,
  signInWithEmailLink,
} from "../auth";
import { DispatchContext, StateContext } from "../contexts";
import {
  sendEmailLinkRequest,
  sendEmailLinkSuccess,
  sendEmailLinkFailure,
  userLoginSuccess,
  userLoginFailure,
} from "../actionTypes";
import { auth } from "../firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInWithEmailLink() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const dispatch = useContext(DispatchContext);
  const { isLoading, error } = useContext(StateContext);
  const url = window.location.href;
  const [isRedirect, setIsRedirect] = useState(false);
  const [isSameDevice, setIsSameDevice] = useState(true);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    signInWithEmailLink(email)
      .then((user) => dispatch(userLoginSuccess(user)))
      .catch((err) => dispatch(userLoginFailure(err.message)));
  };

  // // Check if the url is redirect from an email for sign in with email method
  // useEffect(() => {
  //   console.log("call confirmSignIn");
  //   confirmSignInWithEmailLink()
  //     .then((user) => {
  //       console.log(user);
  //       dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });
  //     })
  //     .catch((err) => {
  //       dispatch({ type: "USER_LOGIN_FAILURE", payload: err.message });
  //     });
  // }, []);

  useEffect(() => {
    if (auth.isSignInWithEmailLink(url)) {
      setIsRedirect(true);
    }
    var email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      setEmail(email);
      setIsSameDevice(false);
    }
  }, [url]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EmailOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in With Email Link
        </Typography>
        <br />
        <Typography component="body1" variant="body1" color="textSecondary">
          Click the button to sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
          {!isSameDevice ? (
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
