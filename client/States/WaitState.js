/************************************************************

    WaitState.js

	Waiting for player to join lobby.

************************************************************/

var WaitState = {

	create: function() {

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
        
	},

    render: function() {

        this.serverText.setText(
            "Server: " + SettingsManager.serverIP + ":" + SettingsManager.serverPort + 
            " | " + (NetworkManager.connected() ? "" : "Not ") + "Connected" + 
            "\nPlayer: [ID: " + PlayerData.playerId + ", Name: " + PlayerData.playerName + "]" + 
            "\nLobby: [ID: " + LobbyData.lobby.id + ", Name: " + LobbyData.lobby.name + ", Host: " + LobbyData.lobby.host + "]"
        );

        this.playerText.setText(
        	"Player 1: " + LobbyData.lobby.players[0] + 
        	"\nPlayer 2: " + LobbyData.lobby.players[1]
        );
        
    }

}