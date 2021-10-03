import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { Typography, Button, TextField } from "@material-ui/core";

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import Socket from "Socket";

export default function LogoutBtn(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  let location = useLocation();

  const logout = (e) => {
    e.preventDefault();
    Socket.emit("logout");
    history.replace("/");
  };

  return (
    <div className={classes.button}>
      <Button variant="contained" color="secondary" onClick={logout}>
        <PowerSettingsNewIcon className={classes.iconBtn} />
        DECONNEXION
      </Button>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    // position: "absolute",
    // left: 10,
    // top: 10,
  },
  iconBtn: {
    marginRight: 10,
  },
}));
