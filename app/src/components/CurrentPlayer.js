import React, { useState, useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Button, Typography } from "@material-ui/core";

import StarSvg from "../../../assets/svgr/star.js";
import CoinSvg from "../../../assets/svgr/coin.js";

export default function CurrentPlayer(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();

  let currentSeason = useSelector((state) => state.room.get("currentSeason"));
  let score = props.player.get("score");

  let starSize = 25;

  return (
    <div className={classes.playerContainer}>
      <div className={classes.pseudo}>
        <Typography variant="h3" gutterBottom color="inherit">
          {props.player.get("pseudo")}
        </Typography>
      </div>

      <div className={classes.scoresContainer}>
        <span className={classes.scoreText}>{score[0]}</span>
        <StarSvg size={starSize} active={currentSeason.id === 0 ? 1 : 0} />
        <span className={classes.scoreText}>{score[1]}</span>
        <StarSvg size={starSize} active={currentSeason.id === 1 ? 1 : 0} />
        <span className={classes.scoreText}>{score[2]}</span>
        <StarSvg size={starSize} active={currentSeason.id === 2 ? 1 : 0} />
        <span className={classes.scoreText}>{score[3]}</span>
        <StarSvg size={starSize} active={currentSeason.id === 3 ? 1 : 0} />
      </div>

      <div className={classes.money}>
        <span className={classes.moneyText}>{props.player.get("money")}</span>
        <CoinSvg size={20} />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  playerContainer: {
    padding: 10,
    width: 200,
    backgroundColor: theme.palette.darkBlack,
    borderRadius: 25,
    color: theme.palette.white,
    "bow-shadow": theme.shadow,
    "-webkit-box-shadow": theme.shadow,
    "-moz-box-shadow": theme.shadow,
  },
  pseudo: {
    textAlign: "center",
  },
  money: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  moneyText: {
    fontSize: "1.5em",
    marginRight: 5,
  },
  scoresContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
