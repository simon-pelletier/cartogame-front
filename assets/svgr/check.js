import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

function timerSvg(props) {
  const classes = useStyles(props);
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
          d="M512 256c0 68.38-26.63 132.67-74.98 181.02S324.38 512 256 512c-9.57 0-19.06-.52-28.43-1.56-57.63-6.32-111.01-31.84-152.59-73.42C26.63 388.67 0 324.38 0 256S26.63 123.33 74.98 74.98c41.58-41.58 94.96-67.1 152.59-73.42C236.94.52 246.43 0 256 0c68.38 0 132.67 26.63 181.02 74.98S512 187.62 512 256z"
          fill="#f0f7ff"
        />
        <path
          d="M512 256c0 68.38-26.63 132.67-74.98 181.02S324.38 512 256 512c-9.57 0-19.06-.52-28.43-1.56V1.56C236.94.52 246.43 0 256 0c68.38 0 132.67 26.63 181.02 74.98S512 187.62 512 256z"
          fill="#dfe7f4"
        />
        <path
          d="M395.67 218.92L291.22 324.9l.52.52-30.54 30.54c-18.247 18.247-47.884 18.315-66.21.01l-30.57-30.55.02-.02-47.88-47.89c-8.79-8.79-13.18-20.3-13.18-31.82 0-11.51 4.39-23.03 13.18-31.82 17.57-17.57 46.06-17.57 63.63 0l47.38 47.38 104.01-105.51c17.53-17.79 46.2-17.89 63.86-.23 17.49 17.48 17.59 45.8.23 63.41z"
          fill="#97de3d"
        />
        <path
          d="M395.67 218.92L291.22 324.9l.52.52-30.54 30.54c-9.27 9.27-21.47 13.84-33.63 13.71V261.25l104.01-105.51c17.53-17.79 46.2-17.89 63.86-.23 17.49 17.48 17.59 45.8.23 63.41z"
          fill="#59c36a"
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
    padding: 5,
  },
  svg: {},
}));

export default timerSvg;
