/************************************************************

    WaitState.js

	Waiting for player to join lobby.

************************************************************/

var WaitState = {

    renderText: "Waiting...",
    startButton: 0,

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
        this.playerText.setTextBounds(0, 256, ScreenData.screenWidth, 50);

        this.lobbyText = game.add.text(0, 0, 'Waiting for a player...', {font: "40px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        this.lobbyText.setTextBounds(0, 200, ScreenData.screenWidth, 50);


        this.leaveButton = GUIManager.createButton('Leave Game', 100, ScreenData.viewportHeight - 70, '#341e09', "buttonGreenNormal", this.leaveGame);

        console.log(LobbyData.lobby);
        console.log(LobbyData.lobby._userManager._usersById._c.entries());
        console.log(Object.keys(LobbyData.lobby._userManager._usersById._c));
	},

    render: function() {

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
            this.lobbyText.setText("Ready to start!");

            this.readyToStart = true;
        }
        else {
            this.lobbyText.setText("Waiting for a player...");

            this.readyToStart = false;
        }
        
    },

    update: function() {
        if(this.readyToStart) {
            if(this.startButton == 0) {
                this.startButton = GUIManager.createButton('Start Game', ScreenData.viewportWidth / 2, ScreenData.viewportHeight - 70, '#341e09', "buttonGreenNormal", this.startGame);
            }
        }
        else { 
            if(this.startButton != 0) {
                this.startButton[0].destroy();
                this.startButton[1].destroy();
                this.startButton = 0;
            }
        }
    },

    startGame: function() {
        //todo: send start request
    },

    leaveGame: function() {
        // Leave the last joined Room
        sfs.send(new SFS2X.LeaveRoomRequest());
    },

    populatePlayerList: function(value, key, map) { 

        console.log(value);

        renderText += "\nPlayer: " + value._name + " [" + value._id + "]";

    }

}