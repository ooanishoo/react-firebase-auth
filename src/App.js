import React, { useReducer, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { StateContext, DispatchContext } from "./contexts";
import { useGetCurrentUser } from "./auth";
import reducer from "./reducer";
import { INITIAL_STATE } from "./state";
import { Route, Switch } from "react-router-dom";
import {
  Dashboard,
  SignIn,
  SignUp,
  ForgotPassword,
  SignInWithEmailLink,
  SendSignInEmailLink,
  Popup,
} from "./componenets";

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const user = useGetCurrentUser();
  useEffect(() => {
    console.log({ user });
    console.log(process.env.REACT_APP_HOMEPAGE);
    dispatch({ type: "GET_CURRENT_USER", payload: user });
  }, [user]);

  console.log(process.env.PUBLIC_URL, "PUBLIC_URL");

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <CssBaseline />
        <Popup />
        <Route>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route
              exact
              path="/sign-in-with-email-link"
              component={SignInWithEmailLink}
            />
            <Route
              exact
              path="/send-sign-in-email-link"
              component={SendSignInEmailLink}
            />
          </Switch>
        </Route>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
