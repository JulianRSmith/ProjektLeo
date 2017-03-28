
var ProtocolManager = {
    
    /**
     * Called when the client connects to the server.
     */
    onConnect: function(data) { 

        console.log("ProtocolManager.onConnect(): " + data.msg);

    },
    
    /**
     * Called when the server gives the client a lobby list.
     */
    onGetLobbies: function(data) {

        console.log("ProtocolManager.onGetLobbies():");
        console.log(data);
        
        lobbyCache = data.lobbyData;
        
        STATE_LOBBY.updateLobbyList();

    },
    
    /**
     * Called when the server gives the client a new lobby.
     */
    onCreateLobby: function (data) {

        console.log("ProtocolManager.onCreateLobby():");
        console.log("Created a lobby: [id: " + data.id + ", name: " + data.name + ", host: " + data.host + ", slots: " + data.slots + ", players: " + data.players + "]");
        
        STATE_LOBBY.refreshOnClick();
        
        //menuToggle('lc-confirm');

    },
    
    /**
     * Called when disconnected from the server.
     */
    onDisconnect: function(data) {

        console.log("ProtocolManager.onDisconnect():")
        console.log("Disconnected reason: [" + data.msg + "]");
        
        networkConnected = false;
        
        game.state.start("STATE_MENU");

    }
    
}