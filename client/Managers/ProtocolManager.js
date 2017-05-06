/************************************************************

    This object handles the callbacks which are made after
    a NetworkManager.request(); event gets data back
    from the server and route requested.

************************************************************/

var ProtocolManager = {
    
    /**
     * Called when the client connects to the server.
     */
    onConnect: function(event) { 

        // For debug
        ConsoleManager.log("ProtocolManager::onConnect() : Running", false);
        ConsoleManager.log("ProtocolManager::onConnect() : " + event.msg, false);
        
        if(event.success) {
            // For debug
            ConsoleManager.success("Connection accepted.", true);
            sfs.send(new SFS2X.LoginRequest(PlayerData.playerName));
        }
        
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
    onRoomAdd: function(event) {

        // For debug
        ConsoleManager.log("ProtocolManager::onCreateLobby() : Running", false);
        ConsoleManager.log("ProtocolManager::onCreateLobby() :", false);
        //ConsoleManager.log("Created a lobby: [id: " + data.lobby.id + ", name: " + data.lobby.name + ", host: " + data.lobby.host + ", slots: " + data.lobby.slots + ", players: " + data.lobby.players + "]", false);
        
        ConsoleManager.success("Created lobby, entering...", true);

        LobbyState.refreshOnCreate();

    },

    /**
     * Called when a the list of lobbies updates (on remove).
     */
    onRoomRemove: function(event) {
        ConsoleManager.info("Lobby closed:<br>[" + event.room._name + ":" + event.room._id + "]", true);
        
        LobbyState.refreshOnCreate();
    },

    /**
     * Called when a player joines the lobby.
     */
    onUserEnterRoom: function(event) {
        if (event.room.name == "Lobby Zone") {
            ConsoleManager.log("User " + event.user.name + " (" + event.user.id + ") has connected.", true);
        }
        else {
            ConsoleManager.log("User " + event.user.name + " has joined the lobby.", true);
        }
    },

    /**
     * Called when a player leaves the lobby.
     */
    onUserExitRoom: function(event) {
        if (event.room.name == "Lobby Zone") {
            if (!event.user.isItMe) {
                ConsoleManager.log("User " + event.user.name + " (" + event.user.id + ") has disconnected.", true);
            }
        }
        else {
            if (!event.user.isItMe) {
                ConsoleManager.log("User " + event.user.name + " has left the lobby.", true);
            }
        }
    },

    /**
     * Called when disconnected from the server.
     */
    onDisconnect: function(event) {

        // For debug
        ConsoleManager.log("ProtocolManager::onDisconnect() : Running", false);
        ConsoleManager.warning("Disconnected by server<br>Reason: " + event.reason, true);
        
        NetworkManager.networkConnected = false;
        
        game.state.start("MenuState");

    },

    /**
     * Called when the client is unable to login after connecting.
     */
    onLoginError: function(event) {

        ConsoleManager.error("Login error:<br>[" + event.errorMessage + "]<br>[code: " + event.errorCode + "]", true);

    },
    
    /**
     * Called when the client connects and loggs in successfully.
     */
    onLogin: function(event) {

        PlayerData.playerName = event.user._name;
        PlayerData.playerId = event.user._id;


        ConsoleManager.success("Login accepted for: [" + PlayerData.playerName + ": " + PlayerData.playerId + "]", true);

        NetworkManager.networkConnected = true; 

    },
        
    /**
     * Called when the client enters a lobby, but it fails
     */
    onRoomJoinError: function(event) {

        ConsoleManager.error("Room join error:<br>[" + event.errorMessage + "]<br>[code: " + event.errorCode + "]", true);

    },

    /**
     * Called when the client enters a lobby.
     */
    onRoomJoin: function(event) {

        ConsoleManager.success("Room join accepted:<br>" + event.room, true);

        if(event.room.isGame) {
            LobbyData.lobby = event.room;
            game.state.start('WaitState');
        }

    }
    
}