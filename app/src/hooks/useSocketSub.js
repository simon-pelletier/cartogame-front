import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Actions from "Actions";
import Socket from "Socket";

export default function useSocketSub() {
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    Socket.on("playerState", (playerState) => {
      //* DEV LOGS
      console.log("<=== PLAYER RECEIVED <=== ", playerState);
      dispatch(Actions.playerActions.playerUpdate(playerState));
      if (playerState.place === "home") {
        history.replace("/");
      } else if (playerState.place === "lobby" && playerState.loggedIn) {
        history.replace("/lobby");
      } else if (
        playerState.place === "room" &&
        playerState.loggedIn &&
        playerState.roomName
      ) {
        history.replace("/room");
      } 
      //! A gérer en fonction du jeu
      // else if (
      //   playerState.place === "game" &&
      //   playerState.loggedIn &&
      //   playerState.roomName &&
      //   playerState.inGame && 
      //   location.pathname !== '/room'
      // ) {
      //   history.replace("/game");
      // }
    });

    Socket.on("lobby", (lobby) => {
      //* DEV LOGS
      console.log("<=== LOBBY RECEIVED <=== ", lobby);
      dispatch(Actions.lobbyActions.updateLobby(lobby));
    });

    Socket.on("roomState", (roomState) => {
      //* DEV LOGS
      console.log("<=== ROOM RECEIVED <=== ", roomState);
      dispatch(Actions.roomActions.roomUpdate(roomState));
    });

    Socket.emit("askUpdate");

    return function cleanup() {
      Socket.off("lobby");
      Socket.off("playerState");
      Socket.off("roomState");
    };
  }, []);
}
