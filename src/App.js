import React, { useReducer, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { StateContext, DispatchContext } from "./contexts";
import { useGetCurrentUser } from "./auth";
import reducer from "./reducer";
import { INITIAL_STATE } from "./state";
import { Route, Switch } from "react-router-dom";
import {
  SignIn,
  SignUp,
  ForgotPassword,
  SignInWithEmailLink,
  SendSignInEmailLink,
} from "./componenets";
import Popup from "./componenets/Popup";
import Dashboard from "./componenets/Dashboard";

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const user = useGetCurrentUser();
  useEffect(() => {
    console.log({ user });
    dispatch({ type: "GET_CURRENT_USER", payload: user });
  }, [user]);

  const location = window.location.href;
  console.log({ location });
  console.log("env test" + process.env.REACT_APP_FIREBASE_API_KEY);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <CssBaseline />
        <Popup />
        <Route>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/react-firebase-auth" component={SignIn} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route
              path="/sign-in-with-email-link"
              component={SignInWithEmailLink}
            />
            <Route
              path="/send-sign-in-email-link"
              component={SendSignInEmailLink}
            />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </Route>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
