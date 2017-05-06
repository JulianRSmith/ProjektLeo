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

    onRoomRemove: function(event) {
        ConsoleManager.info("Lobby closed:<br>[" + event.room._name + ":" + event.room._id + "]", true);
        
        LobbyState.refreshOnCreate();
    },

    onUserEnterRoom: function(event) {
        if (event.room.name == "Lobby Zone") {
            ConsoleManager.log("User " + event.user.name + " (" + event.user.id + ") entered the room.", true);
        }
        else {
            ConsoleManager.log("User " + event.user.name + " joined the game.", true);
        }
    },

    onUserExitRoom: function(event) {
        if (event.room.name == "Lobby Zone") {
            if (!event.user.isItMe) {
                ConsoleManager.log("User " + event.user.name + " (" + event.user.id + ") left the room.", true);
            }
        }
        else {
            if (!event.user.isItMe) {
                ConsoleManager.log("User " + event.user.name + " left the game.", true);
            }
        }
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

            LobbyData.lobby = data.lobby;

            game.state.start('WaitState');
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
    onDisconnect: function(event) {

        // For debug
        ConsoleManager.log("ProtocolManager::onDisconnect() : Running", false);
        ConsoleManager.warning("Disconnected by server<br>Reason: " + event.reason, true);
        
        NetworkManager.networkConnected = false;
        
        game.state.start("MenuState");

    },

    onLoginError: function(event) {

        ConsoleManager.error("Login error:<br>[" + event.errorMessage + "]<br>[code: " + event.errorCode + "]", true);

    },
    
    onLogin: function(event) {

        PlayerData.playerName = event.user._name;
        PlayerData.playerId = event.user._id;


        ConsoleManager.success("Login accepted for: [" + PlayerData.playerName + ": " + PlayerData.playerId + "]", true);

        NetworkManager.networkConnected = true; 

    },
        
    onRoomJoinError: function(event) {

        ConsoleManager.error("Room join error:<br>[" + event.errorMessage + "]<br>[code: " + event.errorCode + "]", true);

    },

    onRoomJoin: function(event) {

        ConsoleManager.success("Room join accepted:<br>" + event.room, true);

        trace("Room joined: " + evtParams.room);
    }
    
}