////////////////////////////////////////////////////////////////////////////////
//                                   Menu.js                                  //
////////////////////////////////////////////////////////////////////////////////
//                     This file displays the menu screen                     //
////////////////////////////////////////////////////////////////////////////////

var STATE_MENU = {
    serverText: 0,
    gameLogo: 0,

    connectInterval: 0,

    buttonPlayGame: 0,
    buttonGetLobbies: 0,
    buttonServerSettings: 0,

    create: function() {

        // Set game world size
        game.world.setBounds(0, 0, viewportWidth, viewportHeight);
            
        // Init sound for state
        gameMainTheme = game.add.audio('musicMenu');
        gameButtonClick = game.add.audio('soundButtonClick');
        gameButtonClick.allowMultiple = true;
        gameMainTheme.loop = true;
        //gameMainTheme.stop();
        //gameMainTheme.play();

        // Background objects
        GUIManager.backgroundTile('menuBackground');
        GUIManager.backgroundSmoke('backgroundSmoke');
        GUIManager.backgroundBorder('woodBorder');

        // Text objects
        serverText = game.add.text(10, 40, 'Server: ' + SettingsManager.serverIP + " | " + (NetworkManager.connected() ? "" : "Not ") + "Connected", {font: "14px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        
        // Add game logo
        gameLogo = game.add.sprite(screenWidth / 2, 200, 'gameLogo');
        gameLogo.anchor.setTo(0.5);

        // Menu buttons
        buttonPlayGame = GUIManager.createButton('Play', viewportWidth / 2 - (110*2), viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.menuOnClick);
        buttonGetLobbies = GUIManager.createButton('Lobbies', viewportWidth / 2, viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.lobbyListOnClick);
        buttonServerSettings = GUIManager.createButton('Settings', viewportWidth / 2 + (110*2), viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.settingsOnClick);
        
    },

    render: function() {

        serverText.setText("Server: " + SettingsManager.serverIP + " | " + (NetworkManager.connected() ? "" : "Not ") + "Connected");

    },

    // Function which calls when the player clicks the button
    menuOnClick: function() {
        
        gameButtonClick.play();

        game.state.start('STATE_CHAR');
        
    },

    // Opens a connection to the server and displays the lobby on connect.
    lobbyListOnClick: function() {

        gameButtonClick.play();
        
        if(!NetworkManager.connected()) {
            NetworkManager.connect(SettingsManager.serverIP, SettingsManager.serverPort);
            
            console.log("Connecting... Wait for connection.");
            
            connectInterval = setInterval(function() {
                if(NetworkManager.connected()) {
                    NetworkManager.request("connector.entryHandler.onEntry", "", ProtocolManager.onConnect);
                    game.state.start("STATE_LOBBY");
                }
                
                clearInterval(connectInterval);
            }, 500);
        }
        else {
            game.state.start("STATE_LOBBY");
        }
        
    },

    settingsOnClick: function() {

        // No need to play sound as menuToggle handles button clicks for the DOM
        menuToggle('server-settings');

    }
};
