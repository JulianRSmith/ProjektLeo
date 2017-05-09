/************************************************************

    WaitState.js

	Waiting for player to join lobby.

************************************************************/

var WaitState = {

    renderText: "Waiting...",
    startButton: 0,
    room: 0,

	create: function() {
            
        PlayerData.currentState = "WaitState";

        // For debug
        ConsoleManager.log("WaitState::create() : Running", false);

        // Set game world size
        game.world.setBounds(0, 0, ScreenData.viewportWidth, ScreenData.viewportHeight);

        // Background objects
        GUIManager.backgroundTile('menuBackground');
        GUIManager.backgroundSmoke('backgroundSmoke');
        GUIManager.backgroundBorder('woodBorder');

        // Text objects
        this.serverText = game.add.text(10, 40, '', {font: "14px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});

        this.playerText = game.add.text(10, 40, 'PlayerList', {font: "16px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        this.playerText.setTextBounds(0, 256, ScreenData.viewportWidth, 50);

        this.lobbyText = game.add.text(0, 0, 'Waiting for a player...', {font: "40px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        this.lobbyText.setTextBounds(0, 200, ScreenData.viewportWidth, 50);

        this.leaveButton = GUIManager.createButton('Leave Game', 100, ScreenData.viewportHeight - 70, '#341e09', "buttonGreenNormal", this.leaveGame);

        ConsoleManager.log(LobbyData.lobby, false);
        ConsoleManager.log(LobbyData.lobby._userManager._usersById._c.entries(), false);
        ConsoleManager.log(Object.keys(LobbyData.lobby._userManager._usersById._c), false);

        this.waitForTransition = false;
        room = sfs.lastJoinedRoom;

        woodTransitionIn();

	},

    render: function() {

        // Safety for when players leave the room.
        NetPlayer.playerReady = false;
        PlayerData.playerReady = false;

        AudioManager.gameBattleTheme.stop();

        this.serverText.setText(
            "Server: " + SettingsManager.serverIP + ":" + SettingsManager.serverPort + 
            " | " + (NetworkManager.connected() ? "" : "Not ") + "Connected" + 
            "\nPlayer: [ID: " + PlayerData.playerId + ", Name: " + PlayerData.playerName + "]" + 
            "\nLobby: [ID: " + LobbyData.lobby.id + ", Name: " + LobbyData.lobby.name + "]"
        );

        renderText = "";
        LobbyData.lobby._userManager._usersById._c.forEach(WaitState.populatePlayerList);
        this.playerText.setText(renderText);

        if(LobbyData.lobby._userCount == 2) {
            var gameStarted = room.getVariable(SFS2X.ReservedRoomVariables.RV_GAME_STARTED).value;

            this.lobbyText.setText("Ready to start!");

            if(!gameStarted) {
                
                this.readyToStart = true;
            }
            else {
                this.readyToStart = false;

                if(!this.waitForTransition) {
                    this.waitForTransition = true;

                    woodTransitionOut(true);
                    setTimeout(function(){
                        game.state.start('CharState');
                    }, SettingsManager.transitionTime);
                }
            }

        }
        else {
            this.lobbyText.setText("Waiting for a player...");

            this.readyToStart = false;
        }
        
    },

    leaveGame: function() {
        
        // Leave the last joined Room
        sfs.send(new SFS2X.LeaveRoomRequest());

    },

    populatePlayerList: function(value, key, map) { 

        renderText += "\nPlayer: " + value._name + " [" + value._id + "]";

    }

}