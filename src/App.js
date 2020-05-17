import React from "react";
import { CssBaseline } from "@material-ui/core";
import GoogleLogin from "./componenets/GoogleLogin";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* The rest of your application */}
      <GoogleLogin />
    </React.Fragment>
  );
}

export default App;
