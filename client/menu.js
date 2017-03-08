////////////////////////////////////////////////////////////////////////////////
//                                   Menu.js                                  //
////////////////////////////////////////////////////////////////////////////////
//                     This file displays the menu screen                     //
////////////////////////////////////////////////////////////////////////////////

var serverHost = "localhost";
var serverPort = 3010;
        
var menuState = {
    
    create: function () {
        
        // Log to console that the menu has loaded
        console.log("Menu - Loaded");
        
        // Declare and play main theme music
        mainSound = game.add.audio('mainSound');
        
        // Disabled for now
        //mainSound.loop = true;
        //mainSound.play();
        
        // Add tiled background
        tiledBackgroundX('charBg');
        
        // Add game logo
        var logoImg = game.add.sprite(screenWidth/2,200,'logoMain');
        logoImg.anchor.setTo(0.5);
        
        // Add Play Button
        var buttonPlay = createBtnMid('playButton', 500, this.actionOnClickMenu);
        
        // Connect button
        var buttonConnect = createLabelButton('| Connect |', 10, viewportHeight-32, '#FFFFFF', this.connectOnClick);
        var buttonConnect = createLabelButton('| Get Lobbies |', 128, viewportHeight-32, '#FFFFFF', this.getLobbiesOnClick);
        var buttonConnect = createLabelButton('| Create Lobby |', 256, viewportHeight-32, '#FFFFFF', this.createLobbyOnClick);
        
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
    
    // Connects to server from menu
    connectOnClick: function() {
        network.request(serverHost, serverPort, protocol.onConnect);
    },
    
    getLobbiesOnClick: function() {
        network.request(serverHost, serverPort, protocol.onGetLobbies);
    },
    
    createLobbyOnClick: function() {
        network.request(serverHost, serverPort, protocol.onCreateLobby);
    }
};
