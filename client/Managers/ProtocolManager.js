
var ProtocolManager = {
    
    /**
     * Called when the client connects to the server.
     */
    onConnect: function(data) { 

        // For debug
        ConsoleManager.log("ProtocolManager::onConnect() : Running", false);
        ConsoleManager.log("ProtocolManager::onConnect() : " + data.msg, false);

    },
    
    /**
     * Called when the server gives the client a lobby list.
     */
    onGetLobbies: function(data) {

        // For debug
        ConsoleManager.log("ProtocolManager::onGetLobbies() : Running", false);
        ConsoleManager.log("ProtocolManager::onGetLobbies() :", false);
        ConsoleManager.log(data, false);
        
        LobbyState.lobbyCache = data.lobbyData;
        LobbyState.updateLobbyList();

    },
    
    /**
     * Called when the server gives the client a new lobby.
     */
    onCreateLobby: function(data) {

        // For debug
        ConsoleManager.log("ProtocolManager::onCreateLobby() : Running", false);
        ConsoleManager.log("ProtocolManager::onCreateLobby() :", false);
        ConsoleManager.log("Created a lobby: [id: " + data.lobby.id + ", name: " + data.lobby.name + ", host: " + data.lobby.host + ", slots: " + data.lobby.slots + ", players: " + data.lobby.players + "]", false);
        
        ConsoleManager.success("Created lobby, entering...", true);

        NetworkManager.request("connector.entryHandler.onEnterLobby", { lobbyId: data.lobby.id, playerName: data.lobby.host }, ProtocolManager.onEnterLobby);

    },

    /**
     * Called when the client enters a lobby.
     */
    onEnterLobby: function(data) {
        if(data.error) { 
            ConsoleManager.error("Unable to join lobby<br>Reason: " + data.msg, true);
        }
        else {
            ConsoleManager.success("Joined lobby successfully", true);

            // TODO: Start character select state in networked mode.
        }

    },

    /**
     * Called when a player joines the lobby.
     */
    onPlayerJoined: function(data) {

        ConsoleManager.log(data.playerName + " joined the lobby", true);

    },
    
    /**
     * Called when disconnected from the server.
     */
    onDisconnect: function(data) {

        // For debug
        ConsoleManager.log("ProtocolManager::onDisconnect() : Running", false);
        ConsoleManager.log("ProtocolManager::onDisconnect() :", false);
        ConsoleManager.log("Disconnected reason: [" + data.msg + "]", false);

        ConsoleManager.warning("Disconnected by server<br>Reason: " + data.msg, true);
        
        NetworkManager.networkConnected = false;
        
        game.state.start("MenuState");

    }
    
}