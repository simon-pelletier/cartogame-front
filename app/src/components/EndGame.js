import React, { useState, useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Button, Typography } from "@material-ui/core";

import TileMini from "./TileMini";

export default function EndGame(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();

  let players = useSelector((state) => state.room.get("players"));
  let seasons = useSelector((state) => state.room.get("seasons"));
  let playersSorted = players.sort((a, b) =>
    a.totalScore < b.totalScore ? 1 : b.totalScore < a.totalScore ? -1 : 0
  );

  const renderTiles = (gameMap) => {
    let map = gameMap;

    let tiles = [];

    for (var i = 0; i < map.length; i++) {
      let row = [];
      for (var j = 0; j < map.length; j++) {
        let isLocked = map[i][j].locked ? map[i][j].locked : false;
        row.push(
          <TileMini
            key={`${i}${j}${isLocked}${map[i][j].l}tdile`}
            className={classes.tile}
            position={map[i][j].position}
            land={map[i][j].land}
            size={parseInt(10)}
          />
        );
      }
      tiles.push(
        <div key={`${i}-row`} className={classes.row}>
          {row}
        </div>
      );
    }

    return tiles;
  };

  return (
    <div className={classes.container}>
      {playersSorted.map((player, playerIndex) => {
        return (
          <div className={classes.playerContainer} key={player.pseudo}>
            <div className={classes.infos}>
              <div className={classes.place}>{playerIndex + 1}</div>
              <div className={classes.pseudo}>{player.pseudo}</div>
              <div className={classes.totalScore}>
                Total score : {player.totalScore}
              </div>
              <div className={classes.money}>Money : {player.money}</div>

              <div className={classes.scores}>
                {player.score.map((seasonScore, seasonIndex) => {
                  return (
                    <div
                      className={classes.scoreContainer}
                      key={`${seasonIndex}${playerIndex}scoreEnd`}
                    >
                      {`${seasons[seasonIndex].name} : ${seasonScore}`}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={classes.map}>
              <div className={classes.mapContainer}>
                {renderTiles(player.gameMap)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 5,
    backgroundColor: `rgba(0,0,0,0.8)`,
  },
  playerContainer: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    margin: 20,
  },
  infos: {
    padding: 20,
  },
  map: {
    padding: 20,
  },
  mapContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  pseudo: {
    fontWeight: 800,
  },
  scores: {
    marginTop: 10,
  },
}));
