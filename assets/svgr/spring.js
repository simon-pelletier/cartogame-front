import * as React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

function springSvg(props) {
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
        d="M256 0l-20.016 91.667L256 172l93.382-129.471C326.69 16.47 293.268 0 256 0z"
        fill={props.active ? `#b40042` : `${inactiveColor}`}
      />
      <path
        d="M256 0c-37.265 0-70.684 16.468-93.377 42.523L256 172z"
        fill={props.active ? `#e50058` : `${inactiveColor}`}
      />
      <path d="M241 270.333h30v194.215h-30z" fill={props.active ? `#00aa95` : `${inactiveColor}`} />
      <path
        d="M345.344 42.524c-34.027 0-65.189 12.247-89.336 32.563l49.504 206.754c43.714-19.101 74.267-62.714 74.267-113.469V42.524z"
        fill={props.active ? `#ff415b` : `${inactiveColor}`}
      />
      <path
        d="M305.512 281.841V181.379c0-42.657-19.235-80.821-49.504-106.292l-.007.006-20.016 113.611L256 292.15c17.606 0 34.348-3.684 49.512-10.309z"
        fill={props.active ? `#e50058` : `${inactiveColor}`}
      />
      <path
        d="M166.656 42.524h-34.435v125.848c0 68.361 55.418 123.779 123.779 123.779V75.093c-24.148-20.32-55.313-32.569-89.344-32.569z"
        fill={props.active ? `#ff415b` : `${inactiveColor}`}
      />
      <path
        d="M338.422 377.123c-38.041 0-70.401 24.299-82.422 58.22l-20.016 38.008L256 512h76.167c48.284 0 87.425-39.142 87.425-87.426v-47.452h-81.17z"
        fill={props.active ? `#00cc76` : `${inactiveColor}`}
      />
      <path
        d="M173.578 377.123h-81.17v47.452c0 48.284 39.142 87.426 87.426 87.426H256v-76.657c-12.02-33.922-44.381-58.221-82.422-58.221z"
        fill={props.active ? `#a5e887` : `${inactiveColor}`}
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

export default springSvg;
