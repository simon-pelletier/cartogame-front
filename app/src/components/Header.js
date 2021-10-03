import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { Typography, Button, TextField } from "@material-ui/core";

import Socket from "Socket";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import LogoutBtn from "Components/LogoutBtn";

export default function Header(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  let history = useHistory();
  let location = useLocation();

  const leaveRoom = () => {
    console.log("=> LEAVE ROOM");
    Socket.emit("leaveRoom");
    history.push("/lobby");
  };

  return (
    <div className={classes.container}>
      {props.logoutBtn ? (
        <div className={classes.logoutBtnContainer}>
          <LogoutBtn />
        </div>
      ) : null}
      {props.leaveRoomBtn ? (
        <div className={classes.leaveRoomBtnBtnContainer}>
          <Button variant="contained" color="secondary" onClick={leaveRoom}>
            <ExitToAppIcon className={classes.iconBtn} />
            LEAVE ROOM
          </Button>
        </div>
      ) : null}
      <div className={classes.titleContainer}>
        <Typography style={{ color: theme.palette.white }} variant="h1">
          GAME-HUB
        </Typography>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    zIndex: 10,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    height: 200,
    width: "100%",
    backgroundColor: theme.palette.darkBlack,
  },
  logoutBtnContainer: {
    position: "absolute",
    right: 50,
  },
  leaveRoomBtnBtnContainer: {
    position: "absolute",
    right: 50,
  },
  titleContainer: {},
  iconBtn: {
    marginRight: 10,
  },
}));
