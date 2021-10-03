const io = require("socket.io-client");
import { v4 as uuidv4 } from "uuid";

function checkUuid() {
  const uuid = uuidv4();
  var existingUuid = localStorage.getItem("uuid");
  if (existingUuid) {
    return existingUuid;
  } else {
    localStorage.setItem("uuid", uuid);
    return uuid;
  }
}


const Socket = io(`http://${process.env.SERVER_DOMAIN}:${process.env.SERVER_PORT}/`, {
  reconnectionDelayMax: 10000,
  extraHeaders: {
    uuid: checkUuid(),
  },
});

export default Socket;
