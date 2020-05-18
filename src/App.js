import React, { useReducer, useEffect, useState } from "react";
import { CssBaseline, Snackbar, IconButton, Slide } from "@material-ui/core";
import ProviderLogin from "./componenets/ProviderLogin";
import Card from "./componenets/Card";
import { StateContext, DispatchContext } from "./contexts";
import { auth } from "./firebase";
import { useGetCurrentUser } from "./auth";
import reducer from "./reducer";
import { INITIAL_STATE } from "./state";
import CloseIcon from "@material-ui/icons/Close";

const user = {
  displayName: auth.currentUser && auth.currentUser.displayName,
  email: auth.currentUser && auth.currentUser.email,
  photoURL: auth.currentUser && auth.currentUser.displayName,
};
console.log({ user });

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const user = useGetCurrentUser();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log({ user });
    dispatch({ type: "GET_CURRENT_USER", payload: user });
  }, [user]);

  const { error } = state;
  useEffect(() => {
    if (state.error != null) {
      setOpen(true);
      console.log(error);
    }
    console.log(error);
  }, [state.error]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <CssBaseline />
        <Card />
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          TransitionComponent={Slide}
          open={open}
          onClose={() => setOpen(false)}
          autoHideDuration={4000}
          message={state.error && state.error.message}
        />
        <ProviderLogin />
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
