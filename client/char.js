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

    charText: 0,

    buttonPlay: 0,
    buttonMenu: 0,
    
    create: function () {

        // Set game world size
        game.world.setBounds(0, 0, viewportWidth, viewportHeight);
            
        // Init sound for state
        gameMainTheme = game.add.audio('musicMenu');
        gameButtonClick = game.add.audio('soundButtonClick');
        gameButtonClick.allowMultiple = true;
        gameMainTheme.loop = true;
        //gameMainTheme.stop();
        //gameMainTheme.play();

        // Background objects
        GUIManager.backgroundTile('menuBackground');
        GUIManager.backgroundSmoke('backgroundSmoke');
        GUIManager.backgroundBorder('woodBorder');

        // Title Text
        charText = game.add.text(0, 0, 'Select a Character', {font: "40px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        charText.setTextBounds(0, 30, screenWidth, 50);
        
        // Character Buttons
        this.imgWidth = ((game.cache.getImage('leoArt').width/4)+32);

        // Leonidas
        this.imgPos1 = viewportCentreX - this.imgWidth;
        this.leoArt = createCharArt(this.imgPos1, 'leoArt', 'playerLeo');

        // Boudica
        this.boudArt = createCharArt(viewportCentreX, 'boudArt', 'playerBoud');

        // Cleopatra
        this.imgPos2 = viewportCentreX + this.imgWidth;
        this.cleoArt = createCharArt(this.imgPos2, 'cleoArt', 'playerCleo');
        
        // Add buttons
        buttonPlay = GUIManager.createButton('Select', screenWidth / 2 + 110, viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.selectOnClick);
        buttonMenu = GUIManager.createButton('Menu', screenWidth / 2 - 110, viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.menuOnClick);
        
    },
    
    /**
     * Starts the play state on click.
     */
    selectOnClick: function() {

        gameButtonClick.play();
        gameMainTheme.stop();

        game.state.start('STATE_PLAY');
    
    },
     
    /**
     * Sets the currently selected character.
     */
    charOnClick: function(playerChosen) {

        userChar = playerChosen;

    },
    
    /**
     * Return to menu on click.
     */
    menuOnClick: function() {

        gameButtonClick.play();
        
        game.state.start("STATE_MENU");
    
    }
}