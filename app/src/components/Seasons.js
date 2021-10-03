import React, { useState, useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Button, Typography } from "@material-ui/core";

import StarSvg from "../../../assets/svgr/star.js";
import TimerSvg from "../../../assets/svgr/timer.js";

import SpringSvg from "../../../assets/svgr/spring.js";
import SummerSvg from "../../../assets/svgr/summer.js";
import AutumnSvg from "../../../assets/svgr/autumn.js";
import WinterSvg from "../../../assets/svgr/winter.js";

import Goals from "./Goals";

export default function Seasons(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();

  const [goalDetails, setGoalDetails] = useState("");

  let seasons = useSelector((state) => state.room.get("seasons"));
  let currentSeason = useSelector((state) => state.room.get("currentSeason"));
  let currentDuration = useSelector((state) =>
    state.room.get("currentDuration")
  );

  const displayGoalDetails = (e, innerText) => {
    e.preventDefault();
    setGoalDetails(innerText);
  };

  const clearGoalDetails = (e) => {
    e.preventDefault();
    setGoalDetails("");
  };

  const renderPoints = (points) => {
    let starArray = [];

    for (var i = 0; i < points; i++) {
      starArray.push(<StarSvg key={`${i}star`} size={30} />);
    }

    return starArray;
  };

  return (
    <div className={classes.container} onMouseLeave={clearGoalDetails}>
      {seasons &&
        seasons.map((season) => {
          return (
            <div
              className={`${classes.season} ${
                currentSeason.id === season.id ? classes.currentSeason : ""
              }`}
              key={season.id}
            >
              <div className={classes.goalsContainer}>
                <Goals
                  goals={season.goals}
                  displayGoalDetails={displayGoalDetails}
                />
              </div>

              <div className={classes.goalDetail}></div>

              <div className={classes.seasonsContainer}>
                <Typography variant="h5" gutterBottom color="primary">
                  {season.name === "Printemps" ? (
                    <SpringSvg
                      size={50}
                      active={currentSeason.id === season.id ? 1 : 0}
                    />
                  ) : null}
                  {season.name === "Eté" ? (
                    <SummerSvg
                      size={50}
                      active={currentSeason.id === season.id ? 1 : 0}
                    />
                  ) : null}
                  {season.name === "Automne" ? (
                    <AutumnSvg
                      size={50}
                      active={currentSeason.id === season.id ? 1 : 0}
                    />
                  ) : null}
                  {season.name === "Hiver" ? (
                    <WinterSvg
                      size={50}
                      active={currentSeason.id === season.id ? 1 : 0}
                    />
                  ) : null}
                </Typography>
                <div className={classes.timerContainer}>
                  <Typography variant="h5" color="primary">
                    {currentSeason.id === season.id
                      ? `${currentDuration} / ${season.duration}`
                      : `${season.duration}`}
                  </Typography>
                  <TimerSvg size={25} />
                </div>
              </div>
            </div>
          );
        })}
      {goalDetails !== "" ? (
        <div className={`${classes.goalRulesContainer}`}>
          {goalDetails.map((rule, indexRule) => {
            return (
              <span
                key={`${indexRule}`}
                className={`${classes.goalRuleContainer}`}
              >
                <div className={classes.description}>{rule.description}</div>
                <div className={classes.points}>
                  {renderPoints(rule.points)}
                </div>
              </span>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  timerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: `${theme.palette.white}`,
    borderRadius: `0px 0px 50px 50px`,
    top: -130,
    zIndex: 10,
    transition: `all 0.3s linear`,
    "&:hover": {
      top: 0,
    },
    "bow-shadow": theme.shadow,
    "-webkit-box-shadow": theme.shadow,
    "-moz-box-shadow": theme.shadow,
  },
  season: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    margin: 10,
    padding: 10,
    width: "100%",
  },
  seasonsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 120,
    bottom: 0,
    marginTop: 20
  },
  goalsContainer: {
    display: "flex",
    height: 100,
    flexDirection: "column",
    alignItems: "space-between",
    justifyContent: "center",
    
  },
  currentSeason: {
  },
  goalDetail: {
    position: "absolute",
    // backgroundColor: "red",
  },
  goalRulesContainer: {
    position: "absolute",
    backgroundColor: theme.palette.white,
    borderRadius: 50,
    marginTop:20,
    top: "100%",
    padding: 50,
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "bow-shadow": theme.shadow,
    "-webkit-box-shadow": theme.shadow,
    "-moz-box-shadow": theme.shadow,
  },
  goalRuleContainer: {
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    marginBottom: 5,
  },
  points: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
}));
