import React, { useState, useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";

import RuinSvg from "../../../assets/svgr/ruin.js";
import MountainSvg from "../../../assets/svgr/mountain.js";
import DesertSvg from "../../../assets/svgr/desert.js";
import ForestSvg from "../../../assets/svgr/forest.js";
import HouseSvg from "../../../assets/svgr/house.js";
import LakeSvg from "../../../assets/svgr/lake.js";
import FieldSvg from "../../../assets/svgr/field.js";
import MonsterSvg from "../../../assets/svgr/monster.js";

export default function TileMini(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  let history = useHistory();
  let location = useLocation();

  return (
    <div className={`${classes.container}`}> 
      <div
        className={`${classes.tile} ${classes[props.land]}`}
        style={{ width: props.size, height: props.size }}
      >
        {props.ruin && props.land !== "empty" ? (
        <div className={classes.ruinMini}>
          <RuinSvg size={5} mini="true" />
        </div>
      ) : null}

        {props.land === "mountain" ? (
          <MountainSvg
            size={10}
            color={theme.palette.white}
            money={props.money ? 1 : 0}
          />
        ) : null}
        {props.land === "desert" ? (
          <DesertSvg size={10} color={theme.palette.darkBlack} />
        ) : null}
        {props.land === "forest" ? (
          <ForestSvg size={10} color={theme.palette.darkBlack} />
        ) : null}
        {props.land === "house" ? (
          <HouseSvg size={10} color={theme.palette.darkBlack} />
        ) : null}
        {props.land === "lake" ? (
          <LakeSvg size={10} color={theme.palette.darkBlack} />
        ) : null}
        {props.land === "field" ? (
          <FieldSvg size={10} color={theme.palette.darkBlack} />
        ) : null}
        {props.land === "monster" ? (
          <MonsterSvg size={10} color={theme.palette.white} />
        ) : null}
        <div className={classes.ruin}>
          {props.ruin && props.land === "empty" ? (
            <RuinSvg size={10} color={theme.palette.darkBlack} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
  },
  tile: {
    "box-sizing": "border-box",
    "-moz-box-sizing": "border-box",
    "-webkit-box-sizing": "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: `${theme.palette.white}`,
    border: `1px solid ${theme.palette.darkGrey}`,
    transition: `all 0.1s linear`,
  },
  ruinImg: {
    position: "relative",
    top: -10,
  },
}));
