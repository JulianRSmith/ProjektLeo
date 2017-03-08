////////////////////////////////////////////////////////////////////////////////
//                                   Char.js                                  //
////////////////////////////////////////////////////////////////////////////////
//            This file handles the character selection screen                //
////////////////////////////////////////////////////////////////////////////////

var charState = {
    
    leoArt: '',
    
    create: function () {
        
        // Add tiled background
        tiledBackgroundX('charBg');
        
        // Title Text
        var charText = game.add.text(0, 0, 'Pick A Character',{font: "40px Calibri", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"});
        charText.setTextBounds(0, 50, screenWidth, 50);
        
        // Character Buttons
        this.leoArt = createBtnArt('leoArt', 270,this.actionOnClickArt('Leo'),this.actionOnOverArt);
        
        // Confirm Button
        var buttonPlay = createBtnMid('selectButton', 500, this.actionOnClickChar);
        
    },
    
    // Function which calls when the player clicks the button
    actionOnClickChar: function () {
        console.log("CLICK");
        // Add button sound
        btnSound = game.add.audio('btnSound');
        mainSound.stop();
        btnSound.play();
        game.state.start('play');
    
    },
     
    actionOnClickArt: function (chosenChar) {
        console.log(chosenChar);
        this.leoArt.frame = 0;
    },
    
    actionOnOverArt: function () {
        console.log("Hover");
    }
    
}