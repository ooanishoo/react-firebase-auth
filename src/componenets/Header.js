import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Grid,
} from "@material-ui/core";
import { StateContext, DispatchContext } from "../contexts";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useContext(DispatchContext);
  const history = useHistory();

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = (e) => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch({ type: "USER_LOGOUT" });
        history.push("/sign-in");
        // history.push(`${process.env.PUBLIC_URL}/sign-in`);
      })
      .catch((err) => alert(err));
  };

  const { user, isLoading } = useContext(StateContext);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid item xs />
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleOpenMenu}
            onClose={handleCloseMenu}
          >
            <Avatar src={user && user.photoURL}></Avatar>
          </IconButton>
          <Menu
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
