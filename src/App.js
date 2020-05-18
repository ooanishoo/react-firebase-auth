import React, { useReducer, useEffect, useState } from "react";
import { CssBaseline } from "@material-ui/core";
import GoogleLogin from "./componenets/GoogleLogin";
import Card from "./componenets/Card";
import { StateContext, DispatchContext } from "./contexts";
import { auth } from "./firebase";
import { useGetCurrentUser } from "./auth";
import reducer from "./reducer";
import { INITIAL_STATE } from "./state";

const user = {
  displayName: auth.currentUser && auth.currentUser.displayName,
  email: auth.currentUser && auth.currentUser.email,
  photoURL: auth.currentUser && auth.currentUser.displayName,
};
console.log({ user });

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
        <Card />
        <GoogleLogin />
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
