import React, { useState, useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Button, Typography } from "@material-ui/core";

export default function Goals(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();

  return (
    <div className={classes.container}>
      {props.goals.map((goal, indexGoal) => {
        return (
          <div key={`${indexGoal}`} className={classes.goalContainer} onClick={(e) => {
            props.displayGoalDetails(e, goal.rules);
          }}>
            <div className={classes.goalTitle}>{goal.title}</div>
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
  },
  goalContainer: {
    backgroundColor: theme.palette.darkBlack,
    color: theme.palette.white,
    borderRadius: 25,
    padding: 10,
    margin: 5,
    width: "100%",
    cursor: "pointer",
    position: "relative",
  },
  goalTitle: {
    textAlign: "center",
  },
}));
