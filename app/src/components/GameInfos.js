import React, { useState, useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Button, Typography } from "@material-ui/core";

import CurrentPiece from "./CurrentPiece";
import OtherPlayers from "./OtherPlayers";
import CurrentPlayer from "./CurrentPlayer";

export default function GameInfos(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();

  let currentPlayer = props.player;
  let otherPlayers = props.otherPlayers;

  return (
    <div className={classes.container}>
      <OtherPlayers otherPlayers={otherPlayers} />

      <div className={classes.playerContainer}>
        <CurrentPlayer player={currentPlayer} />
        {props.currentCard.piece ? (
          <>
            <div className={classes.currentPieceContainer}>
              <CurrentPiece
                gameMod={props.gameMod}
                player={props.player}
                currentCard={props.currentCard}
                selectLand={props.selectLand}
                currentLandSelected={props.currentLandSelected}
                sendRound={props.sendRound}
                resetChoice={props.resetChoice}
                error={props.error}
                handleAlternativ={props.handleAlternativ}
                alternativ={props.alternativ}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  playerContainer: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 20,
    top: 20,
  },
  currentPieceContainer: {
    marginTop: 20,
  },
  error: {
    marginTop: 10,
    height: 10,
    color: "red",
  },
}));
