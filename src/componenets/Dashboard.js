import React, { useState, useContext, useEffect } from "react";
import Header from "./Header";
import {
  Typography,
  Card,
  CardContent,
  Container,
  CardHeader,
  Avatar,
} from "@material-ui/core";
import { StateContext } from "../contexts";

function Dashboard() {
  const { user } = useContext(StateContext);
  const [name, setName] = useState("Full name");
  const [email, setEmail] = useState("Email");

  useEffect(() => {
    console.log("useEffect ma xu");
    console.log({ user });
    if (user && user.displayName) {
      setName(user.displayName);
    }
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);

  return (
    <div>
      <Header />
      <Container maxWidth="md">
        <Card>
          <CardHeader
            avatar={<Avatar></Avatar>}
            title={name}
            subheader={email}
          />
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Welcome to Dashboard :)
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Dashboard;
