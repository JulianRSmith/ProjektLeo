////////////////////////////////////////////////////////////////////////////////
//                               Menu.js                                      //
////////////////////////////////////////////////////////////////////////////////

var btnSound;
var debugText;

var menuState = {
    
    create: function () {
        
        console.log("Game - Loaded");
        
        game.stage.backgroundColor = "#111111";
        
        // Add Welcome Text
        var menuText = game.add.text(0, 0, 'Gladiators of the Ages',{font: "40px Times New Roman", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"});
        menuText.setTextBounds(0, 100, screenWidth, 100);
        
        // Add Play Button
        var buttonPlay = createBtnMid('playButton', 500, this.actionOnClickMenu);
        
        // Connect to the server
        debugText = game.add.text(0, 0, 'Console Log - ProjektLeo* (v0.1)\n\n', {font: "12px Consolas", fill: "#ffffff", boundsAlignH: "left", boundsAlignV: "top"});
        debugText.setTextBounds(10, 10, screenWidth, screenHeight);
        network.connect("localhost", 3010);
    },
    // Function which calls when the player clicks the button
    actionOnClickMenu: function () {
        console.log("CLICK");
        // Add button sound
        btnSound = game.add.audio('btnSound');
        btnSound.play();
        game.state.start('char');
    
}
    
}
