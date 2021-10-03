import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
const axios = require("axios");
const io = require("socket.io-client");

import PropTypes from "prop-types";
import { Button, TextField } from "@material-ui/core";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      email: "",
      password: "",
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
  }

  sendForm(e) {
    const self = this;
    
    let userObj = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post(`http://${process.env.DOMAIN}:${process.env.SERVER_PORT}/`, userObj)
      .then(function (response) {
        if (
          response.data.errors &&
          Object.keys(response.data.errors).length > 0
        ) {
          self.setState({
            errors: response.data.errors,
          });
        } else if (response.data && response.data.success === true) {
          const socket = io(
            `http://${process.env.DOMAIN}:${process.env.SOCKET_PORT}/`,
            {
              reconnectionDelayMax: 10000,
              withCredentials: true,
              extraHeaders: {
                "my-custom-header": "cartographiers",
              },
            }
          );

          // ! TEST WITH MODIFIED TOKEN
          // response.data.user.token = response.data.user.token + "123";

          socket.emit("login", response.data.user);
          socket.on("loginValidation", (response) => {
            if (!response.success) {
              console.log("AUTH SOCKET => ", response.msg);
              self.props.history.push("/");
            } else {
              console.log("AUTH SOCKET => ", response.msg);
              console.log("SOCKET USER => ", response.user);
              self.props.history.push("/lobby");
            }
          });
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
      errors: {},
    });
  }

  render() {
    const { errors } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <TextField
          error={errors.email ? true : false}
          helperText={errors.email ? errors.email : ""}
          required
          id="email"
          label="Email"
          onChange={this.handleChange}
        />

        <TextField
          error={errors.password ? true : false}
          helperText={errors.password ? errors.password : ""}
          id="password"
          autoComplete=""
          label="Password"
          type="password"
          onChange={this.handleChange}
        />

        <div className={classes.button}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              this.sendForm(e);
            }}
          >
            JOUER
          </Button>
        </div>
      </div>
    );
  }
}

const styles = (theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  button: {
    margin: 20,
  },
});

export default withRouter(withStyles(styles, { withTheme: true })(SignIn));
