import * as React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

function summerSvg(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  const inactiveColor = `${theme.palette.inactive}`;
  return (
    <div className={classes.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={props.size}
        height={props.size}
        className={classes.svg}
        {...props}
      >
        <path
          d="M469.33 256l30.14 79.11-70.88 46.28-22.12 81.72-84.55-4.22L256 512l-65.92-53.11-84.55 4.22-22.12-81.72-70.88-46.28L42.67 256l-30.14-79.11 70.88-46.28 22.12-81.72 84.55 4.22L256 0l65.92 53.11 84.55-4.22 22.12 81.72 70.88 46.28z"
          fill={props.active ? `#fd9f4b` : `${inactiveColor}`}
        />
        <path
          d="M469.33 256l30.14 79.11-70.88 46.28-22.12 81.72-84.55-4.22L256 512V0l65.92 53.11 84.55-4.22 22.12 81.72 70.88 46.28z"
          fill={props.active ? `#fd7f49` : `${inactiveColor}`}
        />
        <circle cx={256} cy={256} fill={props.active ? `#fede51` : `${inactiveColor}`} r={162.88} />
        <path
          d="M418.88 256c0 89.96-72.92 162.88-162.88 162.88V93.12c89.96 0 162.88 72.92 162.88 162.88z"
          fill={props.active ? `#febd4e` : `${inactiveColor}`}
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

export default summerSvg;
