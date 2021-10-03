import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

function ruinSvg(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={props.size / 1.5}
        height={props.size / 1.5}
        className={classes.svg}
        {...props}
      >
        <path
          fill={props.color}
          d="M63 58h-3v-3a1 1 0 00-1-1h-3V29c0-.379-.214-.725-.553-.895l-3.66-1.83-1.858-4.646A1 1 0 0049 21h-2.001a.998.998 0 00-.894.553l-2 4A1.002 1.002 0 0044 26v28h-6V22a1 1 0 00-.4-.8l-4-3a.997.997 0 00-.6-.2h-1.465l-1.704-2.555a.999.999 0 00-.832-.445H27a1 1 0 00-1 1v38h-6V8.976A4.953 4.953 0 0023 10c2.757 0 5-2.243 5-5s-2.243-5-5-5H5C2.243 0 0 2.243 0 5s2.243 5 5 5a4.953 4.953 0 003-1.024V54H5a1 1 0 00-1 1v3H1a1 1 0 00-1 1v4a1 1 0 001 1h62a1 1 0 001-1v-4a1 1 0 00-1-1zM46 35.414l2 2V42c0 .266.105.52.293.707l2 2 1.414-1.414L50 41.586v-4.172l2.707-2.707-1.414-1.414L49 35.586l-3-3v-6.35L47.618 23h.705l1.749 4.371a.996.996 0 00.481.523L54 29.618v22.968l-2-2V48h-2v2h-2v2h2.586l2 2H46V35.414zm-18 12l2-2 1 1V50c0 .266.105.52.293.707l1.5 1.5 1.414-1.414L33 49.586V46a1 1 0 00-.293-.707l-2-2a.999.999 0 00-1.414 0L28 44.586V28.63l2 2.25V36c0 .266.105.52.293.707l2 2 1.414-1.414L32 35.586V30.5c0-.025-.012-.048-.013-.073l1.72-1.72A1 1 0 0034 28v-4h-2v3.586l-1.192 1.193L28 25.62V17h.464l1.704 2.555c.186.278.498.445.832.445h1.667L36 22.5v20.086l-2.293-2.293-1.414 1.414L36 45.414V54h-8v-6.586zM10 7h8v2h-8V7zM5 8C3.346 8 2 6.654 2 5s1.346-3 3-3h18c1.654 0 3 1.346 3 3s-1.346 3-3 3a2.992 2.992 0 01-2.89-2.251A1.001 1.001 0 0019.142 5H8.858c-.455 0-.854.309-.968.749A2.992 2.992 0 015 8zm5 44.414l2.207-2.207-1.414-1.414-.793.793V29.914l1.793 1.793A.997.997 0 0012.5 32H15v-2h-2.086L10 27.086v-3.672l2.707-2.707-1.414-1.414L10 20.586V11h8v12.796l-2-1.75V17a1 1 0 00-.293-.707l-2.5-2.5-1.414 1.414L14 17.414V22.5c0 .288.124.562.341.753L18 26.454v22.132l-4-4v-5.172l2.207-2.207-1.414-1.414-.793.793-1.293-1.293-1.414 1.414L12.586 38l-.293.293A.996.996 0 0012 39v6c0 .266.105.52.293.707L18 51.414V54h-8v-1.586zM6 56h52v2H6v-2zm56 6H2v-2h60v2z"
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
    position: (props) => (props.mini ? "absolute" : "none"),
    width: (props) => props.size,
    height: (props) => props.size,
  },
  svg: {
    position: "absolute",
    zIndex: (props) => (props.mini === "true" ? 3 : 1),
  },
  background: {
    zIndex: (props) => (props.mini === "true" ? 2 : 0),
    width: (props) => props.size,
    height: (props) => props.size,
    backgroundColor: (props) =>
      props.mini ? theme.palette.ruin : "transparent",
    position: "absolute",
    borderRadius: (props) => (props.mini ? `0px 25px 25px 25px` : 0),
  },
}));

export default ruinSvg;
