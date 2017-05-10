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

        ConsoleManager.log("Lobby closed:<br>[" + event.room._name + ":" + event.room._id + "]", true);
        
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

            if(!event.user.isItMe) {
                NetPlayer.playerName = event.user.name;
            }
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

                AudioManager.gameBattleTheme.stop();

                woodTransitionOut();
                setTimeout(function(){game.state.start('WaitState')}, SettingsManager.transitionTime);

            }
            else {
                woodTransitionOut();
                setTimeout(function(){game.state.start('LobbyState')}, SettingsManager.transitionTime);
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
        
        // Disconnect for safety (The SFS client api has a bug where server send unknown disconnect)
        NetworkManager.disconnect();
        
        // Return to menu
        woodTransitionOut();
        setTimeout(function(){game.state.start('MenuState')}, SettingsManager.transitionTime);

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

            woodTransitionOut();
            setTimeout(function(){game.state.start('WaitState')}, SettingsManager.transitionTime);
        }

    },

    /**
     * Updates any values which have been updated by other clients
     */
    onUserVariablesUpdate: function(evtParams) {
        var changedVars = evtParams.changedVars;
        var user = evtParams.user;

        // Check if the user changed position
        if (changedVars.indexOf(NetData.NET_PLAYER_X) != -1 || changedVars.indexOf(NetData.NET_PLAYER_Y) != -1) {
            //ConsoleManager.log("[" + user + "] change position: [x:" + user.getVariable(NetData.NET_PLAYER_X).value + ", y: " + user.getVariable(NetData.NET_PLAYER_Y).value + "]");

            // Pass the data into the PlayState
            if(PlayerData.currentState == "PlayState") {
                PlayState.updatePlayer(user, "play_state");
            }
        }

        // User character select change
        if (changedVars.indexOf(NetData.NET_PLAYER_CHAR) != -1) {
            //ConsoleManager.log("[" + user + "] change character: [character:" + user.getVariable(NetData.NET_PLAYER_CHAR).value + "]");

            // Pass the data into the CharState
            if(PlayerData.currentState == "CharState") {
                CharState.updatePlayer(user, "char_select");
            }
        }

        // User ready
        if (changedVars.indexOf(NetData.NET_PLAYER_READY) != -1) {
            //ConsoleManager.log("[" + user + "] is ready: [ready:" + user.getVariable(NetData.NET_PLAYER_READY).value + "]");

            // Pass the data into the CharState
            if(PlayerData.currentState == "CharState") {
                CharState.updatePlayer(user, "char_ready");
            }
        }
        
        if (changedVars.indexOf(NetData.NET_PLAYER_HEALTH) != -1) {
            //ConsoleManager.log("[" + user + "] change health: [health:" + user.getVariable(NetData.NET_PLAYER_HEALTH).value + "]");
            
            // Pass the data into the PlayState
            if(PlayerData.currentState == "PlayState") {
                PlayState.updatePlayer(user, "player_health");
            }
        }
        
        if (changedVars.indexOf(NetData.NET_PLAYER_ATTACK) != -1) {
            //ConsoleManager.log("[" + user + "] has attacked: [attack:" + user.getVariable(NetData.NET_PLAYER_ATTACK).value + "]");
            
            // Pass the data into the PlayState
            if(PlayerData.currentState == "PlayState") {
                PlayState.updatePlayer(user, "player_attack");
            }
        }

        if (changedVars.indexOf(NetData.NET_PLAYER_INCHAR) != -1) {
            //ConsoleManager.log("[" + user + "] has joined CharState: [CharState:" + user.getVariable(NetData.NET_PLAYER_INCHAR).value + "]", false);
            
            if(!user.isItMe) {
                //ConsoleManager.success("Other player ready!", true);
                NetPlayer.playerInChar = true;

                if(PlayerData.playerInChar) {
                    game.paused = false;

                    CharState.syncText.destroy();
                }
            }
            else { 
                //ConsoleManager.success("I am ready!", true);
                PlayerData.playerInChar = true;

                if(NetPlayer.playerInChar) {
                    game.paused = false;

                    CharState.syncText.destroy();
                }
            }
        }

        if (changedVars.indexOf(NetData.NET_PLAYER_DIED) != -1) {
            //ConsoleManager.log("[" + user + "] has joined CharState: [CharState:" + user.getVariable(NetData.NET_PLAYER_INCHAR).value + "]", false);
            
            if(!user.isItMe) {
                NetPlayer.hasDied = true;
                PlayState.deathText = game.add.text(0, 0, " You won this battle! ", {font: "40px Calibri", fill: "#FFFFFF", backgroundColor: "#333333", align: "center", boundsAlignH: "center", boundsAlignV: "middle"});
                PlayState.deathText.setTextBounds(0, 200, ScreenData.viewportWidth, 50);
            }
            else { 
                PlayerData.hasDied = true;
                PlayState.deathText = game.add.text(0, 0, " You lost this battle! ", {font: "40px Calibri", fill: "#FFFFFF", backgroundColor: "#333333", align: "center", boundsAlignH: "center", boundsAlignV: "middle"});
                PlayState.deathText.setTextBounds(0, 200, ScreenData.viewportWidth, 50);
            }
            
            PlayState.deathText.fixedToCamera = true;

            setTimeout(function(){
                woodTransitionOut(true);

                // Cleanup values
                NetPlayer.playerChar = 0;
                NetPlayer.playerReady = false;
                NetPlayer.hasDied = false;

                PlayerData.playerChar = 0;
                PlayerData.playerReady = false;
                PlayerData.hasDied = false;

                CharState.readyButton[0].setText('Ready');
                CharState.timeLeft = 3;

                player1Health = 200;
                player2Health = 200;

                setTimeout(function() {
                    game.state.start("CharState");
                }, SettingsManager.transitionTime);
            }, 3000);
        }
    }
    
}