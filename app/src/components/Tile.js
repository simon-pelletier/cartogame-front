import React, { useState, useEffect, useRef } from "react";
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

export default function Tile(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  let history = useHistory();
  let location = useLocation();

  const ruinLottieRef = useRef();
  if (ruinLottieRef.current) {
    ruinLottieRef.current.setSpeed(0.5);
  }

  let room = useSelector((state) => state.room);

  let positionCoords = props.position.split(":");
  const x = parseInt(positionCoords[0]);
  const y = parseInt(positionCoords[1]);

  const handlePlace = (e) => {
    e.preventDefault();

    let locked = false;
    if (props.player.roundReady || props.locked) {
      locked = true;
    }

    if (locked) {
      console.log(
        `Et non ! Tu as joué et validé Michel, c'est moche mais c'est fini pour toi ici !`
      );
      return;
    }

    if (room.get("gameMod") === "ruin") {
      if (props.land !== "mountain" && props.land !== "desert") {
        props.handleTileToPiece(`${x}:${y}`);
      } else {
        console.log(
          "On ne peut pas sur la montagne Fry ! C'est une montagne..."
        );
      }
    } else {
      if (
        props.land !== "mountain" &&
        props.ruin !== true &&
        props.land !== "desert"
      ) {
        props.handleTileToPiece(`${x}:${y}`);
      } else {
        console.log(
          "On ne peut pas sur la montagne Fry ! C'est une montagne..."
        );
      }
    }
  };

  return (
    <div
      className={`${classes.container} ${
        props.selected && !props.player.get("roundReady")
          ? classes.selected
          : ""
      }`}
      onClick={
        !props.locked || !props.player.get("roundReady")
          ? handlePlace
          : () => {}
      }
    >
      {props.ruin && props.land !== "empty" ? (
        <div className={classes.ruinMini}>
          <RuinSvg size={20} mini="true" />
        </div>
      ) : null}

      <div className={classes.tileContainer}>
        {props.land === "mountain" ? (
          <MountainSvg size={50} color={theme.palette.white} money={props.money ? 1 : 0}/>
        ) : null}
        {props.land === "desert" ? (
          <DesertSvg size={50} color={theme.palette.darkBlack} />
        ) : null}
        {props.land === "forest" ||
        (props.currentLandSelected === "forest" && props.selected) ? (
          <ForestSvg size={50} color={theme.palette.darkBlack} />
        ) : null}
        {props.land === "house" ||
        (props.currentLandSelected === "house" && props.selected) ? (
          <HouseSvg size={50} color={theme.palette.darkBlack} />
        ) : null}
        {props.land === "lake" ||
        (props.currentLandSelected === "lake" && props.selected) ? (
          <LakeSvg size={50} color={theme.palette.darkBlack} />
        ) : null}
        {props.land === "field" ||
        (props.currentLandSelected === "field" && props.selected) ? (
          <FieldSvg size={50} color={theme.palette.darkBlack} />
        ) : null}
        {props.land === "monster" ||
        (props.currentLandSelected === "monster" && props.selected) ? (
          <MonsterSvg size={50} color={theme.palette.white} />
        ) : null}

        <div className={classes.ruin}>
          {props.ruin && props.land === "empty" ? (
            <RuinSvg size={50} color={theme.palette.darkBlack} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: (props) => props.size,
    height: (props) => props.size,
    cursor: (props) =>
      props.player.get("roundReady") ? `not-allowed` : "pointer",
    zIndex: 20,
    border: `1px solid ${theme.palette.darkBlack}`,
    transition: `all 0.3s linear`,
    backgroundColor: `${theme.palette.white}`,
    "&:hover": {
      backgroundColor: (props) =>
        props.player.get("roundReady") ? `#dbdbdb` : theme.palette.primary.main,
      transition: `all 0.3s linear`,
    },
  },
  selected: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  tileContainer: {
    zIndex: 0,
  },
  ruinMini: {
    zIndex: 1,
  },
}));
