import React, { useState, useContext } from "react";
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
import SocialLogin from "./SocialLogin";
import Copyright from "./Copyright";
import { Link } from "react-router-dom";
import history from "../history";
import { DispatchContext, StateContext } from "../contexts";
import {
  userLoginRequest,
  userLoginFailure,
  userLoginSuccess,
} from "../actionTypes";
import { signInWithEmailAndPassword } from "../auth";

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

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useContext(DispatchContext);
  const { isLoading } = useContext(StateContext);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      dispatch(userLoginRequest());
      signInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log({ user });
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isLoading ? `Signing In...` : `Sign In`}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/sign-up">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <SocialLogin />
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
        onClick={() => history.push("/send-sign-in-email-link")}
      >
        Send Sign In Email Link
      </Button>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
