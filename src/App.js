import React, { useReducer, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import ProviderLogin from "./componenets/ProviderLogin";
import Card from "./componenets/Card";
import { StateContext, DispatchContext } from "./contexts";
import { useGetCurrentUser } from "./auth";
import reducer from "./reducer";
import { INITIAL_STATE } from "./state";
import Popup from "./componenets/Popup";
import PasswordlessLogin from "./componenets/PasswordlessLogin";

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const user = useGetCurrentUser();

  useEffect(() => {
    console.log({ user });
    dispatch({ type: "GET_CURRENT_USER", payload: user });
  }, [user]);

  const location = window.location.href;
  console.log({ location });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <CssBaseline />
        <Card />
        <Popup />
        <ProviderLogin />
        <PasswordlessLogin />
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
