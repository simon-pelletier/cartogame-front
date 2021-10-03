import React, { useState, useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Button, Typography } from "@material-ui/core";

import TimerSvg from "../../../assets/svgr/timer.js";
import CheckSvg from "../../../assets/svgr/check.js";
import StarSvg from "../../../assets/svgr/star.js";
import CoinSvg from "../../../assets/svgr/coin.js";

import TileMini from "./TileMini";

export default function OtherPlayers(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();

  let otherPlayers = props.otherPlayers;

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
            ruin={map[i][j].ruin}
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
      <div className={classes.playersStatsContainer}>
        {otherPlayers.map((player) => {
          return (
            <div
              key={player.pseudo}
              className={classes.otherPlayer}
              style={{
                backgroundColor: player.connected
                  ? `${theme.palette.white}`
                  : `${theme.palette.danger}`,
              }}
            >
              <div
                className={classes.isReady}
              >
                {!player.roundReady ? (
                  <TimerSvg size={25} />
                ) : (
                  <CheckSvg size={25} />
                )}
              </div>

              <div className={classes.pseudo}>{player.pseudo}</div>
              <div className={classes.score}>
                {`${player.score[0]}`}
                <StarSvg size={15} />
                {`${player.score[1]}`}
                <StarSvg size={15} />
                {`${player.score[2]}`}
                <StarSvg size={15} />
                {`${player.score[3]}`}
                <StarSvg size={15} />
              </div>
              <div className={classes.money}>
                {`${player.money}`}
                <CoinSvg size={15} />
              </div>
              <div className={classes.mapContainer}>
                {renderTiles(player.gameMap)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  playersStatsContainer: {
    position: "absolute",
    top: 80,
    right: 20,
  },
  isReady: {
    position: "absolute",
    top: 0,
    right: 15,
    width: 20,
    height: 20,
    borderRadius: theme.shape.borderRadius,
  },
  otherPlayer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    // marginTop:100,
    // margin: 10,
    "bow-shadow": theme.shadow,
    "-webkit-box-shadow": theme.shadow,
    "-moz-box-shadow": theme.shadow,
  },
  mapContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  pseudo: {
    fontWeight: 800,
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  score: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  money: {
    // fontSize: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
}));
