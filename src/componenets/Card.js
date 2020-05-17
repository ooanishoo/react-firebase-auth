import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PersonIcon from "@material-ui/icons/Person";
import { CardHeader, Avatar } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { StateContext } from "../contexts";

function Card() {
  const { user, isLoading, error } = useContext(StateContext);
  console.log({ isLoading });
  console.log({ user });
  if (error !== null) alert(error);
  return (
    <div>
      <CardHeader
        avatar={
          isLoading ? (
            <Skeleton
              animation="pulse"
              variant="circle"
              width={40}
              height={40}
            />
          ) : (
            <Avatar src={user && user.photoURL}>
              <PersonIcon />
            </Avatar>
          )
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          isLoading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="20%"
              style={{ marginBottom: 6 }}
            />
          ) : user && user.name ? (
            user.name
          ) : (
            "Full Name"
          )
        }
        subheader={
          isLoading ? (
            <Skeleton animation="wave" height={10} width="10%" />
          ) : user && user.email ? (
            user.email
          ) : (
            "Email"
          )
        }
      />
    </div>
  );
}

export default Card;
