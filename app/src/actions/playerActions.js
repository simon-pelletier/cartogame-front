const playerUpdate = (player) => {
    return {
        type: "PLAYER_UPDATE",
        player
    }
}

const playerJoinRoom = (roomName) => {
    return {
        type: "PLAYER_JOIN_ROOM",
        roomName
    }
}

const playerLeaveRoom = (player) => {
    return {
        type: "PLAYER_LEAVE_ROOM",
        roomName
    }
}

export default {
    playerUpdate,
    playerJoinRoom,
    playerLeaveRoom
}