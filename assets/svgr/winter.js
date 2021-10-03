import * as React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

function winterSvg(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  const inactiveColor = `${theme.palette.inactive}`;
  return (
    <div className={classes.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 510 510"
        width={props.size}
        height={props.size}
        className={classes.svg}
        {...props}
      >
        <path
          d="M225 434v45l15 15.9 15-15.9 15-22.5-15-22.5-15-14.1z"
          fill={props.active ? `#c47d53` : `${inactiveColor}`}
        />
        <path
          d="M285 434l-15-14.1-15 14.1v45l15 15.9 15-15.9v-45z"
          fill={props.active ? `#a05e4e` : `${inactiveColor}`}
        />
        <path
          d="M0 479v30h255l15-15-15-15H0z"
          fill={props.active ? `#e1def1` : `${inactiveColor}`}
        />
        <path
          d="M143.4 314c-5.5 14.6-39.5 105.4-45 120H255l15-60-15-60-55.8-14.1z"
          fill={props.active ? `#28bda7` : `${inactiveColor}`}
        />
        <path
          d="M366.6 314l-55.8-14.1L255 314v120h156.6c-5.4-14.6-39.5-105.4-45-120z"
          fill={props.active ? `#009a98` : `${inactiveColor}`}
        />
        <path
          d="M195 194l-46 15c-6.5 12.8-47 92.2-53.5 105H255l15-64.2-15-64.2c-4.1.8-60 8.4-60 8.4z"
          fill={props.active ? `#7eda5d` : `${inactiveColor}`}
        />
        <path
          d="M414.5 314c-6.4-12.5-46-90.3-52.4-102.8L285 164l-30 21.6V314z"
          fill={props.active ? `#28bda7` : `${inactiveColor}`}
        />
        <path
          d="M149 209h16.8c22.8-.1 45.1-5.4 65.4-15.4 7.5-3.7 15.5-6.4 23.7-8l15-65.7L255 1c-5.9 11.5-100.1 196.4-106 208z"
          fill={props.active ? `#f9f0f1` : `${inactiveColor}`}
        />
        <path
          d="M312.6 193.7c9.4 4.9 19.3 8.7 29.5 11.2 7 2.2 13 4.1 20 6.2C356.1 199.5 261 12.7 255 1v184.7c19.9-3.9 40.1-1.1 57.6 8z"
          fill={props.active ? `#e1def1` : `${inactiveColor}`}
        />
        <path
          d="M484.4 63.4l-11.9 11.9-11.9-11.9-21.2 21.2 11.9 11.9-11.9 11.9 21.2 21.2 11.9-11.9 11.9 11.9 21.2-21.2-11.9-11.9 11.9-11.9-21.2-21.2z"
          fill={props.active ? `#bebbda` : `${inactiveColor}`}
        />
        <g fill={props.active ? `#e1def1` : `${inactiveColor}`}>
          <path d="M85.6 174.6l-21.2-21.2-11.9 11.9-11.9-11.9-21.2 21.2 11.9 11.9-11.9 11.9 21.2 21.2 11.9-11.9 11.9 11.9 21.2-21.2-11.9-11.9c4.2-4.1 7.7-7.7 11.9-11.9zM150 28.9h30v30h-30zM45 73.9h30v30H45zM120 103.9h30v30h-30zM10.6 268.9h30v30h-30z" />
        </g>
        <path
          d="M405 163.9h30v30h-30zM345 73.9h30v30h-30zM400.6 6.9h30v30h-30zM450 268.9h30v30h-30zM255 479h255v30H255z"
          fill={props.active ? `#bebbda` : `${inactiveColor}`}
        />
      </svg>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: (props) => props.size,
    height: (props) => props.size,
  },
  svg: {},
}));

export default winterSvg;
