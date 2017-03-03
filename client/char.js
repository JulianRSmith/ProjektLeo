////////////////////////////////////////////////////////////////////////////////
//                               Char.js                                      //
////////////////////////////////////////////////////////////////////////////////
//            This file handles the character selection screen                //
////////////////////////////////////////////////////////////////////////////////

var charState = {
    
    create: function () {
        
        // Add title background
        for (i = 0; i<screenWidth;i += 600){
            var background = game.add.tileSprite(i, 0, 600, 600, 'charBg');
        }
        
        // Title Text
        var charText = game.add.text(0, 0, 'Pick A Character',{font: "40px Calibri", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"});
        charText.setTextBounds(0, 50, screenWidth, 50);
        
        // Character Buttons
        var leoArt = createBtnMid('leoArt', 270,this.actionOnClickChar);
        
        // Confirm Button
        var buttonPlay = createBtnMid('selectButton', 500, this.actionOnClickChar);
        
    },
    // Function which calls when the player clicks the button
    actionOnClickChar: function () {
        console.log("CLICK");
        // Add button sound
        btnSound = game.add.audio('btnSound');
        btnSound.play();
        game.state.start('play');
    
}
    
}