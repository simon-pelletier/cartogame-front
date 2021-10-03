import React, { useState, useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";

import { Button, Typography } from "@material-ui/core";

import Land from "./Land";
import CoinSvg from "../../../assets/svgr/coin.js";
import TimerSvg from "../../../assets/svgr/timer.js";

import RuinSvg from "../../../assets/svgr/ruin.js";

export default function CurrentPiece(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  let location = useLocation();

  const [nextCard, setNextCard] = useState(false);

  // useEffect(() => {
  //   if (props.currentCard.piece) {
  //     props.selectLand(props.currentCard.piece.availableLands[0]);
  //   }
  // }, [props.currentCard.id, props.alternativ]);

  useEffect(() => {
    console.log("CARD CHANGE *************************");
    setNextCard(true);
    setTimeout(() => {
      setNextCard(false);
    }, 3000);
  }, [props.currentCard.id]);

  console.log("--------------RENDER");

  const pieceRender = () => {
    let pieces = [];
    //! Ajouter un vérificateur de possibilités !
    //! Si la forme ne PEUT pas entrer sur les cases vides de la map : on propose une carte alternative : 1 case unique avec toutes les lands

    if (props.currentCard.piece) {
      let currentRoundPieces = props.alternativ
        ? props.alternativ.shapes
        : props.currentCard.piece.shapes;

      currentRoundPieces.forEach((currentRoundPiece, pieceIndex) => {
        let sizeX = 0;
        let sizeY = 0;

        currentRoundPiece.forEach((bloc) => {
          let y = parseInt(bloc[0]);
          let x = parseInt(bloc[1]);
          if (x > sizeX) {
            sizeX = x;
          }
          if (y > sizeY) {
            sizeY = y;
          }
        });

        let pieceToPush = [];

        for (var i = 0; i <= sizeY; i++) {
          let newRow = [];
          for (var j = 0; j <= sizeX; j++) {
            let empty = true;
            currentRoundPiece.forEach((bloc) => {
              let y = parseInt(bloc[0]);
              let x = parseInt(bloc[1]);

              if (x === j && y === i) {
                empty = false;
                newRow.push(
                  <div
                    key={`${i}${j}${pieceIndex}-currentPieceTile`}
                    className={`${classes.tileCurrentPiece}`}
                  ></div>
                );
              }
            });
            if (empty) {
              newRow.push(
                <div
                  key={`${i}${j}${pieceIndex}-currentPieceTile`}
                  className={`${classes.tileCurrentPieceEmpty}`}
                ></div>
              );
            }
          }
          pieceToPush.push(
            <div
              key={`${i}${pieceIndex}-currentPieceRow`}
              className={classes.rowCurrentPiece}
            >
              {newRow}
            </div>
          );
        }
        pieces.push(
          <div
            className={classes.pieceToSelectContainer}
            key={`${pieceIndex}-pieceContainer`}
          >
            <div className={classes.pieceOnlyContainer}>{pieceToPush}</div>
            {currentRoundPieces.length > 1 && pieceIndex === 0 ? (
              <div className={classes.moneyBonus}>
                + <CoinSvg size={15} />
              </div>
            ) : null}
          </div>
        );

        if (currentRoundPieces.length > 1 && pieceIndex === 0) {
          pieces.push(
            <div key={"separator"} className={classes.pieceSeparator}></div>
          );
        }
      });
    }

    return pieces;
  };

  const landsRender = () => {
    let lands = [];

    if (props.currentCard.piece) {
      const availableLands = props.alternativ
        ? props.alternativ.availableLands
        : props.currentCard.piece.availableLands;

      for (var i = 0; i < availableLands.length; i++) {
        lands.push(
          <Land
            key={`${i}-availableLand`}
            player={props.player}
            land={availableLands[i]}
            selectLand={props.selectLand}
            currentLandSelected={props.currentLandSelected}
            disabled={nextCard ? 1 : 0}
          />
        );
      }
    }

    return lands;
  };

  let disabled = true;
  if (props.player) {
    disabled = props.player.get("roundReady");
  }
  
  return (
    <div className={classes.container}>
      {nextCard ? (
        <div className={classes.modalContainer}>
          <div className={classes.pieceContainer}>{pieceRender()}</div>
          <div className={classes.landsContainer}>{landsRender()}</div>
        </div>
      ) : null}

      <div className={classes.pieceContainer}>{pieceRender()}</div>
      <div className={classes.landsContainer}>{landsRender()}</div>
      {props.gameMod === "ruin" ? (
        <div className={classes.ruinModWitness}>
          <RuinSvg size={50} color={theme.palette.white} />
        </div>
      ) : null}
      <div className={classes.timerContainer}>
        <Typography variant="h5" color="primary">
          {props.currentCard.duration}
        </Typography>
        <TimerSvg size={25} />
      </div>
      <div className={classes.buttonsContainer}>
        <div className={classes.button}>
          <Button
            variant="contained"
            // color="danger"
            onClick={props.resetChoice}
            disabled={disabled}
          >
            EFFACER
          </Button>
        </div>

        <div className={classes.button}>
          <Button
            variant="contained"
            onClick={props.handleAlternativ}
            disabled={disabled}
          >
            {props.alternativ ? `RETOUR` : `IMPOSSIBLE`}
          </Button>
        </div>

        {props.error ? (
          <div className={classes.error}>{props.error}</div>
        ) : null}

        <div className={classes.button}>
          <Button
            variant="contained"
            color="primary"
            onClick={props.sendRound}
            disabled={disabled}
          >
            VALIDER
          </Button>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -20,
    left: -20,
    width: "100vw",
    height: "100vh",

    zIndex: 6,
    color: theme.palette.white,
    backgroundColor: `rgba(0,0,0,0.95)`,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 10,
  },
  timerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: 10,
    width: 200,
    backgroundColor: theme.palette.darkBlack,
    borderRadius: 25,
    color: theme.palette.white,
    "bow-shadow": theme.shadow,
    "-webkit-box-shadow": theme.shadow,
    "-moz-box-shadow": theme.shadow,
  },
  ruinModWitness: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pieceContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
  tileCurrentPiece: {
    "box-sizing": "border-box",
    "-moz-box-sizing": "border-box",
    "-webkit-box-sizing": "border-box",
    width: 30,
    height: 30,
    backgroundColor: "grey",
    border: "2px solid black",
  },
  tileCurrentPieceEmpty: {
    "box-sizing": "border-box",
    "-moz-box-sizing": "border-box",
    "-webkit-box-sizing": "border-box",
    width: 30,
    height: 30,
  },
  rowCurrentPiece: {},
  landsContainer: {
    "box-sizing": "border-box",
    "-moz-box-sizing": "border-box",
    "-webkit-box-sizing": "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: 200,
  },
  pieceToSelectContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  pieceOnlyContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  moneyBonus: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    fontWeight: 800,
    fontSize: 20,
  },
  pieceSeparator: {
    marginLeft: 5,
    marginRight: 5,
    width: 2,
    height: 100,
    backgroundColor: theme.palette.white,
  },
  error: {
    marginTop: 5,
    marginBottom: 5,
    color: theme.palette.danger,
  },
}));
