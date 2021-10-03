import React from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, TextField } from "@material-ui/core";

const PublicLayout = ({ component: Component, ...rest }) => {
  const { path, classes, width, history, location, children, theme } = rest;

  return (
    <div className={classes.contentContainer}>
      {children}
    </div>
  );
};

const styles = (theme) => ({
  "@global": {
    body: {
      fontFamily: theme.typography.fontFamily,
      top: 0,
      padding: 0,
      margin: 0,
      width: "100vw",
      height: "100vh",
      overflowX: "hidden",
      backgroundColor: theme.palette.common.white,
    },
    "*::-webkit-scrollbar-track": {
      display: "none",
    },

    "*::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "8px",
    },

    "*::-webkit-scrollbar-thumb:hover": {
      backgroundColor: theme.palette.primary.light,
      borderRadius: "8px",
    },

    "*::-webkit-scrollbar": {
      width: "10px",
    },
  },
  
  contentContainer: {
    top: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    margin: "0px",
    padding: "0px",
    backgroundColor: theme.palette.background,
  },
  
});

export default withRouter(
  withStyles(styles, { withTheme: true })(PublicLayout)
);
