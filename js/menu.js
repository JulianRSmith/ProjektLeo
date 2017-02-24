////////////////////////////////////////////////////////////////////////////////
//                               Menu.js                                      //
////////////////////////////////////////////////////////////////////////////////

var menuState = {
    
    create: function () {
        console.log("Game - Loaded");
        // Add Welcome Text
        var menuText = game.add.text(0,0,'Welcome',{ font: "40px Arial", fill: "#ffffff",boundsAlignH: "center", boundsAlignV: "middle" });
        menuText.setTextBounds(0, 100, screenWidth, 100);
        
        //Add Play Button
        var buttonPlay = game.add.button(game.world.centerX, 400, 'playButton', actionOnClick, this, 2, 1, 0);
        buttonPlay.anchor.x = 0.5;
        buttonPlay.anchor.y = 0.5;
    }
    
}

// Function which calls when the player clicks the button
function actionOnClick () {
    console.log("CLICK");
    game.state.start('play');
}