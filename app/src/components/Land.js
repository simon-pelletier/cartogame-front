import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import RuinSvg from "../../../assets/svgr/ruin.js";
import MountainSvg from "../../../assets/svgr/mountain.js";
import DesertSvg from "../../../assets/svgr/desert.js";
import ForestSvg from "../../../assets/svgr/forest.js";
import HouseSvg from "../../../assets/svgr/house.js";
import LakeSvg from "../../../assets/svgr/lake.js";
import FieldSvg from "../../../assets/svgr/field.js";
import MonsterSvg from "../../../assets/svgr/monster.js";

export default function Land(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  let history = useHistory();
  let location = useLocation();

  return (
    <div
      className={`${classes.container} ${classes[props.land]}`}
      style={{ width: props.size, height: props.size }}
    >
      <div
        className={`${classes.tile} ${
          props.currentLandSelected === props.land ? classes.selected : ""
        }`}
        id={props.land}
        onClick={props.player.get("roundReady") || props.disabled ? () => {} : () => {props.selectLand(props.land)}}
        style={{ width: 50, height: 50 }}
      >
        {props.land === "mountain" ? (
          <MountainSvg size={50} color={theme.palette.white} />
        ) : null}
        {props.land === "desert" ? (
          <DesertSvg size={50} color={theme.palette.darkBlack} />
        ) : null}

        {props.land === "forest" ? (
          <ForestSvg size={50} color={theme.palette.darkBlack} />
        ) : null}
        {props.land === "house" ? (
          <HouseSvg size={50} color={theme.palette.darkBlack} />
        ) : null}
        {props.land === "lake" ? (
          <LakeSvg size={50} color={theme.palette.darkBlack} />
        ) : null}
        {props.land === "field" ? (
          <FieldSvg size={50} color={theme.palette.darkBlack} />
        ) : null}
        {props.land === "monster" ? (
          <MonsterSvg size={50} color={theme.palette.white} />
        ) : null}
        {props.ruin ? (
          <RuinSvg size={50} color={theme.palette.darkBlack} />
        ) : null}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  tile: {
    "box-sizing": "border-box",
    "-moz-box-sizing": "border-box",
    "-webkit-box-sizing": "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    border: (props) =>
      props.player.get("roundReady") ? "0px solid white" : `1px solid white`,
    cursor: (props) =>
      props.player.get("roundReady") ? `not-allowed` : "pointer",
    transition: `all 0.1s linear`,
    "&:hover": {
      border: (props) =>
        props.player.get("roundReady") ? "none" : `5px solid red`,
      transition: `all 0.1s linear`,
    },
  },
  empty: {
    backgroundColor: "#dbdbdb",
  },
  selected: {
    border: `5px solid pink`,
  },
}));
