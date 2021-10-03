import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

function fieldSvg(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        width={props.size / 1.5}
        height={props.size / 1.5}
        className={classes.svg}
        {...props}
      >
        <path
          fill={props.color}
          d="M113.339 65.75h8.161a1.75 1.75 0 000-3.5H97.25V50.978a1.751 1.751 0 00-.615-1.332l-9.75-8.311a1.751 1.751 0 00-2.27 0l-9.75 8.311a1.751 1.751 0 00-.615 1.332V62.25H6.5a1.75 1.75 0 000 3.5h8.161l-9.884 55.443A1.749 1.749 0 006.5 123.25h115a1.749 1.749 0 001.723-2.057zM77.75 51.785l8-6.818 8 6.818V62.25H90.5V57a1.749 1.749 0 00-1.75-1.75h-6A1.749 1.749 0 0081 57v5.25h-3.25zM84.5 62.25v-3.5H87v3.5zm-1.872 3.5l4.126 54H73.92l-1.375-54zm-37.256 0h10.083l-1.375 54H41.246zm-27.156 0h10.047l-6.876 54H8.589zm13.576 0h10.069l-4.126 54H24.916zm25.789 54l1.375-54h10.088l1.375 54zm32.683 0l-4.125-54h10.069l6.308 49.54.568 4.46zm16.349 0l-6.308-49.54-.568-4.46h10.047l9.626 54zM14.12 30.05h2.744a10.473 10.473 0 001.82 4.4l-1.932 1.933a1.75 1.75 0 002.476 2.474l1.931-1.931a10.448 10.448 0 004.391 1.82v2.734a1.75 1.75 0 003.5 0v-2.734a10.465 10.465 0 004.4-1.82l1.932 1.931a1.749 1.749 0 102.474-2.474l-1.931-1.932a10.477 10.477 0 001.82-4.4h2.735a1.75 1.75 0 000-3.5h-2.735a10.459 10.459 0 00-1.819-4.391l1.931-1.931a1.75 1.75 0 10-2.474-2.475l-1.932 1.932a10.472 10.472 0 00-4.4-1.821V15.12a1.75 1.75 0 00-3.5 0v2.745a10.459 10.459 0 00-4.391 1.819l-1.931-1.931a1.75 1.75 0 00-2.475 2.475l1.931 1.931a10.465 10.465 0 00-1.819 4.391H14.12a1.75 1.75 0 000 3.5zm8.167-6.763a7.1 7.1 0 0110.039 10.032 7.1 7.1 0 01-10.031 0 7.1 7.1 0 010-10.034zM76.44 28.92H90.3a8.193 8.193 0 007.646-5.253h9.5a8.2 8.2 0 008.19-8.189v-.022a7.086 7.086 0 00-6.332-7.116 7.18 7.18 0 00-1.704.06 8.386 8.386 0 00-14.617 1.407 6.893 6.893 0 00-4.361 1.931 8.362 8.362 0 00-12.783 3.316A6.943 6.943 0 0069.51 23.5a7.048 7.048 0 006.93 5.42zm16.99-15.627a3.187 3.187 0 01.518.046 1.754 1.754 0 001.98-1.326 4.885 4.885 0 019.225-.847 1.751 1.751 0 002.28.9 3.3 3.3 0 011.58-.237 3.565 3.565 0 013.127 3.628v.022a4.7 4.7 0 01-4.69 4.689H93.584a3.523 3.523 0 01-3.506-2.653 3.483 3.483 0 01.252-2.269l.01-.023a3.473 3.473 0 01.414-.649 3.428 3.428 0 012.676-1.281zm-19.83 6.53a3.453 3.453 0 013.22-1.231 1.754 1.754 0 001.959-1.331 4.865 4.865 0 018.007-2.5 6.906 6.906 0 006.794 8.905h.362A4.686 4.686 0 0190.3 25.42H76.44a3.533 3.533 0 01-3.51-2.661 3.425 3.425 0 01.67-2.936z"
        />
      </svg>
      <div className={classes.background}></div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: (props) => props.size,
    height: (props) => props.size,
  },
  svg: {
    position: "absolute",
    zIndex: 1,
  },
  background: {
    zIndex: 0,
    width: (props) => props.size,
    height: (props) => props.size,
    backgroundColor: theme.palette.field,
    position: "absolute",
  },
}));

export default fieldSvg;
