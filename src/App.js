import React, { useReducer, useEffect, useContext, useState } from "react";
import { CssBaseline } from "@material-ui/core";
import { StateContext, DispatchContext } from "./contexts";
import { useGetCurrentUser } from "./auth";
import reducer from "./reducer";
import { INITIAL_STATE } from "./state";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  Dashboard,
  SignIn,
  SignUp,
  ForgotPassword,
  SignInWithEmailLink,
  SendSignInEmailLink,
} from "./componenets";
import Popup from "./componenets/Popup";

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const user = useGetCurrentUser();
  useEffect(() => {
    console.log({ user });
    dispatch({ type: "GET_CURRENT_USER", payload: user });
  }, [user]);

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
