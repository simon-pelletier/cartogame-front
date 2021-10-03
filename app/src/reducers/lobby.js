import { Map } from "immutable";
import Mock from './Mock'

const initState = new Map({
  rooms: [],
  players: [],
});

const lobby = (state = initState, action) => {
  switch (action.type) {
    case "LOBBY_UPDATE":
      let newLobby = new Map(action.lobby);
      return (state = state.merge(newLobby));

    default:
      return state;
  }
};

export default lobby;
