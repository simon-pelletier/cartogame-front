import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

function desertSvg(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={props.size / 1.5}
        height={props.size / 1.5}
        className={classes.svg}
        {...props}
      >
        <path
          fill={props.color}
          d="M457.221 375.118c30.205 0 54.779-24.574 54.779-54.779V260c0-22.058-17.944-40.003-40-40.003-22.058 0-40.004 17.945-40.004 40.003v35.114h-11.122V125.98c0-38.353-31.203-69.554-69.556-69.554s-69.555 31.202-69.555 69.554v90.143h-12.097v-57.871c0-22.201-18.062-40.262-40.262-40.262-22.199 0-40.259 18.062-40.259 40.262v83.226c0 30.419 24.747 55.166 55.166 55.166h37.452v194.458H72.449c-5.771 0-10.449 4.678-10.449 10.449S66.678 512 72.449 512h429.102c5.771 0 10.449-4.678 10.449-10.449s-4.678-10.449-10.449-10.449h-80.676V375.118h36.346zm-46.797-20.899c-5.771 0-10.449 4.678-10.449 10.449V491.1H302.66V286.194c0-5.771-4.678-10.449-10.449-10.449H244.31c-18.895 0-34.268-15.372-34.268-34.268v-83.226c0-10.678 8.685-19.364 19.361-19.364 10.678 0 19.364 8.686 19.364 19.364v68.32c0 5.771 4.678 10.449 10.449 10.449h32.995c5.771 0 10.449-4.678 10.449-10.449V125.98c0-26.83 21.828-48.657 48.658-48.657 26.831 0 48.659 21.828 48.659 48.657v179.582c0 5.771 4.678 10.449 10.449 10.449h32.02c5.771 0 10.449-4.678 10.449-10.449v-45.563c0-10.535 8.571-19.105 19.106-19.105 10.533 0 19.102 8.57 19.102 19.105v60.339c0 18.682-15.199 33.881-33.881 33.881h-46.798zM77.325 38.166c-27.296 0-49.502 22.207-49.502 49.502s22.206 49.502 49.502 49.502c27.296 0 49.502-22.206 49.502-49.502 0-27.296-22.206-49.502-49.502-49.502zm0 78.106c-15.773 0-28.604-12.831-28.604-28.604s12.831-28.604 28.604-28.604 28.604 12.831 28.604 28.604c0 15.772-12.831 28.604-28.604 28.604zM77.325.001c-5.771 0-10.449 4.678-10.449 10.449v15.44c0 5.771 4.678 10.449 10.449 10.449s10.449-4.678 10.449-10.449V10.45c0-5.771-4.678-10.449-10.449-10.449zM77.325 138.996c-5.771 0-10.449 4.678-10.449 10.449v15.441c0 5.771 4.678 10.449 10.449 10.449s10.449-4.678 10.449-10.449v-15.441c0-5.771-4.678-10.449-10.449-10.449zM153.246 43.834c-2.886-4.999-9.276-6.71-14.273-3.825l-13.372 7.72c-4.998 2.886-6.71 9.276-3.825 14.273a10.445 10.445 0 0014.273 3.826l13.372-7.72c4.998-2.886 6.71-9.276 3.825-14.274zM32.872 113.333c-2.886-4.998-9.277-6.711-14.273-3.824l-13.37 7.72c-4.998 2.885-6.71 9.276-3.824 14.273a10.443 10.443 0 0014.273 3.825l13.37-7.72c4.998-2.885 6.71-9.276 3.824-14.274zM29.047 47.729l-13.373-7.72c-4.998-2.886-11.388-1.172-14.273 3.825-2.885 4.999-1.172 11.389 3.825 14.274l13.373 7.719a10.442 10.442 0 0014.273-3.826c2.885-4.997 1.173-11.387-3.825-14.272zM149.422 117.23l-13.371-7.721c-4.997-2.885-11.387-1.173-14.273 3.824-2.886 4.998-1.173 11.387 3.824 14.273l13.372 7.721a10.441 10.441 0 0014.273-3.825c2.885-4.997 1.173-11.386-3.825-14.272zM41.007 491.101H10.451c-5.771 0-10.449 4.678-10.449 10.449s4.678 10.449 10.449 10.449h30.556c5.771 0 10.449-4.678 10.449-10.449s-4.678-10.449-10.449-10.449z"
        />
        <path
          fill={props.color}
          d="M324.964 300.888c-5.771 0-10.449 4.678-10.449 10.449v149.356c0 5.771 4.678 10.449 10.449 10.449s10.449-4.678 10.449-10.449V311.336c0-5.77-4.678-10.448-10.449-10.448zM324.964 265.537c-5.771 0-10.449 4.678-10.449 10.449v3.861c0 5.771 4.678 10.449 10.449 10.449s10.449-4.678 10.449-10.449v-3.861c0-5.771-4.678-10.449-10.449-10.449z"
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
    backgroundColor: theme.palette.desert,
    position: "absolute",
  },
}));

export default desertSvg;