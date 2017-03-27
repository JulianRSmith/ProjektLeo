////////////////////////////////////////////////////////////////////////////////
//                                   Menu.js                                  //
////////////////////////////////////////////////////////////////////////////////
//                     This file displays the menu screen                     //
////////////////////////////////////////////////////////////////////////////////

var STATE_MENU = {

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

        // Add tiled background
        tileBackground('menuBackground');
        
        // Add smoke
        smokeBackground('backgroundSmoke');
        
        // Add border
        borderBackground('woodBorder');

        // Add game logo
        var gameLogo = game.add.sprite(screenWidth / 2, 200, 'gameLogo');
        gameLogo.anchor.setTo(0.5);

        // Menu buttons
        var buttonPlayGame = createLabelButton('Play', viewportWidth / 2 - (110*2), viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.menuOnClick, labelHover, labelOut);
        var buttonGetLobbies = createLabelButton('Lobbies', viewportWidth / 2, viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.lobbyListOnClick, labelHover, labelOut);
        var buttonServerSettings = createLabelButton('Settings', viewportWidth / 2 + (110*2), viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.settingsOnClick, labelHover, labelOut);
        
    },

    // Function which calls when the player clicks the button
    menuOnClick: function() {
        
        gameButtonClick.play();

        game.state.start('STATE_CHAR');
        
    },

    // Opens a connection to the server and displays the lobby on connect.
    lobbyListOnClick: function() {

        gameButtonClick.play();
        
        if(!networkState()) {
            NetworkManager.connect(serverHost, serverPort);
            
            console.log("Connecting... Wait for connection.");
            
            var connectInterval = setInterval(function() {
                if(networkState()) {
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
