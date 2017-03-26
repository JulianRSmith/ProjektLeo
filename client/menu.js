////////////////////////////////////////////////////////////////////////////////
//                                   Menu.js                                  //
////////////////////////////////////////////////////////////////////////////////
//                     This file displays the menu screen                     //
////////////////////////////////////////////////////////////////////////////////

var menuState = {

    create: function() {
        
        // Log to console that the menu has loaded
        console.log("Menu - Loaded");
        
         // Set game world size
        game.world.setBounds(0, 0, viewportWidth, viewportHeight);
        
            
        // Declare and play main theme music
        mainSound = game.add.audio('mainSound');

        // Disabled for now
        //mainSound.loop = true;
        //mainSound.play();

        // Add tiled background
        tiledBackgroundX('charBg');

        // Add game logo
        var logoImg = game.add.sprite(screenWidth / 2, 200, 'logoMain');
        logoImg.anchor.setTo(0.5);

        // Menu buttons
        var buttonPlayGame = createLabelButton('Play', viewportWidth / 2 - (110*2), viewportHeight - 70, '#FFFFFF', "bGreenNormal", this.actionOnClickMenu, labelHover, labelOut);
        var buttonGetLobbies = createLabelButton('Lobbies', viewportWidth / 2, viewportHeight - 70, '#FFFFFF', "bGreenNormal", this.lobbyListOnClick, labelHover, labelOut);
        var buttonServerSettings = createLabelButton('Settings', viewportWidth / 2 + (110*2), viewportHeight - 70, '#FFFFFF', "bGreenNormal", function() { menuToggle('server-settings'); }, labelHover, labelOut);
        
    },

    // Function which calls when the player clicks the button
    actionOnClickMenu: function() {
        
        // Log action to console
        console.log("CLICK");

        // Add button sound and play it
        var btnSound = game.add.audio('btnSound');
        btnSound.play();

        // Go to the next state
        game.state.start('char');
        
    },

    // Opens a connection to the server and displays the lobby on connect.
    lobbyListOnClick: function() {
        
        if(!networkState()) {
            network.connect(serverHost, serverPort);
            
            console.log("Connecting... Wait for connection.");
            
            var connectInterval = setInterval(function() {
                if(networkState()) {
                    network.request("connector.entryHandler.onEntry", "", protocol.onConnect);
                    game.state.start("lobby");
                }
                
                clearInterval(connectInterval);
            }, 500);
        }
        else {
            game.state.start("lobby");
        }
        
    },
    
    // Opens the DOM menu for server IP and port
    openMenu: function(){
            
    	if($('.pause-menu').css('display') == 'none') {
    		$('.pause-menu').fadeIn();
    	}
    	else {
    		$('.pause-menu').fadeOut();
    	}
    }
};
