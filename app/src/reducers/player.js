import { Map } from "immutable";

const initState = new Map({});

const player = (state = initState, action) => {
  switch (action.type) {
    case "PLAYER_UPDATE":
      return (state = state.merge(action.player));

    case "PLAYER_JOIN_ROOM":
      return (state = state.setIn(["room"], action.roomName));

    case "PLAYER_LEAVE_ROOM":
      return (state = state.merge(["room"], ""));

    // case "SWITCH_STATE_TODO":
    //   let todoState = true;
    //   if (state.getIn([action.id, "completed"]) === true) {
    //     todoState = false;
    //   }

    //   return (state = state.setIn([action.id, "completed"], todoState));

    // case "DELETE_TODO":
    //   return (state = state.deleteIn([action.id]));

    default:
      return state;
  }
};

export default player;
