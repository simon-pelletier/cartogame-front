import { combineReducers } from "redux";
import room from "./room";
import player from "./player";
import lobby from "./lobby";

export default combineReducers({
  room,
  player,
  lobby,
});
