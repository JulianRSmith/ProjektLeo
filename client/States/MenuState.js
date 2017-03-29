////////////////////////////////////////////////////////////////////////////////
//                                   Menu.js                                  //
////////////////////////////////////////////////////////////////////////////////
//                     This file displays the menu screen                     //
////////////////////////////////////////////////////////////////////////////////

var MenuState = {

    serverText: 0,
    gameLogo: 0,

    connectInterval: 0,

    buttonPlayGame: 0,
    buttonGetLobbies: 0,
    buttonServerSettings: 0,

    create: function() {

        // For debug
        console.log("MenuState::create() : Running");

        // Set game world size
        game.world.setBounds(0, 0, ScreenData.viewportWidth, ScreenData.viewportHeight);

        // AudioManager.gameMainTheme.stop();
        // AudioManager.gameMainTheme.play();

        // Background objects
        GUIManager.backgroundTile('menuBackground');
        GUIManager.backgroundSmoke('backgroundSmoke');
        GUIManager.backgroundBorder('woodBorder');

        // Text objects
        serverText = game.add.text(10, 40, 'Server: ' + SettingsManager.serverIP + " | " + (NetworkManager.connected() ? "" : "Not ") + "Connected", {font: "14px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        
        // Add game logo
        gameLogo = game.add.sprite(ScreenData.screenWidth / 2, 200, 'gameLogo');
        gameLogo.anchor.setTo(0.5);

        // Menu buttons
        buttonPlayGame = GUIManager.createButton('Play', ScreenData.viewportWidth / 2 - (110*2), ScreenData.viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.menuOnClick);
        buttonGetLobbies = GUIManager.createButton('Lobbies', ScreenData.viewportWidth / 2, ScreenData.viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.lobbyListOnClick);
        buttonServerSettings = GUIManager.createButton('Settings', ScreenData.viewportWidth / 2 + (110*2), ScreenData.viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.settingsOnClick);
        
    },

    render: function() {

        serverText.setText("Server: " + SettingsManager.serverIP + " | " + (NetworkManager.connected() ? "" : "Not ") + "Connected");

    },

    // Function which calls when the player clicks the button
    menuOnClick: function() {

        // For debug
        console.log("MenuState::menuOnClick() : Running");
        
        AudioManager.gameButtonClick.play();

        game.state.start('CharState');
        
    },

    // Opens a connection to the server and displays the lobby on connect.
    lobbyListOnClick: function() {

        // For debug
        console.log("MenuState::lobbyListOnClick() : Running");

        AudioManager.gameButtonClick.play();
        
        if(!NetworkManager.connected()) {
            NetworkManager.connect(SettingsManager.serverIP, SettingsManager.serverPort);
            
            console.log("Connecting... Wait for connection.");
            
            connectInterval = setInterval(function() {
                if(NetworkManager.connected()) {
                    NetworkManager.request("connector.entryHandler.onEntry", "", ProtocolManager.onConnect);
                    
                    game.state.start("LobbyState");
                }
                
                clearInterval(connectInterval);
            }, 500);
        }
        else {
            game.state.start("LobbyState");
        }
        
    },

    settingsOnClick: function() {

        // For debug
        console.log("MenuState::settingsOnClick() : Running");

        // No need to play sound as menuToggle handles button clicks for the DOM
        menuToggle('server-settings');

    }
};
