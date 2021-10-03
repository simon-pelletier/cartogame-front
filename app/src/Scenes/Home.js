import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import { Typography, Button, TextField } from "@material-ui/core";

import Socket from "Socket";

import { useSocketSub } from "Hooks";

import DoneIcon from "@material-ui/icons/Done";

import Header from "Components/Header";

export default function Home(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();

  const [pseudo, setPseudo] = useState("");
  const [errors, setErrors] = useState(null);

  useSocketSub();

  useEffect(() => {
    console.log("HOME => DID MOUNT !");

    Socket.on("loginReturn", (res) => {
      console.log("<=== LOGIN SUBMIT RETURN <=== ", res.success);

      if (res.success) {
        history.push("/lobby");
      } else {
        console.log("ERROR : ", res);
      }
    });

    return function cleanup() {
      Socket.off("loginReturn");
    };
  }, []);

  const sendForm = (e) => {
    e.preventDefault();

    if (pseudo === "") {
      setErrors({ pseudo: "Il faut entrer un pseudo Michel !" });
      return;
    }

    if (pseudo.length > 15) {
      setErrors({
        pseudo: `C'est bien trop long pour toi ça Michel ! C'est 15 char. max tu l'auras bien cherché !`,
      });
      return;
    }

    Socket.emit("loginSubmit", pseudo);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setPseudo(e.target.value);
    if (errors) {
      setErrors(null);
    }
  };

  //◉෴۞

  return (
    <div className={classes.container}>
      <Header />

      {pseudo !== "" ? (
        <>
          <div className={classes.pseudoContainer}>▪■ {pseudo} ■▪</div>
        </>
      ) : null}

      <form onSubmit={sendForm} className={classes.formContainer}>
        <TextField
          inputProps={{ className: classes.input }}
          error={errors ? true : false}
          helperText={errors ? errors.pseudo : ""}
          name="pseudo"
          autoComplete=""
          label="Pseudo"
          onChange={handleChange}
        />

        <div className={classes.button}>
          <Button variant="contained" color="primary" onClick={sendForm}>
            <DoneIcon className={classes.iconBtn} />
            CONNEXION
          </Button>
        </div>
      </form>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 200,
    height: "100%",
  },
  pseudoContainer: {
    color: `#FFFFFF`,
    fontSize: 50,
    textShadow:
      "0 1px 0 #CCCCCC, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)",
  },
  // pseudoContainer: {
  //   fontSize: 50,
  //   textAlign: "center",
  //   height: 50,
  //   lineHeight: 50,
  //   color: "#fcedd8",
  //   // background: '#d52e3f',
  //   fontWeight: 700,
  //   textShadow:
  //     "5px 5px 0px #eb452b, 10px 10px 0px #efa032, 15px 15px 0px #46b59b, 20px 20px 0px #017e7f, 25px 25px 0px #052939, 30px 30px 0px #c11a2b, 35px 35px 0px #c11a2b, 40px 40px 0px #c11a2b, 45px 45px 0px #c11a2b",
  // },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: 50,
  },
  button: { margin: 50 },
  iconBtn: {
    marginRight: 10,
  },
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background} inset`,
    },
  },
}));
