const updateLobby = (lobby) => {
    return {
        type: "LOBBY_UPDATE",
        lobby
    }
}

export default {
    updateLobby,
}