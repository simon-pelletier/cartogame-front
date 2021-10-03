import React, { useState, useEffect, useReducer } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography, Button, TextField } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Actions from "Actions";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import Header from "Components/Header";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { useSocketSub, useShallowEqualSelector } from "Hooks";

import Socket from "Socket";

export default function Lobby(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();

  const [roomName, setRoomName] = useState("");
  const [errors, setErrors] = useState(null);

  useSocketSub();

  useEffect(() => {
    console.log("LOBBY => DID MOUNT !");
  }, []);

  const player = useShallowEqualSelector((state) => state.player);
  const players = useShallowEqualSelector((state) =>
    state.lobby.get("players")
  );
  const rooms = useShallowEqualSelector((state) => state.lobby.get("rooms"));

  const startNewRoom = (e) => {
    e.preventDefault();

    if (roomName === "") {
      setErrors({ roomName: "Il faut entrer un nom de room Michel !" });
      return;
    }

    if (roomName.length < 5) {
      setErrors({ roomName: "Au moins 5 char. ce serait pas du luxe" });
      return;
    }

    if (roomName.length > 20) {
      setErrors({
        roomName: `C'est bien trop long pour toi ça Michel ! C'est 20 char. max tu l'auras bien cherché !`,
      });
      return;
    }

    Socket.emit("newRoom", roomName);
    Socket.on("newRoomReturn", (response) => {
      Socket.off("newRoomReturn");
      if (response.success) {
        history.push("/room");
      } else {
        console.log("ERROR : ", response);
      }
    });
  };

  const joinRoom = (roomId, roomNameToJoin) => {
    console.log("SELECT ROOM => ", roomId, roomNameToJoin);

    Socket.emit("joinRoom", roomId, roomNameToJoin);
    Socket.on("joinRoomReturn", (response) => {
      Socket.off("joinRoomReturn");
      if (response.success) {
        history.push("/room");
      } else {
        console.log("ERROR : ", response);
      }
    });
  };

  const roomsRender = () => {
    let roomsArray = [];

    for (let i = 0; i < rooms.length; i++) {
      roomsArray.push(
        <div
          className={classes.roomContainer}
          key={`${rooms[i].name}-roomItem`}
          onClick={() => {
            rooms[i].locked ? () => {} : joinRoom(rooms[i].id, rooms[i].name);
          }}
        >
          {rooms[i].locked ? <LockIcon className={classes.iconBtn} /> : ""}
          {`${rooms[i].players.length}`}
          <PersonIcon className={classes.iconBtn} />
          { `${rooms[i].name.charAt(0).toUpperCase()}${rooms[i].name.slice(1)}`}
        </div>
      );
    }

    return roomsArray;
  };

  const playersRender = () => {
    let playersArray = [];

    if (players) {
      for (let i = 0; i < players.length; i++) {
        let currentPlayer = players[i];
        if (currentPlayer.loggedIn) {
          let isYou = false;
          if (currentPlayer.pseudo === player.get("pseudo")) {
            isYou = true;
          }
          playersArray.push(
            <div
              className={classes.playerContainer}
              key={`${players[i].pseudo}-playerItem`}
            >
              {players[i].inGame ? (
                <LockIcon className={classes.iconBtn} />
              ) : (
                ""
              )}
              {isYou ? <PersonIcon className={classes.iconBtn} /> : ""}
              {` ${players[i].pseudo} `}
            </div>
          );
        }
      }
    }

    return playersArray;
  };

  return (
    <div className={classes.container}>
      <Header logoutBtn={true} />
      <div className={classes.listsContainer}>
        <div className={classes.playersContainer}>
          <div className={classes.titleContainer}>
            <Typography variant="h3" gutterBottom>
              JOUEURS
            </Typography>
          </div>
          <div className={classes.playersListContainer}>{playersRender()}</div>
        </div>

        <div className={classes.roomsContainer}>
          <div className={classes.titleContainer}>
            <Typography variant="h3" gutterBottom>
              SALLES
            </Typography>
          </div>
          <div className={classes.roomsListContainer}>
            {roomsRender()}

            <form onSubmit={startNewRoom} className={classes.formContainer}>
              <TextField
                error={errors ? true : false}
                helperText={errors ? errors.roomName : ""}
                name="roomName"
                autoComplete=""
                label="Nouvelle salle"
                onChange={(e) => {
                  setErrors(null);
                  setRoomName(e.target.value);
                }}
              />

              <div className={classes.buttonNewGame}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={startNewRoom}
                >
                  <ExitToAppIcon className={classes.iconBtn} />
                  ENTRER
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    zIndex: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  listsContainer: {
    marginTop: 200,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    overflowY: "scroll",
  },
  playersContainer: {
    paddingLeft: 150,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  roomsContainer: {
    paddingRight: 150,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  titleContainer: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  roomsListContainer: {
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // flexDirection: "column",
    // // width: 400,
    // width: "100%",
    // backgroundColor: theme.palette.primary.dark,
    // borderRadius: 10,
    // margin: 50,
    // padding: 20,
  },
  playersListContainer: {
    // display: "flex",
    // width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
    // flexDirection: "column",
    // // width: 400,
    // backgroundColor: theme.palette.primary.dark,
    // borderRadius: 10,
    // margin: 50,
    // padding: 20,
  },
  roomContainer: {
    backgroundColor: theme.palette.white,
    margin: 10,
    padding: 10,
    display: "flex",
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // width: "100%",
    textAlign: "center",
    cursor: "pointer",
    borderRadius: theme.shape.borderRadius,
  },
  playerContainer: {
    backgroundColor: theme.palette.white,
    margin: 10,
    padding: 10,
    display: "flex",
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // width: "100%",
    textAlign: "center",
    // cursor: "pointer",
    borderRadius: theme.shape.borderRadius,
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: 50,
  },
  buttonNewGame: {
    marginLeft: 30,
    // marginTop: 40,
    // marginBottom: 40,
  },
  playersListInRoom: {},
  playerInRoom: {
    marginLeft: 10,
  },
  iconBtn: {
    marginRight: 10,
  },
}));
