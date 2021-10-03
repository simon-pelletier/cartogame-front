import React, { Component } from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
const axios = require("axios");

import PropTypes from "prop-types";
import { Button, TextField } from "@material-ui/core";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      email: "",
      password: "",
      passwordConfirm: "",
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
  }

  sendForm(e) {
    const self = this;

    let userObj = {
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };

    axios
      .post(
        `http://${process.env.DOMAIN}:${process.env.SERVER_PORT}/register`,
        userObj
      )
      .then(function (response) {
        if (
          response.data.errors &&
          Object.keys(response.data.errors).length > 0
        ) {
          self.setState({
            errors: response.data.errors,
          });
        } else if (response.data && response.data.success === true) {
          // console.log("CONNECTION & REDIRECTION !", response.data);
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
          id="newEmail"
          label="NewEmail"
          onChange={this.handleChange}
        />

        <TextField
          error={errors.password ? true : false}
          helperText={errors.password ? errors.password : ""}
          id="newPassword"
          label="NewPassword"
          type="newPassword"
          onChange={this.handleChange}
        />
        <TextField
          error={errors.passwordConfirm ? true : false}
          helperText={errors.passwordConfirm ? errors.passwordConfirm : ""}
          id="passwordConfirm"
          label="PasswordConfirm"
          type="passwordConfirm"
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
            S'INSCRIRE
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

export default withStyles(styles, { withTheme: true })(SignUp);
