const roomUpdate = (room) => {
    return {
        type: "ROOM_UPDATE",
        room
    }
}

export default {
    roomUpdate,
}