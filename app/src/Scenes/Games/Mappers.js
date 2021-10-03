import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Socket from "Socket";

import { Button, Typography } from "@material-ui/core";

import { useSocketSub } from "Hooks";

import RuinSvg from "../../../../assets/svgr/ruin.js";

import GameInfos from "Components/GameInfos";
import Tile from "Components/Tile";
import LeaveGameBtn from "Components/LeaveGameBtn";
import EndGame from "Components/EndGame";

// import PlayerInfos from "Components/PlayerInfos";
import Seasons from "Components/Seasons";

export default function Mappers(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  let location = useLocation();

  const [error, setError] = useState(null);
  const [alternativ, setAlternativ] = useState(null);

  useSocketSub();

  useEffect(() => {
    console.log("MAPPERS GAMEBOARD => DID MOUNT !");
  }, []);

  let player = useSelector((state) => state.player);
  let room = useSelector((state) => state.room);
  let players = useSelector((state) => state.room.get("players"));
  let otherPlayers = [];

  let endGame = useSelector((state) => state.room.get("endGame"));

  if (room.get("players")) {
    let playerTemp = [...room.get("players")];
    if (players && players.length > 0) {
      otherPlayers = playerTemp.filter((plr) => {
        return plr.pseudo !== player.get("pseudo");
      });
    }
  }

  const [currentPieceSelected, setCurrentPieceSelected] = useState([]);
  const [currentLandSelected, setcurrentLandSelected] = useState(null);

  const caseSizeInPx = 50;

  const resetChoice = () => {
    setCurrentPieceSelected([]);
    setError(null);
  };

  const handleTileToPiece = (coords) => {
    let newPiece = [...currentPieceSelected];
    let newPieceFinder = [...currentPieceSelected];
    let pieceAlreadyHas = newPieceFinder.find(
      (pieceCoords) => pieceCoords === coords
    );

    if (pieceAlreadyHas) {
      newPiece = newPiece.filter((pieceCoords) => pieceCoords !== coords);
    } else {
      newPiece.push(coords);
    }

    setCurrentPieceSelected(newPiece);
    setError(null);
  };

  const selectLand = (land) => {
    setcurrentLandSelected(land);
    setError(null);
  };

  const handleAlternativ = () => {
    if (alternativ) {
      setAlternativ(null);
    } else {
      setAlternativ({
        shapes: [[[0, 0]]],
        availableLands: ["forest", "house", "field", "lake", "monster"],
      });
    }
  };

  const sendRound = (e) => {
    e.preventDefault();
    console.log("===> SEND ROUND");

    if (room.get("currentCard") && room.get("currentCard").type === "ruin") {
      Socket.emit("roundPlayed", "ruin");
    } else {
      if (room.get("gameMod") === "ruin" && !alternativ) {
        let map = player.get("gameMap");
        let haveRuin = false;

        currentPieceSelected.forEach((bloc, blocIndex) => {
          let splittedBloc = bloc.split(":");
          let y = parseInt(splittedBloc[0]);
          let x = parseInt(splittedBloc[1]);

          if (map[y][x].ruin) {
            haveRuin = true;
          }
        });

        if (!haveRuin) {
          setError(`Non il te faut une ruine !`);
          return;
        }
      }

      if (!currentLandSelected) {
        setError(`Choisir une land tu devras`);
        return;
      }

      let isCurrentPieceSelectedValid = comparePieces();
      if (isCurrentPieceSelectedValid === false) {
        setError(`Ce n'est pas la bonne forme Michel !`);
        return;
      }

      if (isCurrentPieceSelectedValid !== false && currentLandSelected) {
        let currentRoundPieces = room.get("currentCard").piece.shapes;
        let indexPiece =
          currentRoundPieces.length >= 2 ? isCurrentPieceSelectedValid : false;

        let playerRoundChoice = {
          shape: currentPieceSelected,
          land: currentLandSelected,
          indexPiece,
        };

        resetChoice();
        setcurrentLandSelected(null);
        if (alternativ) {
          setAlternativ(null);
        }

        Socket.emit("roundPlayed", playerRoundChoice);
      }
    }
  };

  const comparePieces = () => {
    let index = false;

    let currentRoundPieces = alternativ
      ? alternativ.shapes
      : room.get("currentCard").piece.shapes;

    currentRoundPieces.forEach((currentRoundPiece, pieceIndex) => {
      currentRoundPiece = orderPieceCoords(currentRoundPiece);

      if (!index) {
        let sizeX = 0;
        let sizeY = 0;

        currentRoundPiece.forEach((bloc) => {
          let x = parseInt(bloc[0]);
          let y = parseInt(bloc[1]);
          if (x > sizeX) {
            sizeX = x;
          }
          if (y > sizeY) {
            sizeY = y;
          }
        });

        let currentPieceSelectedToTest = [...currentPieceSelected];

        let selectedPieceXmin = 1000;
        let selectedPieceYmin = 1000;
        currentPieceSelectedToTest.forEach((bloc) => {
          let splittedBloc = bloc.split(":");
          let x = parseInt(splittedBloc[0]);
          let y = parseInt(splittedBloc[1]);

          if (x < selectedPieceXmin) {
            selectedPieceXmin = x;
          }
          if (y < selectedPieceYmin) {
            selectedPieceYmin = y;
          }
        });

        let newBasePiece = [];

        currentPieceSelectedToTest.forEach((bloc) => {
          let splittedBloc = bloc.split(":");
          let x = parseInt(splittedBloc[0]);
          let y = parseInt(splittedBloc[1]);

          newBasePiece.push([x - selectedPieceXmin, y - selectedPieceYmin]);
        });

        newBasePiece = orderPieceCoords(newBasePiece);

        for (var p = 0; p < 4; p++) {
          newBasePiece = rotate(newBasePiece, 90);
          newBasePiece = normalizePieceOrigin(newBasePiece);
          newBasePiece = orderPieceCoords(newBasePiece);
          if (
            JSON.stringify(newBasePiece) === JSON.stringify(currentRoundPiece)
          ) {
            index = pieceIndex;
            break;
          }
        }
        newBasePiece = flip(newBasePiece);
        for (var p = 0; p < 4; p++) {
          newBasePiece = rotate(newBasePiece, 90);
          newBasePiece = normalizePieceOrigin(newBasePiece);
          newBasePiece = orderPieceCoords(newBasePiece);
          if (
            JSON.stringify(newBasePiece) === JSON.stringify(currentRoundPiece)
          ) {
            index = pieceIndex;
            break;
          }
        }
      }
    });

    return index;
  };

  const flip = (array) => {
    let maxX = 0;

    array.forEach((tile) => {
      let x = parseInt(tile[1]);
      if (x > maxX) {
        maxX = x;
      }
    });

    let newShape = [];

    array.forEach((tile) => {
      let y = parseInt(tile[0]);
      let x = parseInt(tile[1]);

      if (maxX === 0) {
        newShape.push([y, x]);
      }

      if (maxX === 1) {
        if (x === 0) {
          newShape.push([y, 1]);
        }
        if (x === 1) {
          newShape.push([y, 0]);
        }
      }

      if (maxX === 2) {
        if (x === 0) {
          newShape.push([y, 2]);
        }
        if (x === 1) {
          newShape.push([y, 1]);
        }
        if (x === 2) {
          newShape.push([y, 0]);
        }
      }

      if (maxX === 3) {
        if (x === 0) {
          newShape.push([y, 3]);
        }
        if (x === 1) {
          newShape.push([y, 2]);
        }
        if (x === 2) {
          newShape.push([y, 1]);
        }
        if (x === 3) {
          newShape.push([y, 0]);
        }
      }
    });

    newShape = orderPieceCoords(newShape);
    return newShape;
  };

  const normalizePieceOrigin = (array) => {
    let xMin = 0;
    let yMin = 0;

    array.forEach((bloc) => {
      let x = parseInt(bloc[0]);
      let y = parseInt(bloc[1]);
      if (x < -xMin) {
        xMin = Math.abs(x);
      }
      if (y < -yMin) {
        yMin = Math.abs(y);
      }
    });

    if (xMin > 0) {
      array.forEach((bloc) => {
        bloc[0] = parseInt(bloc[0]) + parseInt(xMin);
      });
    }
    if (yMin > 0) {
      array.forEach((bloc) => {
        bloc[1] = parseInt(bloc[1]) + parseInt(yMin);
      });
    }
    return array;
  };

  const orderPieceCoords = (array) => {
    array.sort((a, b) => {
      let yA = parseInt(a[1]);
      let yB = parseInt(b[1]);

      if (yA > yB) {
        return 1;
      }
      if (yA < yB) {
        return -1;
      }
      return 0;
    });

    array.sort((a, b) => {
      let yA = parseInt(a[1]);
      let yB = parseInt(b[1]);

      let xA = parseInt(a[0]);
      let xB = parseInt(b[0]);

      if (xA > xB && yA === yB) {
        return 1;
      }
      if (xA < xB && yA === yB) {
        return -1;
      }
      return 0;
    });

    return array;
  };

  const rotate = (array, angle) => {
    return array.map(function (p) {
      function r2d(a) {
        return (a * Math.PI) / 180;
      }
      return [
        Math.round(Math.cos(r2d(angle)) * p[0] - Math.sin(r2d(angle)) * p[1]),
        Math.round(Math.sin(r2d(angle)) * p[0] - Math.cos(r2d(angle)) * p[1]),
      ];
    });
  };

  const renderTiles = () => {
    let map = player.get("gameMap");

    let tiles = [];

    for (var i = 0; i < map.length; i++) {
      let row = [];
      for (var j = 0; j < map.length; j++) {
        let isLocked = map[i][j].locked ? map[i][j].locked : false;
        row.push(
          <Tile
            key={`${i}${j}${isLocked}${map[i][j].l}tdile`}
            className={classes.tile}
            position={map[i][j].position}
            ruin={map[i][j].ruin}
            land={map[i][j].land}
            money={map[i][j].money}
            locked={isLocked}
            selected={currentPieceSelected.includes(`${i}:${j}`)}
            handleTileToPiece={handleTileToPiece}
            size={parseInt(caseSizeInPx)}
            currentLandSelected={currentLandSelected}
            player={player}
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
      <LeaveGameBtn />
      {endGame ? (
        <div className={classes.endGameContainer}>
          <EndGame />
        </div>
      ) : null}
      {room.get("currentCard") && room.get("currentCard").type === "ruin" ? (
        <div className={classes.ruinModal}>
          <RuinSvg size={200} color={theme.palette.white} />
          <div className={classes.ruinText}>
            <div className={classes.ruinTitle}>RUINE</div>
            Place la prochaine zone sur une ou des ruines.
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={sendRound}
            // disabled={false}
          >
            OK
          </Button>
        </div>
      ) : null}
      <>
        {player.get("gameMap") ? (
          <div className={classes.gameUiContainer}>
            <Seasons />
            <div className={classes.gameContainer}>
              {room.get("currentCard") ? (
                <GameInfos
                  gameMod={room.get("gameMod")}
                  currentCard={room.get("currentCard")}
                  currentSeason={room.get("currentSeason")}
                  currentDuration={room.get("currentDuration")}
                  selectLand={selectLand}
                  currentLandSelected={currentLandSelected}
                  sendRound={sendRound}
                  error={error}
                  resetChoice={resetChoice}
                  player={player}
                  otherPlayers={otherPlayers}
                  handleAlternativ={handleAlternativ}
                  alternativ={alternativ}
                />
              ) : null}
              <div className={classes.mapContainer}>{renderTiles()}</div>
            </div>
          </div>
        ) : (
          <>
            <div className={classes.loadingModal}>LOADING</div>
          </>
        )}
      </>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  ruinModal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 4,
    color: theme.palette.white,
    backgroundColor: `rgba(0,0,0,0.95)`,
  },
  ruinTitle: {
    fontWeight: 800,
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
  ruinText: {
    textAlign: "center",
    maxWidth: 300,
    marginTop: 0,
    marginBottom: 30,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  gameContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
  },
  mapContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "bow-shadow": theme.shadow,
    "-webkit-box-shadow": theme.shadow,
    "-moz-box-shadow": theme.shadow,
  },
  pieceContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tileCurrentPiece: {
    "box-sizing": "border-box",
    "-moz-box-sizing": "border-box",
    "-webkit-box-sizing": "border-box",
    width: 30,
    height: 30,
    backgroundColor: "red",
    border: "1px solid black",
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
  },
  gameUiContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loadingModal: {
    zIndex: 50,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: "absolute",
    backgroundColor: theme.palette.darkBlack,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontWeight: 800,
    fontSize: 25,
    color: theme.palette.white,
  },
  loaderContainer: {
    padding: 30,
  },
}));
