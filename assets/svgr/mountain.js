import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

import CoinSvg from "./coin.js";

function mountainSvg(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.container}>
      {props.money ? (
        <div className={classes.coin}>
          <CoinSvg size={15} />
        </div>
      ) : null}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512.005 512.005"
        width={props.size / 1.5}
        height={props.size / 1.5}
        className={classes.svg}
        {...props}
      >
        <path
          fill={props.color}
          d="M4.475 425.637a8.519 8.519 0 0011.562-3.438l111.155-205.235c.239-.495 5.973-12.16 17.877-12.16 1.69 0 3.593.853 5.47 2.005L77.879 337.18c-2.295 4.122-.811 9.318 3.302 11.614a8.552 8.552 0 0011.614-3.303l71.552-128.401 26.803 20.139c3.396 2.56 8.149 2.21 11.153-.794l45.167-45.167 28.1 28.1a8.523 8.523 0 0012.066 0l25.6-25.6c3.337-3.337 3.337-8.73 0-12.066s-8.73-3.337-12.066 0l-19.567 19.567-28.1-28.1a8.523 8.523 0 00-12.066 0l-45.969 45.969-28.058-21.043-.99-.785c-4.489-3.584-12.006-9.574-21.35-9.574-22.929 0-32.93 21.129-33.101 21.538L1.036 414.074c-2.253 4.139-.708 9.318 3.439 11.563zM110.937 443.736H8.537c-4.71 0-8.533 3.823-8.533 8.533s3.823 8.533 8.533 8.533h102.4c4.71 0 8.533-3.823 8.533-8.533s-3.823-8.533-8.533-8.533z"
        />
        <path
          fill={props.color}
          d="M173.281 182.582c4.147 2.244 9.318.691 11.563-3.456l53.282-98.697c.239-.495 5.973-12.16 17.877-12.16s17.638 11.665 18.108 12.621L418.41 345.449a8.534 8.534 0 007.501 4.446 8.485 8.485 0 004.079-1.041c4.139-2.261 5.666-7.441 3.405-11.58l-38.955-71.407a17.2 17.2 0 016.63-1.331c11.904 0 17.638 11.665 18.057 12.518l76.8 145.075a8.535 8.535 0 007.552 4.54 8.479 8.479 0 003.985-.99 8.543 8.543 0 003.55-11.537l-76.595-144.649c-.418-.896-10.419-22.025-33.348-22.025-5.197 0-10.146 1.271-14.771 3.473L289.352 73.227c-.418-.896-10.419-22.025-33.348-22.025-22.938 0-32.93 21.129-33.109 21.547l-53.069 98.27c-2.236 4.139-.692 9.318 3.455 11.563zM452.27 443.736h-93.867v-17.067h17.238a8.536 8.536 0 008.533-8.533 8.496 8.496 0 00-1.271-4.48l-25.037-66.782c-1.254-3.328-4.437-5.538-7.996-5.538s-6.741 2.21-7.996 5.538l-25.6 68.267a8.566 8.566 0 00.981 7.859 8.546 8.546 0 007.014 3.669h17.067v17.067h-34.133v-25.6a8.536 8.536 0 00-8.533-8.533h-13.286l13.431-35.823 1.86 4.779a8.542 8.542 0 0011.042 4.864c4.395-1.707 6.571-6.656 4.864-11.042l-9.958-25.6a8.537 8.537 0 00-7.953-5.444h-.051a8.54 8.54 0 00-7.945 5.538l-25.6 68.267a8.566 8.566 0 00.981 7.859 8.546 8.546 0 007.014 3.669h17.067v17.067H153.603V426.67h17.238a8.536 8.536 0 008.533-8.533 8.496 8.496 0 00-1.271-4.48l-25.037-66.782a8.549 8.549 0 00-7.996-5.538 8.55 8.55 0 00-7.996 5.538l-25.591 68.267a8.538 8.538 0 00.973 7.859 8.546 8.546 0 007.014 3.669h17.067v25.6a8.536 8.536 0 008.533 8.533h307.2c4.71 0 8.533-3.823 8.533-8.533s-3.822-8.534-8.533-8.534zm-320.486-34.133l13.286-35.43 13.286 35.43h-26.572zm204.8 0l13.286-35.43 13.286 35.43h-26.572zM503.47 443.736h-17.067c-4.71 0-8.533 3.823-8.533 8.533s3.823 8.533 8.533 8.533h17.067c4.71 0 8.533-3.823 8.533-8.533s-3.822-8.533-8.533-8.533z"
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
    backgroundColor: theme.palette.mountain,
    position: "absolute",
  },
  coin: {
    position: "absolute",
    right: 5,
    bottom: 5,
    zIndex: 2,
  },
}));

export default mountainSvg;
