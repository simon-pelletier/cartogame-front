import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

function houseSvg(props) {
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
          d="M57 25.59l1.315.893a1.001 1.001 0 001.389-.266l2.246-3.311a1 1 0 00-.266-1.389L32.562 1.756a1 1 0 00-1.123 0L2.315 21.518a1 1 0 00-.266 1.389l2.246 3.311a.997.997 0 001.389.266L7 25.59v10.005a2.486 2.486 0 00-1.316 1.351C4.003 41.102 2 46.564 2 49c0 3.59 2.09 6.378 5 6.903V60H2v2h60v-2h-5zM5.389 24.267L4.266 22.61 32 3.791 59.734 22.61l-1.123 1.656L32.562 6.59a1.002 1.002 0 00-1.124 0zM4 49c0-1.625 1.289-5.745 3.537-11.304.115-.283.362-.313.463-.313s.348.03.463.313C10.711 43.255 12 47.375 12 49c0 2.897-1.683 5-4 5s-4-2.103-4-5zm5 6.903c2.91-.525 5-3.313 5-6.903 0-2.436-2.003-7.898-3.684-12.054A2.486 2.486 0 009 35.595V24.233L32 8.626l23 15.607v19.465l-.168-.252c-.371-.557-1.293-.557-1.664 0l-2 3A1 1 0 0051 47v2h-2v-2c0-.197-.059-.391-.168-.555l-2-3c-.371-.557-1.293-.557-1.664 0l-2 3A1.006 1.006 0 0043 47v2h-2v-2c0-.197-.059-.391-.168-.555l-2-3c-.371-.557-1.293-.557-1.664 0l-2 3A1.006 1.006 0 0035 47v13h-6V41a1 1 0 00-1-1H17a1 1 0 00-1 1v19H9zM39 60h-2V47.303l1-1.5 1 1.5zm2-9h2v2h-2zm0 4h2v5h-2zm6 5h-2V47.303l1-1.5 1 1.5zm2-9h2v2h-2zm0 4h2v5h-2zm-22 5h-9V42h9zm26 0V47.303l1-1.5 1 1.5V60z"
        />
        <path
          fill={props.color}
          d="M29 33h6c2.206 0 4-1.794 4-4v-6c0-2.206-1.794-4-4-4h-6c-2.206 0-4 1.794-4 4v6c0 2.206 1.794 4 4 4zm-2-4v-2h4v4h-2c-1.103 0-2-.897-2-2zm8 2h-2v-4h4v2c0 1.103-.897 2-2 2zm2-8v2h-4v-4h2c1.103 0 2 .897 2 2zm-8-2h2v4h-4v-2c0-1.103.897-2 2-2zM23 50h2v2h-2z"
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
    backgroundColor: theme.palette.house,
    position: "absolute",
  },
}));

export default houseSvg;
