import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { Typography, Button, TextField } from "@material-ui/core";

import Socket from "Socket";

export default function LeaveGameBtn(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  let location = useLocation();

  const leaveGame = (e) => {
    e.preventDefault();
    Socket.emit("leaveGame");
    history.replace("/lobby");
  };

  return (
    <div className={classes.button}>
      <Button variant="contained" color="primary" onClick={leaveGame}>
        QUITTER LA PARTIE
      </Button>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    position: "absolute",
    right: 20,
    top: 20,
    zIndex: 10
  },
}));
