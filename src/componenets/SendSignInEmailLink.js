import React, { useState, useContext } from "react";
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
import { sendSignInEmailLink } from "../auth";
import { DispatchContext, StateContext } from "../contexts";
import {
  sendEmailLinkRequest,
  sendEmailLinkSuccess,
  sendEmailLinkFailure,
} from "../actionTypes";

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

export default function SendSignInEmailLink() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const dispatch = useContext(DispatchContext);
  const { isLoading, error } = useContext(StateContext);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (isEmailSent) {
      return;
    }

    // Dispatch actions only if in idle state
    if (!isLoading) {
      dispatch(sendEmailLinkRequest());
      sendSignInEmailLink(email)
        .then(() => {
          dispatch(sendEmailLinkSuccess());
          setEmail("");
          setIsEmailSent(true);
        })
        .catch((err) => dispatch(sendEmailLinkFailure(err)));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EmailOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Send Sign In Email Link
        </Typography>
        <br />
        <Typography component="body1" variant="body1" color="textSecondary">
          You will receive an email with an url to sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
          {!isEmailSent ? (
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
            {isEmailSent
              ? "Email Sent"
              : isLoading
              ? "Sending Email..."
              : "Send an Email"}
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
