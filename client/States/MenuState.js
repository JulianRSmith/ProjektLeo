/************************************************************

    MenuState.js

    State for the menu screen.
    
************************************************************/

var MenuState = {

    serverText: 0,
    gameLogo: 0,

    buttonPlayGame: 0,
    buttonGetLobbies: 0,
    buttonServerSettings: 0,

    create: function() {

        PlayerData.currentState = "MenuState";

        // For debug
        ConsoleManager.log("MenuState::create() : Running", false);

        // Set game world size
        game.world.setBounds(0, 0, ScreenData.viewportWidth, ScreenData.viewportHeight);

        // Stop a theme if it is already plying so we don't have overlapping themes
        AudioManager.gameMainTheme.stop();
        AudioManager.gameMainTheme.play();

        // Background objects
        GUIManager.backgroundTile('menuBackground');
        GUIManager.backgroundSmoke('backgroundSmoke');
        GUIManager.backgroundBorder('woodBorder');

        // Text objects
        this.serverText = game.add.text(10, 40, '', {font: "14px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        
        // Add game logo
        this.gameLogo = game.add.sprite(ScreenData.viewportWidth / 2, 200, 'gameLogo');
        this.gameLogo.anchor.setTo(0.5);

        // Menu buttons
        this.buttonPlayGame = GUIManager.createButton('Play', ScreenData.viewportWidth / 2 - (110*2), ScreenData.viewportHeight - 110, '#341e09', "buttonGreenNormal", this.menuOnClick);
        this.buttonGetLobbies = GUIManager.createButton('Lobbies', ScreenData.viewportWidth / 2, ScreenData.viewportHeight - 110, '#341e09', "buttonGreenNormal", this.lobbyListOnClick);
        this.buttonServerSettings = GUIManager.createButton('Settings', ScreenData.viewportWidth / 2 + (110*2), ScreenData.viewportHeight - 110, '#341e09', "buttonGreenNormal", this.settingsOnClick);
        
        woodTransitionIn();
    },

    update: function() {
        // pretty much to clean the values from previous network games
        LobbyData.reset();
        PlayerData.reset();
    },
    

    render: function() {

        this.serverText.setText("Server: " + SettingsManager.serverIP + ":" + SettingsManager.serverPort + " | " + (NetworkManager.connected() ? "" : "Not ") + "Connected");

    },

    // Function which calls when the player clicks the button
    menuOnClick: function() {
        woodTransitionOut();

        // For debug
        ConsoleManager.log("MenuState::menuOnClick() : Running", false);
        
        AudioManager.gameButtonClick.play();
        
        setTimeout(function() { game.state.start('CharState') }, SettingsManager.transitionTime);
        
    },

    // Opens a connection to the server and displays the lobby on connect.
    lobbyListOnClick: function() {

        // This value has true because we do not want to destroy the window
        // transition as connecting to a network can take different amounts of time.
        woodTransitionOut(true);
        
        // For debug
        ConsoleManager.log("MenuState::lobbyListOnClick() : Running", false);

        AudioManager.gameButtonClick.play();
        
        if(!NetworkManager.connected()) {
            NetworkManager.connect(SettingsManager.serverIP, SettingsManager.serverPort);
            
            ConsoleManager.log("Connecting...", true);
            
            var connectInterval = setInterval(function() {
                if(NetworkManager.connected()) {
                    setTimeout(function() { game.state.start('LobbyState') }, SettingsManager.transitionTime);
                }
                
                clearInterval(connectInterval);
            }, 500);
        }
        else {
            setTimeout(function() { game.state.start('LobbyState') }, SettingsManager.transitionTime);
        }
        
    },

    settingsOnClick: function() {

        // For debug
        ConsoleManager.log("MenuState::settingsOnClick() : Running", false);

        $("#server-ip").val(SettingsManager.serverIP);
        $("#server-port").val(SettingsManager.serverPort);
        $("#debug-toasts").val(SettingsManager.debugToasts);

        $("#player-name").val(PlayerData.playerName);

        // No need to play sound as menuToggle handles button clicks for the DOM
        DOMManager.menuToggle('server-settings');

    }
};
