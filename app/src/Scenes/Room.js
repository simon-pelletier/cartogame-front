import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PersonIcon from "@material-ui/icons/Person";

import CircularProgress from "@material-ui/core/CircularProgress";

import Socket from "Socket";
import Header from "Components/Header";

import CheckIcon from "@material-ui/icons/Check";

import {
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";

import { useSocketSub } from "Hooks";

export default function Room(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  let location = useLocation();

  const [loading, setLoading] = useState(false);

  useSocketSub();

  useEffect(() => {
    console.log("ROOM => DID MOUNT !");

    return function cleanup() {
      Socket.off("lobby");
      Socket.off("playerState");
      Socket.off("roomState");
    };
  }, []);

  const player = useSelector((state) => state.player);
  const room = useSelector((state) => state.room);
  const players = room.get("players");

  const [ready, setReady] = useState(false);

  useEffect(() => {
    console.log("ROOM => DID MOUNT !");

    Socket.on("startGame", (response) => {
      console.log("Toute la room est prête, c'est c'est partit !!!");
      setLoading(true);
      setTimeout(() => {
        Socket.off("startGame");
        //! A changer en fonction du jeu
        history.push("/mappers");
      }, 800);
    });
  }, []);

  const playersRender = () => {
    let playersArray = [];

    if (players) {
      for (let i = 0; i < players.length; i++) {
        let currentPlayer = players[i];
        let isYou = false;
        if (currentPlayer.pseudo === player.get("pseudo")) {
          isYou = true;
        }
        let isPlayerReady = players[i].roomReady;
        if (isYou && isPlayerReady && !ready && room.get("locked") === true) {
          setReady(true);
          setLoading(true);
          setTimeout(() => {
            Socket.off("startGame");
            //! A changer en fonction du jeu
            history.push("/mappers");
          }, 800);
        }
        playersArray.push(
          <div
            className={classes.playerContainer}
            key={`${players[i].pseudo}-playerItem`}
            style={
              isPlayerReady
                ? { backgroundColor: theme.palette.primary.main }
                : null
            }
          >
            {isYou ? <PersonIcon className={classes.iconBtn} /> : ""}
            {/* {players[i].roomReady ? " - READY !" : ""} */}
            {` ${players[i].pseudo} `}
          </div>
        );
      }
    }

    return playersArray;
  };

  let roomName = room.get("name");

  return (
    <div className={classes.container}>
      <Header leaveRoomBtn={true} />

      {loading ? (
        <div className={classes.loadingModal}>
          LOADING
          <div className={classes.loaderContainer}>
            <CircularProgress color="secondary" size={60} />
          </div>
        </div>
      ) : null}

      <div className={classes.title}>
        <Typography variant="h3" className={classes.roomTitle}>
          {roomName
            ? `${roomName.charAt(0).toUpperCase()}${roomName.slice(1)}`
            : null}
        </Typography>
      </div>

      <div className={classes.playersListContainer}>{playersRender()}</div>
      {/* <div className={classes.title}>
        <Typography variant="h3" className={classes.roomTitle}>
          OPTIONS
        </Typography>
      </div> */}

      <div className={classes.button}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={ready}
                onChange={(e) => {
                  setReady(e.target.checked);
                  Socket.emit("roomReady", e.target.checked);
                }}
                name="ready"
                color="primary"
              />
            }
            label={
              <div className={classes.readyText}>
                GO !
                <CheckIcon className={classes.checkIcon} />
              </div>
            }
          />
        </FormGroup>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  loadingModal: {
    zIndex: 50,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: "absolute",
    backgroundColor: theme.palette.darkBlack,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontWeight: 800,
    fontSize: 25,
    color: theme.palette.white,
  },
  loaderContainer: {
    padding: 30,
  },
  container: {
    zIndex: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    marginTop: 200,
  },
  title: {
    marginTop: 80,
    marginBottom: 50,
  },
  buttonNewGame: {
  },
  playersListContainer: {
    overflowY: "scroll",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    overflowY: "scroll",
    paddingRight: 150,
    paddingLeft: 150,
  },
  titleContainer: {
    marginTop: 50,
    marginBottom: 50,
  },
  playerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.white,
    borderRadius: theme.shape.borderRadius,
    height: 30,
    minWidth: 150,
    padding: 10,
    margin: 20,
    transition: `all 0.3s linear`,
  },
  formsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: 50,
  },
  button: {
    position: "absolute",
    right: 10,
    bottom: 10,
    padding: 30,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
  },
  iconBtn: {
    marginRight: 10,
  },
  roomTitle: {
    fontWeight: 800,
  },
  readyText: {
    fontWeight: 800,
    fontSize: 20,
    marginTop: -3,
  },
  checkIcon: {
    paddingLeft: 5,
    marginBottom: -3,
  },
}));
