import { createMuiTheme } from "@material-ui/core/styles";
import { responsiveFontSizes } from "@material-ui/core/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import "typeface-lato";

const breakpoints = createBreakpoints({});

const primary = `#F29F05`;
const secondary = `#F2EAC2`;
const black = `#000000`;

let theme = createMuiTheme({
  id: "global",
  typography: {
    useNextVariants: true,
    fontFamily: ["Lato, sans-serif"].join(","),
    subtitle1: {},
    subtitle2: {},
    h1: {
      color: black,
      fontSize: "3em",
      fontWeight: 1000,
    },
    h2: {
      color: black,
      fontSize: "2.5em",
    },
    h3: {
      color: black,
      fontSize: "2em",
    },
    h4: {
      color: black,
      fontSize: "1.5em",
    },
    h5: {
      color: black,
      fontSize: "1.2em",
    },
    body1: {
      color: black,
      fontSize: "1em",
    },
    body2: {
      color: black,
      fontSize: "0.8em",
    },
  },
  palette: {
    primary: {
      main: primary,
      light: primary,
      dark: primary,
    },
    secondary: {
      main: secondary,
      light: secondary,
      dark: secondary,
    },
    background: secondary,
    black: black,
    darkBlack: `#141414`,
    white: `#e6e6e6`,
    lightGrey: `#c8c8c8`,
    darkGrey: `#a0a0a0`,
    special: `#d96b52`,

    mountain: `#693815`,
    desert: `#ebd36a`,
    ruin: `#ababab`,
    forest: `#7fbf7c`,
    house: `#286ede`,
    lake: `#5abbdb`,
    field: `#97b579`,
    monster: `#db0980`,

    inactive: `#bbbbbb`,
    danger: `#bf0000`,
  },
  status: {
    danger: "orange",
  },
  shape: {
    borderRadius: 10,
  },
  shadow: "7px 16px 16px -13px rgba(0,0,0,0.52)",
});

// theme = responsiveFontSizes(theme);
export default theme;
