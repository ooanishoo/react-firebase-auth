import React, { useState, useContext, useEffect } from "react";
import { Snackbar, Slide } from "@material-ui/core";
import { StateContext } from "../contexts";

function Popup() {
  const [open, setOpen] = useState(false);
  const { error } = useContext(StateContext);

  useEffect(() => {
    if (error != null) {
      setOpen(true);
    }
  }, [error]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={Slide}
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={4000}
      message={error && error.message}
    />
  );
}

export default Popup;
