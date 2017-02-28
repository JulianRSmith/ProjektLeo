////////////////////////////////////////////////////////////////////////////////
//                               Menu.js                                      //
////////////////////////////////////////////////////////////////////////////////

var btnSound;
var debugText;

var menuState = {
    
    create: function () {
        
        console.log("Game - Loaded");
        
        // Add Welcome Text
        var menuText = game.add.text(0, 0, 'Gladiators of the Ages',{font: "40px Calibri", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"});
        menuText.setTextBounds(0, 100, screenWidth, 100);
        
        // Add Play Button
        var buttonPlay = game.add.button(game.world.centerX, 400, 'playButton', actionOnClick, this, 2, 1, 0);
        buttonPlay.anchor.x = 0.5;
        buttonPlay.anchor.y = 0.5;
        
        // Add button sound
        btnSound = game.add.audio('btnSound');
        
        // Connect to the server
        debugText = game.add.text(0, 0, 'Console Log - ProjektLeo* (v0.1)\n\n', {font: "12px Consolas", fill: "#ffffff", boundsAlignH: "left", boundsAlignV: "top"});
        debugText.setTextBounds(10, 10, screenWidth, screenHeight);
        network.connect("localhost", 3010);
    }
    
}

// Function which calls when the player clicks the button
function actionOnClick () {
    
    console.log("CLICK");
    btnSound.play();
    game.state.start('play');
    
}