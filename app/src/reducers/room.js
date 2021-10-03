import { Map } from "immutable";

const initState = new Map({});

const room = (state = initState, action) => {
  switch (action.type) {
    case "ROOM_UPDATE":
      let newRoom = new Map(action.room);
      return (state = newRoom);
    default:
      return state;
  }
};

export default room;
