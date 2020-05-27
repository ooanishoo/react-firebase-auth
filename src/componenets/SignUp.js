import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "./Copyright";
import { Link, useHistory } from "react-router-dom";
import { DispatchContext, StateContext } from "../contexts";
import { signUpWithEmailAndPassword } from "../auth";
import {
  userLoginRequest,
  userLoginFailure,
  userLoginSuccess,
} from "../actionTypes";
import firebase, { auth } from "../firebase";

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

export default function SignUp() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepUserLoggedIn, setKeepUserLoggedIn] = useState(true);

  const dispatch = useContext(DispatchContext);
  const { isLoading } = useContext(StateContext);
  const history = useHistory();

  const user = {
    name,
    email,
    password,
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      dispatch(userLoginRequest());
      if (!keepUserLoggedIn) {
        // Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      }
      signUpWithEmailAndPassword(user)
        .then((user) => {
          dispatch(userLoginSuccess(user));
          history.push("/dashboard");
        })
        .catch((err) => dispatch(userLoginFailure(err)));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleOnSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Full name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={keepUserLoggedIn}
                color="primary"
                onClick={(e) => setKeepUserLoggedIn(e.target.checked)}
              />
            }
            label="Keep me logged in"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isLoading ? `Signing up...` : `Sign Up`}
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/sign-in">{"Already have an account? Sign in"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
