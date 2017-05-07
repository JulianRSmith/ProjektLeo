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
        
        if(PlayerData.currentState == "LobbyState") {
            LobbyState.refreshOnCreate();
        }

    },

    /**
     * Called when a the list of lobbies updates (on remove).
     */
    onRoomRemove: function(event) {

        ConsoleManager.info("Lobby closed:<br>[" + event.room._name + ":" + event.room._id + "]", true);
        
        if(PlayerData.currentState == "LobbyState") {
            LobbyState.refreshOnCreate();
        }

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
                game.state.start("WaitState");

                AudioManager.gameBattleTheme.stop();
            }
            else {
                game.state.start("LobbyState");
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

        // Debug
        ConsoleManager.log("Cleaning up...", false);

        // Cleanup so that we don't get the lobby in list if we disconnect
        for(i = 0; i < 5; i += 1) {
            if(i >= LobbyState.lobbyList.length) {
                ConsoleManager.log("End of lobby list", false);
                ConsoleManager.log(LobbyState.lobbyList, false);

                break;
            }
            
            ConsoleManager.log("Destroy [" + i + "]", false);
            
            LobbyState.lobbyList[i][0].destroy();
            LobbyState.lobbyList[i][1].destroy();
        }

        ConsoleManager.success("Room join accepted:<br>" + event.room, true);

        if(event.room.isGame) {
            LobbyData.lobby = event.room;
            game.state.start('WaitState');
        }

    },

    /**
     * Makes an avatar move as soon as its position changes.
     */
    onUserVariablesUpdate: function(evtParams) {
        var changedVars = evtParams.changedVars;
        var user = evtParams.user;

        // Check if the user changed position
        if (changedVars.indexOf("x") != -1 || changedVars.indexOf("y") != -1) {
            console.log("[" + user + "] change position: [x:" + user.getVariable("x").value + ", y: " + user.getVariable("y").value + "]");
        }

        // User character select change
        if (changedVars.indexOf("player_char") != -1) {
            console.log("[" + user + "] change character: [character:" + user.getVariable("player_char").value + "]");
        }
    }
    
}