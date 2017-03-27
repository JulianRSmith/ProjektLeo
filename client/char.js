////////////////////////////////////////////////////////////////////////////////
//                                   Char.js                                  //
////////////////////////////////////////////////////////////////////////////////
//            This file handles the character selection screen                //
////////////////////////////////////////////////////////////////////////////////

var charState = {
    
    leoArt: '',
    cleoArt: '',
    Art: '',
    imgPos1: 0,
    imgPos2: 0,
    imgWidth:0,
    imgWidthHalf:0,
    chosen: false,
    
    create: function () {
        
        // Add tiled background
        tiledBackgroundX('charBg');
        
        // Add smoke
        smokeBackground();
        
        // Add border
        borderBackground('woodOutline');
        
        // Title Text
        var charText = game.add.text(0, 0, 'Select a Character',{font: "40px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        charText.setTextBounds(0, 50, screenWidth, 50);
        
        // Character Buttons
        var gameXcenter = game.world.centerX;
        this.imgWidth    = ((game.cache.getImage('leoArt').width/4)+32);
        // Leonidas
        this.imgPos1      = gameXcenter - this.imgWidth;
        this.leoArt  = createCharArt(this.imgPos1,'leoArt','playerKingL');
        // Boudica
        this.boudArt  = createCharArt(gameXcenter,'boudArt','playerBoud');
        // Cleopatra
        this.imgPos2      = gameXcenter + this.imgWidth;
        this.cleoArt = createCharArt(this.imgPos2,'cleoArt','playerCleo');
        
        // Set up audio
        btnSound = game.add.audio('btnSound');
        btnSound.allowMultiple = true;
        
        // Add action buttons
        var buttonPlay = createLabelButton('Select', screenWidth / 2, viewportHeight - 70, '#FFFFFF', "bGreenNormal", this.actionOnClickChar, labelHover, labelOut);
        var buttonMenu = createLabelButton('Menu', 138, viewportHeight - 70, '#FFFFFF', "bGreenNormal", returnMenuOnClick, labelHover, labelOut);
        
    },
    
    update: function () {
        
        
    },
    
    // Function which calls when the player clicks the button
    actionOnClickChar: function () {
        console.log("CLICK");
        // Add button sound
        mainSound.stop();
        this.btnSound.play();
        game.state.start('play');
    
    },
     
    actionOnClickArt: function (playerChosen) {
        userChar = playerChosen;
        // console.log(userChar)
    },
    
    actionOnOverArt: function () {
        // userChar = chosenChar;
        // console.log(imgPos);
    },
    
    returnMenuOnClick: function() {
        game.state.start("menu");
    }
    
}