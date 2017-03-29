
var ProtocolManager = {
    
    /**
     * Called when the client connects to the server.
     */
    onConnect: function(data) { 

        // For debug
        console.log("ProtocolManager::onConnect() : Running");
        console.log("ProtocolManager::onConnect() : " + data.msg);

    },
    
    /**
     * Called when the server gives the client a lobby list.
     */
    onGetLobbies: function(data) {

        // For debug
        console.log("ProtocolManager::onGetLobbies() : Running");
        console.log("ProtocolManager::onGetLobbies() :");
        console.log(data);
        
        lobbyCache = data.lobbyData;
        
        LobbyState.updateLobbyList();

    },
    
    /**
     * Called when the server gives the client a new lobby.
     */
    onCreateLobby: function (data) {

        // For debug
        console.log("ProtocolManager::onCreateLobby() : Running");
        console.log("ProtocolManager::onCreateLobby() :");
        console.log("Created a lobby: [id: " + data.id + ", name: " + data.name + ", host: " + data.host + ", slots: " + data.slots + ", players: " + data.players + "]");
        
        LobbyState.refreshOnClick();
        
        //menuToggle('lc-confirm');

    },
    
    /**
     * Called when disconnected from the server.
     */
    onDisconnect: function(data) {

        // For debug
        console.log("ProtocolManager::onDisconnect() : Running");
        console.log("ProtocolManager::onDisconnect() :")
        console.log("Disconnected reason: [" + data.msg + "]");
        
        networkConnected = false;
        
        game.state.start("MenuState");

    }
    
}