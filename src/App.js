import React, { useReducer } from "react";
import { CssBaseline } from "@material-ui/core";
import GoogleLogin from "./componenets/GoogleLogin";
import Card from "./componenets/Card";
import { StateContext, DispatchContext } from "./contexts";

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  user: null,
};

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case "USER_LOGIN_REQUEST":
      console.log({ type });
      return {
        ...state,
        isLoading: true,
      };
    case "USER_LOGIN_SUCCESS":
      console.log({ type });
      return {
        ...state,
        user: payload,
        isLoading: false,
      };
    case "USER_LOGIN_FAILURE":
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
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
