////////////////////////////////////////////////////////////////////////////////
//                                   Char.js                                  //
////////////////////////////////////////////////////////////////////////////////
//            This file handles the character selection screen                //
////////////////////////////////////////////////////////////////////////////////

var STATE_CHAR = {
    
    leoArt: '',
    cleoArt: '',
    Art: '',
    imgPos1: 0,
    imgPos2: 0,
    imgWidth:0,
    imgWidthHalf:0,
    chosen: false,
    
    create: function () {

        // Set game world size
        game.world.setBounds(0, 0, viewportWidth, viewportHeight);
            
        // Init sound for state
        gameMainTheme = game.add.audio('musicMenu');
        gameButtonClick = game.add.audio('soundButtonClick');
        gameButtonClick.allowMultiple = true;
        
        // Add tiled background
        tileBackground('menuBackground');
        
        // Add smoke
        smokeBackground('backgroundSmoke');
        
        // Add border
        borderBackground('woodBorder');

        // Title Text
        var charText = game.add.text(0, 0, 'Select a Character',{font: "40px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        charText.setTextBounds(0, 50, screenWidth, 50);
        
        // Character Buttons
        var gameXcenter = game.world.centerX;
        this.imgWidth = ((game.cache.getImage('leoArt').width/4)+32);

        // Leonidas
        this.imgPos1 = gameXcenter - this.imgWidth;
        this.leoArt = createCharArt(this.imgPos1, 'leoArt', 'playerLeo');

        // Boudica
        this.boudArt = createCharArt(gameXcenter, 'boudArt', 'playerBoud');

        // Cleopatra
        this.imgPos2 = gameXcenter + this.imgWidth;
        this.cleoArt = createCharArt(this.imgPos2, 'cleoArt', 'playerCleo');
        
        // Add buttons
        var buttonPlay = createLabelButton('Select', screenWidth / 2, viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.selectOnClick, labelHover, labelOut);
        var buttonMenu = createLabelButton('Menu', 138, viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.menuOnClick, labelHover, labelOut);
        
    },
    
    // Function which calls when the player clicks the button
    selectOnClick: function() {

        gameButtonClick.play();

        gameMainTheme.stop();

        game.state.start('STATE_PLAY');
    
    },
     
    charOnClick: function(playerChosen) {

        userChar = playerChosen;

    },
    
    menuOnClick: function() {

        gameButtonClick.play();
        
        game.state.start("STATE_MENU");
    
    }
}