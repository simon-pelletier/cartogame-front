import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

function timerSvg(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        width={props.size}
        height={props.size}
        className={classes.svg}
        {...props}
      >
        <path
          d="M89.839 90.973c0 19.7-11.591 11.678-25.866 11.678-14.257 0-25.812 8.018-25.812-11.678 0-8.939 18.375-22.848 24.125-26.966-5.75-4.117-24.125-18.041-24.125-26.98 0-19.681 11.555-11.678 25.812-11.678 14.275 0 25.866-8 25.866 11.678 0 8.939-18.411 22.863-24.179 26.98 5.768 4.118 24.179 18.027 24.179 26.966z"
          fill="#eeefee"
          opacity={0.7}
        />
        <path
          d="M88.446 92.967c0 15.807-8.587 7.967-24.481 7.967-15.841 0-24.411 7.84-24.411-7.967 0-5.206 24.716-20.852 24.716-20.852s24.176 15.646 24.176 20.852zM81.152 49.223l-.376.376a123.051 123.051 0 01-15.768 13.017l-.718.5-.7-.5C56.774 57.8 49.257 51.58 44.542 46.011c-.29-.341-.564-.666-.82-1.008a22.555 22.555 0 0117.767.786l.064.03A31.11 31.11 0 0071.811 48.4z"
          fill="#f6b863"
        />
        <rect
          fill="#575b6d"
          height={7.91}
          rx={1.708}
          width={60.712}
          x={33.644}
          y={23}
        />
        <rect
          fill="#575b6d"
          height={7.91}
          rx={1.708}
          width={60.712}
          x={33.644}
          y={97.09}
        />
        <path d="M63.696 61.171h1.147v14.628h-1.147z" fill="#f6b863" />
        <path
          d="M78.829 40.613c-1.558-1.808-1.771-4.157-.487-5.264s3.577-.549 5.135 1.26 1.771 4.157.486 5.264-3.583.541-5.134-1.26z"
          fill="#fff"
          opacity={0.35}
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
